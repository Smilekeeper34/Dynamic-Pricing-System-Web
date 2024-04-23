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
import { HomeComponent } from './home-pages/home/home.component';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';
import { SetPricesComponent } from './pages/set-prices/set-prices.component';
import { AllInventoryComponent } from './pages/all-inventory/all-inventory.component';
import { RetailerListComponent } from './pages/retailer-list/retailer-list.component';
import { PricingControlComponent } from './pages/pricing-control/pricing-control.component';
import { ShopComponent } from './home-pages/shop/shop.component';
import { AboutComponent } from './home-pages/about/about.component';
import { ContactComponent } from './home-pages/contact/contact.component';
import { PricingSectionComponent } from './home-pages/pricing-section/pricing-section.component';
import { CartComponent } from './home-pages/cart/cart.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: ShopComponent},
  { path: 'login', component: LoginComponent },
  {path:'about',component:AboutComponent},
  {path:'contact',component:ContactComponent},
  {path:'pricing',component:PricingSectionComponent},
  { path: 'register', component: SignupComponent },
  { path: 'cart', component: CartComponent },
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
      {path:'sales-report',component:SalesReportComponent},
      {path: 'orders',component:OrdersListComponent},
      {path: 'set-price',component:SetPricesComponent},
      {path: 'all-inventory',component:AllInventoryComponent},
      {path: 'all-retailer', component:RetailerListComponent},
      {path: 'pricing-control',component:PricingControlComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutes {}
