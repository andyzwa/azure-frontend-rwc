import { Component, OnInit } from '@angular/core';
import { Card } from '../cards.model';
import { CardsService } from '../cards.service';

@Component({
  selector: 'app-card-add',
  templateUrl: './card-add.component.html',
  styleUrls: ['./card-add.component.scss']
})
export class CardAddComponent implements OnInit {

  cardToBeUpdated!: Card;
  public backgroundColor = '';

  constructor(public cardsService: CardsService) {
   }

  ngOnInit(): void {
    const colorForm = this.cardsService.cardForm.get('color');
    if (colorForm != null) {
      colorForm.valueChanges.subscribe(val => {
        this.backgroundColor = val;
      });
    }
 }

  onSubmit(): void{

    const cardFormControl = this.cardsService.cardForm.get('id');
    if (cardFormControl === null) { return; }

    // Create
    if (cardFormControl.value === null ) {

      const card: Card = {
        title: this.cardsService.cardForm.value.title,
        content: this.cardsService.cardForm.value.content,
        id: this.cardsService.cardForm.value.id,
        color: this.cardsService.cardForm.value.color = this.backgroundColor,
      };

      this.cardsService.createCard(card);
      this.cardsService.cardForm.reset();

    // Update
    } else {
      this.cardsService.cardForm.value.color = this.backgroundColor;
      this.cardToBeUpdated = {...this.cardsService.cardForm.value as Card};
      this.cardsService.updateCard(this.cardsService.cardForm.value);
      this.cardsService.cardForm.reset();
    }
  }
  resetform(): void{
    console.log( this.cardsService.cardForm.status);
    this.cardsService.cardForm.reset();
  }

  /**
   * Set color from color picker
   */
  public setColor(type: string, color: string): void {
    switch (type) {
      case 'background':
        this.cardsService.cardForm.value.color = color;
        this.backgroundColor = color;
        break;
    }
  }

}
