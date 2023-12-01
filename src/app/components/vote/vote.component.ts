import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import { Candidate } from '../../models/candidate';
import { Voter } from '../../models/voter';
import { BehaviorSubject, combineLatest, map, Observable, of } from 'rxjs';
import * as fromVoters from '../../store/reducers/voters.reducer';
import * as fromCandidates from '../../store/reducers/candidates.reducer';
import { MatSelect } from '@angular/material/select';
import { VoteRequested } from '../../store/actions/vote-actions';

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

  private isDirtySubject = new BehaviorSubject(false);
  public isDirty$ = this.isDirtySubject.asObservable();

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
    this.voterSelected$ = this.voterSelect.valueChange.pipe(
      map((voter) => !!voter)
    );

    this.candidateSelected$ = this.candidateSelect.valueChange.pipe(
      map((candidate) => !!candidate)
    );

    combineLatest([this.voterSelected$, this.candidateSelected$])
      .pipe(
        map(([voter, candidate]) =>
          this.isDirtySubject.next(voter && candidate)
        )
      )
      .subscribe();

    this.isDirty$.subscribe((d) => console.warn('isDirty: ', d));
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
