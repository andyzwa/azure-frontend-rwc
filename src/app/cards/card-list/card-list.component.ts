import { Component, OnInit, OnDestroy } from '@angular/core';
import { Card } from '../cards.model';
import { CardsService } from '../cards.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit, OnDestroy {

  cards: Observable<Card[]> | undefined ;
  searchText = '';
  isLoading = false;

  constructor(private cardService: CardsService) { }

  ngOnInit(): void {
    this.cards =  this.cardService.cards;
    this.cardService.loadAll();
  }


  filterCards(card: string | null): boolean | null{
    if (card != null ) {
      return card.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1;
    } else { return null; }
  }

  deleteCard(cardId: number): void {
    this.cardService.deleteCard(cardId);
  }

  editCard(card: Card): void{
    this.cardService.populateCardForm(card);
  }

  ngOnDestroy(): void {
  }

}
