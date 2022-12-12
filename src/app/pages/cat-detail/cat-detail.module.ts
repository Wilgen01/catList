import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatDetailComponent } from './cat-detail.component';
import { CatDetailRoutingModule } from './cat-detail-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    CatDetailComponent
  ],
  imports: [
    CommonModule,
    CatDetailRoutingModule,
    SharedModule
  ]
})
export class CatDetailModule { }
