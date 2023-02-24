import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../store/reducers';
import { Candidate } from '../models/candidate';
import { Voter } from '../models/voter';
import { combineLatest, map, Observable } from 'rxjs';
import * as fromVoters from '../store/reducers/voters.reducer';
import * as fromCandidates from '../store/reducers/candidates.reducer';
import { MatSelect } from '@angular/material/select';
import { VoteRequested } from '../store/actions/vote-actions';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css'],
})
export class VoteComponent implements OnInit, AfterViewInit {
  @ViewChild('voter') voterSelect: MatSelect;
  @ViewChild('candidate') candidateSelect: MatSelect;

  public voters$: Observable<Voter[]>;
  public candidates$: Observable<Candidate[]>;

  public voterSelected$: Observable<boolean>;
  public candidateSelected$: Observable<boolean>;
  public isDirty$: Observable<boolean>;

  constructor(private readonly _store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.voters$ = this._store.pipe(
      select((store) => store.voters.voters),
      select(fromVoters.eligibleVoters)
    );

    this.candidates$ = this._store.pipe(
      select((store) => store.candidates.candidates),
      select(fromCandidates.selectAll)
    );
  }

  ngAfterViewInit() {
    this.voterSelected$ = this.voterSelect.optionSelectionChanges.pipe(
      map((voter) => !!voter)
    );

    this.candidateSelected$ = this.candidateSelect.optionSelectionChanges.pipe(
      map((candidate) => !!candidate)
    );

    this.isDirty$ = combineLatest([
      this.voterSelected$,
      this.candidateSelected$,
    ]).pipe(map(([voter, candidate]) => voter && candidate));
  }

  public submitVote(): void {
    this._store.dispatch(
      new VoteRequested({
        voter: this.voterSelect.value,
        candidate: this.candidateSelect.value,
      })
    );
    this.voterSelect.writeValue(null);
    this.candidateSelect.writeValue(null);
  }
}
