import { authGuard } from './shared/guards/auth.guard';
import { Routes } from '@angular/router';
import { HomeComponent } from './layout/pages/home/home.component';
import { ProductsComponent } from './layout/pages/products/products.component';
import { CartComponent } from './layout/pages/cart/cart.component';
import { NotfoundComponent } from './layout/additions/notfound/notfound.component';
import { ProductDetailsComponent } from './layout/additions/product-details/product-details.component';
import { CheckOutComponent } from './layout/additions/check-out/check-out.component';
import { WishListComponent } from './layout/pages/wish-list/wish-list.component';


export const routes: Routes = [
    {path:"" ,redirectTo:"home",pathMatch:'full'},
    {path:"home" , component:HomeComponent , canActivate:[authGuard],title:"Home"},
    {path:"login" , loadComponent:()=>import('./layout/pages/login/login.component').then((c)=>c.LoginComponent),title:"Login"},
    {path:"rgister" , loadComponent:()=>import('./layout/pages/register/register.component').then((c)=>c.RegisterComponent),title:"Rgister"},
    {path:"product" , component:ProductsComponent, canActivate:[authGuard],title:"Product"},
    {path:"brands" , loadComponent: () => import('./layout/pages/brands/brands.component').then((c)=>c.BrandsComponent) , canActivate:[authGuard],title:"Brands"},
    {path:"categories" , loadComponent: () => import('./layout/pages/categories/categories.component').then((c)=>c.CategoriesComponent), canActivate:[authGuard],title:"Categories"},
    {path:"cart" , component:CartComponent, canActivate:[authGuard],title:"Cart"},
    {path:"wishList" , component:WishListComponent, canActivate:[authGuard],title:"wishList"},
    {path:"forgetpassword",loadComponent:()=> import('./layout/additions/forget-password/forget-password.component').then((c)=>c.ForgetPasswordComponent),title:"Forgetpassword"},
    {path:"productdetails/:pId",component:ProductDetailsComponent , canActivate:[authGuard],title:"productdetails"},
    {path:"checkOut/:cId",component:CheckOutComponent , canActivate:[authGuard],title:"checkOut"},
    {path:"brandsDetails/:brandId",loadComponent:()=>import('./layout/additions/brands-details/brands-details.component').then((c)=>c.BrandsDetailsComponent) , canActivate:[authGuard],title:"brandsDetails"},
    {path:"subCategories/:subId",loadComponent:()=>import('./layout/additions/sub-categories/sub-categories.component').then((c)=>c.SubCategoriesComponent) , canActivate:[authGuard],title:"subCategories"},
    
    {path:"**" , component:NotfoundComponent,title:"Not Found"},
];
