import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Candidate } from '../models/candidate';
import { Voter } from '../models/voter';
import * as fromRoot from '../store/reducers';
import { LoadVotersRequested } from '../store/actions/voter.actions';
import { LoadCandidatesRequested } from '../store/actions/candidates.actions';
import { selectAll } from '../store/reducers/voters.reducer';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css'],
})
export class VoteComponent implements OnInit {
  public voters$: Observable<Voter[]>;
  public candidates$: Observable<Candidate[]>;

  constructor(private readonly _store: Store<fromRoot.State>) {}

  ngOnInit() {
    this._store.dispatch(new LoadVotersRequested());
    this._store.dispatch(new LoadCandidatesRequested());

    this.voters$ = this._store.pipe(
      select((store) => store.voters.voters),
      select(selectAll)
    );

    this.candidates$ = this._store.pipe(
      select((store) => store.candidates),
      select(selectAll)
    );
  }
}
