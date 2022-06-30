import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';
import { MessageService } from 'src/app/shared/services/message.service';
import { Product } from '../../../model';
import { ProductService } from '../../../services/product.service';
import { ITableColumn } from '../../../../shared/components/table/tableColumn.interface';

const ESPERA_DIGITACAO_MS = 300;

@Component({
  selector: 'dapp-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ProductListComponent implements OnInit {
  form!: FormGroup;
  displayedResultColumns: ITableColumn[] = [
    { propertyName: 'code', headerTitle: 'Code' },
    { propertyName: 'name', headerTitle: 'Product Name' },
    { propertyName: 'price', headerTitle: '$' },
  ];

  productList$!: Observable<Array<Product>>;
  searchResult: Array<Product> = [];
  showResults = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _messageService: MessageService,
    private _productService: ProductService
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      filter: [''],
    });
    this.productList$ = this.form.controls['filter'].valueChanges.pipe(
      //só repassado o fluxo após 300ms
      debounceTime(ESPERA_DIGITACAO_MS),
      // só passa elemento se atender o valor digitado tiver pelo
      // menos 3 caracteres ou não tiver sido digitado nada
      //filter((v) => v.length >= 3 || !v.length),
      //só passa se for diferente do último
      distinctUntilChanged(),
      // redireciona fluxo para outro observable
      switchMap((v) =>
        this._productService.getProducts(v).pipe(
          // SEM ESSE CATCHERROR, os eventos de digitação no campo param de funcionar:
          // Error handler in the subscriber works as completion, so the the observable
          // stops working. This is by design. If you want you observable to keep emitting despite errors,
          // you have to handle the errors in a catch block and emit Observable of something that is not error.
          //return of(new Error(`Service failed: ${err.message}`));
          catchError((err) => {
            this._messageService.show(err.message);
            return of([]);
          })
        )
      )
    );
    this.productList$.subscribe({
      next: (products) => {
        this.showResults = true;
        this.searchResult = products;
      },
      // Esse tratamento encerra o observable, portanto, o catchError do `switchMap`
      // deve tratar as falhas de conexão com o backend
      error: (err) => {
        this._messageService.show(err.message);
      },
    });
  }

  onEdit(product: Product) {
    alert(`Editar ${product.name}`);
  }
  onDelete(product: Product) {
    alert(`Deletar ${product.name}`);
  }
}
