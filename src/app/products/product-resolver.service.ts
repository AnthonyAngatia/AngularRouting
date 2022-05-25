import {Product, ProductResolved} from "./product";
import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {ProductService} from "./product.service";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<ProductResolved> {

  constructor(private productService: ProductService) { }


  // The resolver manages the subscription, hence we do not need to subscribe
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<ProductResolved> | Promise<ProductResolved> | ProductResolved {
    const id = route.paramMap.get('id');
    if(isNaN(+id)){
      const message =   `Product id was not a number: ${id}`;
      console.error(message)
      return of({product:null, error:message});
    }
    return this.productService.getProduct(+id)
      .pipe(
        map(product => ({product: product})),
        catchError(error => {
          const message = `Retrieval error ${error}`
          console.error(message)
          return of({product:null, error:message});
        })
      )
  }

}
