import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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
  @ViewChild('nameInput')
  private nameInput: ElementRef<HTMLInputElement>;
  constructor(private readonly _store: Store<fromRoot.State>) {}

  ngOnInit() {}

  public add(): void {
    const name = this.nameInput.nativeElement.value;
    this.type == IGenericListType.Voters
      ? this._store.dispatch(new AddVoterRequested({ name }))
      : this._store.dispatch(new AddCandidateRequested({ name }));

    this.addSubmitted.emit();
  }
}
