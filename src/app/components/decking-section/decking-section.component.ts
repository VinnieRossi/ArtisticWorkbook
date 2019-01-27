import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vin-decking-section',
  templateUrl: './decking-section.component.html',
  styleUrls: ['./decking-section.component.css']
})
export class DeckingSectionComponent implements OnInit {

  // Page 3
  public deckingList: Array<string> = [];

  constructor() { }

  ngOnInit() {
  }

}
