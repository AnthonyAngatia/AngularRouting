import { Component, OnInit } from '@angular/core';

import {Product, ProductResolved} from './product';
import { ProductService } from './product.service';
import {ActivatedRoute} from "@angular/router";
import {ProductResolver} from "./product-resolver.service";

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  pageTitle = 'Product Detail';
  product: Product;
  errorMessage: string;

  constructor(private route: ActivatedRoute) { }


  ngOnInit(): void {
    // const id = +this.route.snapshot.paramMap.get('id')//The + typecast type string to a number
    // this.getProduct(id)
    const resolvedData:ProductResolved = this.route.snapshot.data['resolvedData'];
    this.errorMessage = resolvedData.error;
    this.onProductRetrieved(resolvedData.product);

  }


  // getProduct(id: number): void {
  //   this.productService.getProduct(id).subscribe({
  //     next: product => this.onProductRetrieved(product),
  //     error: err => this.errorMessage = err
  //   });
  // }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }

}
