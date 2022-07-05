import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/product/model';
import { ProductService } from 'src/app/product/services/product.service';

@Component({
  selector: 'dapp-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css'],
})
export class ProductShowComponent implements OnInit {
  product!: Product;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _productService: ProductService
  ) {}

  ngOnInit() {
    this._route.data.subscribe((data) => {
      this.product = data['product'];
    });
  }
}
