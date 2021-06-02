import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contributor-card',
  templateUrl: './contributor-card.component.html',
  styleUrls: ['./contributor-card.component.scss']
})
export class ContributorCardComponent implements OnInit {

  @Input() avatar_url: string = "";
  @Input() login: string = "";
  @Input() html_url: string = "";
  @Input() contributions: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
