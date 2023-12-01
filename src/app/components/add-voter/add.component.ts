import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { IGenericListType } from 'src/app/models/generic-list-definition';
import { AddCandidateRequested } from 'src/app/store/actions/candidates.actions';
import { AddVoterRequested } from 'src/app/store/actions/voter.actions';
import * as fromRoot from '../../store/reducers';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  @Input() public type: IGenericListType;
  @Output() public addSubmitted = new EventEmitter();
  constructor(private readonly _store: Store<fromRoot.State>) {}

  public model = {
    name: '',
  };

  ngOnInit() {}

  public add(): void {
    let name = this.model.name;
    this.type == IGenericListType.Voters
      ? this._store.dispatch(new AddVoterRequested({ name }))
      : this._store.dispatch(new AddCandidateRequested({ name }));

    this.addSubmitted.emit();
  }
}
