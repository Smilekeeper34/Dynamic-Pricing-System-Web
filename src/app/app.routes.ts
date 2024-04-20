import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './shared/layout/layout.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { UploadProductComponent } from './pages/upload-product/upload-product.component';

export const routes: Routes = [
    {path:'',component:LoginComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:SignupComponent},
    { path: 'layout', component: LayoutComponent },
    {path:'dashboard',component:DashboardComponent},
    {path:'products',component:ProductListComponent},
    {path:'add-product',component:UploadProductComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutes {}