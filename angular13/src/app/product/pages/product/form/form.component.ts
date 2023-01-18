import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap, tap, Observable } from 'rxjs';
import { Product } from 'src/app/product/model';
import { ProductService } from 'src/app/product/services/product.service';

@Component({
  selector: 'dapp-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class ProductFormComponent implements OnInit {
  product$!: Observable<Product>;
  product!: Product;
  filter!: string | null; // the filter used in the list component to get to here

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _productService: ProductService
  ) {}

  ngOnInit(): void {
    // Usa o observable ActivatedRoute.paramMap para pegar o ID passado na rota. Quando ocorrer apenas mudança
    // do parâmetro ID da rota (mesmo path/rota  com outro ID), o Angular vai reaproveitar a instância do componente.
    // e não vai executar novamente o ngOnInit().
    // Usando o Observable, a detectação da mudança do parâmetro da rota é disparada e a função reexecutada

    // O tap pega um eventual parâmetro filter, caso ele tenha vindo da página de busca

    // O switchMap cancela requests anteriores pendentes. Se o usuário
    // navegar novamente com um novo ID enquanto o ProductService ainda está
    // processando a requisição anterior, o switchMap descarta  o request antigo
    // e retorna o produto com o ID da nova requisição
    //
    // UMA SOLUÇÃO MAIS INDICADA PARA ESTE CENÁRIO É O USO DE RESOLVER PARA QUE O COMPONENTE SÓ SEJA
    // RENDERIZADO QUANDO OS DADOS JÁ ESTIVEREM DISPONÍVEIS. ALÉM DISSO, O TRATAMENTO DE ERRO É MELHOR
    //  VIA RESOLVER POIS NEM RENDERIZA O COMPONENTE TARGET
    //
    this.product$ = this._route.paramMap.pipe(
      tap((params: ParamMap) => (this.filter = params.get('filter'))),
      switchMap((params: ParamMap) => {
        return this._productService.findProduct(params.get('id'));
      })
    );

    this.product$.subscribe((product) => {
      this.product = product;
    });
  }

  /**
   * Navega para a tela de busca passando o filtro que recebeu da mesma para ela recuperar a busca anterior
   */
  backToSearch(event: MouseEvent): void {
    this._router.navigate(['./', { filter: this.filter }]);
  }
}
