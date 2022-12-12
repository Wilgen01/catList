import { Component, Input, OnInit } from '@angular/core';
import { Breeds } from 'src/app/interface/catApi.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() breed !: Breeds

  constructor() { }

  ngOnInit(): void {
  }

}
