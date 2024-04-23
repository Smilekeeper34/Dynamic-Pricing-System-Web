import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './tools/services/product.service';
import { AppComponent } from './app.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppComponent,
    HttpClientModule
  ],
  providers:[{
    provide: LocationStrategy,
    useClass: HashLocationStrategy,
  },ProductService]
})
export class AppModule { }
