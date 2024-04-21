import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './shared/layout/layout.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { UploadProductComponent } from './pages/upload-product/upload-product.component';
import { InvetoryChartComponent } from './pages/invetory-chart/invetory-chart.component';
import { SalesChartComponent } from './pages/sales-chart/sales-chart.component';
import { SalesReportComponent } from './pages/sales-report/sales-report.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'add-product', component: UploadProductComponent },
      { path: 'inventory-chart', component: InvetoryChartComponent },
      { path: 'sales-chart', component: SalesChartComponent },
      {path:'sales-report',component:SalesReportComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutes {}
