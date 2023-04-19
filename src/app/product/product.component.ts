import { AppComponent } from './../app.component';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

export interface IProduct {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

@Component({
  standalone:true,
  imports:[CommonModule],
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})

export class ProductComponent implements OnInit, OnDestroy {
  productList: IProduct[] = [];
  subscription: Subscription = Subscription.EMPTY;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const products = this.getProducts().pipe(map((prod: any) => prod.products));
    this.subscription = products.subscribe({
      next: (val) => {
        this.productList = val;
      },
      error:(err)=> console.error(err)
    });
  }

  getProducts = () => this.http.get('https://dummyjson.com/products');

  productDescription = (prod: any) =>
    this.router.navigate([
      'product-details',
      { product: JSON.stringify(prod) },
    ]);

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
