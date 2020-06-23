import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderBookComponent } from './components/order-book/order-book.component';
import { MaterialAppModule } from '../shared/material.module';
import { SortByPipe } from './pipes/sort-by.pipe';
import { StringifyItemPipe } from './pipes/stringify-item.pipe';

@NgModule({
  declarations: [
    OrderBookComponent,
    SortByPipe,
    StringifyItemPipe,
  ],
  imports: [
    CommonModule,
    MaterialAppModule,

  ], exports : [
    OrderBookComponent
  ]
})
export class OrderBookModule { }
