import { Component, Input, OnInit } from '@angular/core';
import { IGenericListDefinition } from 'src/app/models/generic-list-definition';

@Component({
  selector: 'app-generic-list',
  templateUrl: './generic-list.component.html',
  styleUrls: ['./generic-list.component.css'],
})
export class GenericListComponent implements OnInit {
  @Input() config: IGenericListDefinition;
  constructor() {}

  ngOnInit() {}
}
