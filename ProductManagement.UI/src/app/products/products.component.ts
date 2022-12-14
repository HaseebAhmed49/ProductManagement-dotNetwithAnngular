import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductsService } from '../products/products.service';
import { Products } from '../Models/Products';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  token : any;
  ProductList?: Observable<Products[]>;
  ProductList1?: Observable<Products[]>;
  productForm: any;
  massage = "";
  prodCategory = "";
  productId = 0;
  constructor(private formbulider: FormBuilder,
     private productService: ProductsService,private router: Router,
     private jwtHelper : JwtHelperService,private toastr: ToastrService) { }

  ngOnInit() {
    this.prodCategory = "0";
    this.productForm = this.formbulider.group({
      productName: ['', [Validators.required]],
      productCost: ['', [Validators.required]],
      productDescription: ['', [Validators.required]],
      productStock: ['', [Validators.required]]
    });
    console.log("Products Componenets Init");
    this.token = localStorage.getItem("jwt");
    this.getProductList(this.token);
  }
  getProductList(token: string) {
    console.log("Get Products() Products Componenets")
    this.token = localStorage.getItem("jwt");
    this.ProductList1 = this.productService.getProductList(this.token);
    this.ProductList = this.ProductList1;
  }
  PostProduct(product: Products) {
    const product_Master = this.productForm.value;
    this.token = localStorage.getItem("jwt");
    this.productService.postProductData(product_Master,this.token).subscribe(
      () => {
        this.getProductList(this.token);
        this.productForm.reset();
        this.toastr.success('Data Saved Successfully');
      }
    );
  }
  ProductDetailsToEdit(id: string) {
    this.token = localStorage.getItem("jwt");
    this.productService.getProductDetailsById(id,this.token).subscribe(productResult => {
      this.productId = productResult.productId;
      this.productForm.controls['productName'].setValue(productResult.productName);
      this.productForm.controls['productCost'].setValue(productResult.productCost);
      this.productForm.controls['productDescription'].setValue(productResult.productDescription);
      this.productForm.controls['productStock'].setValue(productResult.productStock);
    });
  }
  UpdateProduct(product: Products) {
    this.token = localStorage.getItem("jwt");
    product.productId = this.productId;
    const product_Master = this.productForm.value;
    this.productService.updateProduct(product_Master,this.token).subscribe(() => {
      this.toastr.success('Data Updated Successfully');
      this.productForm.reset();
      this.getProductList(this.token);
    });
  }

  DeleteProduct(id: number) {
    this.token = localStorage.getItem("jwt");
    if (confirm('Do you want to delete this product?')) {
      this.productService.deleteProductById(id,this.token).subscribe(() => {
        this.toastr.success('Data Deleted Successfully');
        this.getProductList(this.token);
      });
    }
  }

  Clear(product: Products){
    this.productForm.reset();
  }

  public logOut = () => {
    localStorage.removeItem("jwt");
    this.router.navigate(["/"]);
  }

  isUserAuthenticated() {
    this.token = localStorage.getItem("jwt");
    if (this.token && !this.jwtHelper.isTokenExpired(this.token)) {
      console.log("is User true 2 case");
      return true;
    }
    else {
      console.log("is User false 2 case");

      return false;
    }
  }

}
