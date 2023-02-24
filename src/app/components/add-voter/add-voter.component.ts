import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AddVoterRequested } from 'src/app/store/actions/voter.actions';
import * as fromRoot from '../../store/reducers';

@Component({
  selector: 'app-add-voter',
  templateUrl: './add-voter.component.html',
  styleUrls: ['./add-voter.component.css'],
})
export class AddVoterComponent implements OnInit {
  @ViewChild('voterNameInput')
  private voterNameInput: ElementRef<HTMLInputElement>;
  constructor(private readonly _store: Store<fromRoot.State>) {}

  ngOnInit() {}

  public addVoter(): void {
    this._store.dispatch(
      new AddVoterRequested({ name: this.voterNameInput.nativeElement.value })
    );
  }
}
