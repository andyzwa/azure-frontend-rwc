import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardListComponent } from './card-list/card-list.component';
import { CardComponent } from './card/card.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { CardsService} from './cards.service';
import { RouterModule , Routes } from '@angular/router';
import { CardAddComponent } from './card-add/card-add.component';
import {ColorPickerComponent} from '../color-picker/color-picker.component';

const cardRoutes: Routes = [
  { path: '', component: CardComponent },

];

@NgModule({
  declarations: [
    CardListComponent,
    CardComponent,
    CardAddComponent,
    ColorPickerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(cardRoutes),
  ],
  providers: [CardsService]
})
export class CardsModule { }
