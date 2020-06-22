import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { OrderBookModule } from './order-book/order-book.module';
import { MaterialAppModule } from './shared/material.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialAppModule,
    OrderBookModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
