import { ITableColumn } from './../../../components/table/tableColumn.interface';
import { Product } from '../../../../model';
import { ProductService } from '../../../../services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  catchError,
  finalize,
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Observable, of } from 'rxjs';

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
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
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
      switchMap((v) => this.productService.getProducts(v))
    );
    this.productList$.subscribe((products) => {
      this.showResults = true;
      this.searchResult = products;
    });
  }

  onEdit(product: Product) {
    alert(`Editar ${product.name}`);
  }
  onDelete(product: Product) {
    alert(`Deletar ${product.name}`);
  }
}
