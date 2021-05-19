import { Injectable, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import { environment } from '../../environments/environment';
// import { default as cardsContent } from '../cardsContent.json';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Card } from './cards.model';


@Injectable({
  providedIn: 'root'
})
export class CardsService {

  cardForm = new FormGroup({
    id: new FormControl(null),
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    color: new FormControl(null),
  });

  private lCards = new BehaviorSubject<Card[]>([]);
  private dataStore: { cards: Card[] } = { cards: [] };
  readonly cards = this.lCards.asObservable();

  private apiUrl = environment.API_URL; // URL to backend api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:8000', 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'})
  };

  constructor(private http: HttpClient){
  }

  loadAll(): void {
    this.http.get<Card[]>(`${this.apiUrl}/articles`).subscribe(data => {
      this.dataStore.cards = data;
      this.lCards.next(Object.assign({}, this.dataStore).cards);
    }, error => console.log('Could not load cards.', error));
  }


  createCard(card: Card): void {
     this.http.post<Card>(`${this.apiUrl}/article`, card, this.httpOptions).subscribe(data => {
       this.dataStore.cards.push(data);
       this.lCards.next(Object.assign({}, this.dataStore).cards);
     }, error => console.log('Could not create card.', error));
  }


  updateCard(card: Card): void {
     this.http.put<Card>(`${this.apiUrl}/article`, card, this.httpOptions).subscribe(data => {
      this.dataStore.cards.forEach((t, i) => {
        if (t.id === data.id) { this.dataStore.cards[i] = data; }
      });

      this.lCards.next(Object.assign({}, this.dataStore).cards);
    }, error => console.log('Could not update card.', error));
  }

  deleteCard(cardId: number): void {
    const url = `${this.apiUrl}/article/${cardId}`;
    this.http.delete<Card>(url, this.httpOptions).subscribe(() => {
      this.dataStore.cards.forEach((t, i) => {
        if (t.id === cardId) { this.dataStore.cards.splice(i, 1); }
      });

      this.lCards.next(Object.assign({}, this.dataStore).cards);
    }, () => console.log('Could not delete card.'));
  }

  populateCardForm(card: Card): void{
    console.log('FormValues before: ' , card);
    this.cardForm.setValue(card);
    console.log('FormValues after: ' , card);
  }

}
