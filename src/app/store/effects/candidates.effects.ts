import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  AddCandidateRequested,
  CandidatesActionTypes,
  LoadCandidatesRequested,
} from '../actions/candidates.actions';
import * as fromRoot from '../../store/reducers';
import { select, Store } from '@ngrx/store';
import { selectAll } from '../reducers/candidates.reducer';
import { takeFirst } from '../store.helpers';

@Injectable()
export class CandidatesEffects {
  constructor(
    private actions$: Actions,
    private readonly _store: Store<fromRoot.State>
  ) {}

  loadCandidatesRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType<LoadCandidatesRequested>(
        CandidatesActionTypes.LoadCandidatesRequested
      ),
      mergeMap(() =>
        of([
          { id: 1, name: 'George Washington', votes: 2 },
          { id: 2, name: 'Thomas Jefferson', votes: 8 },
        ]).pipe(
          map((candidates) => ({
            type: CandidatesActionTypes.LoadCandidatesSucceeded,
            payload: { candidates },
          })),
          catchError(() => of({ type: 'LoadCandidatesFailed' }))
        )
      )
    )
  );

  addCandidateRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType<AddCandidateRequested>(
        CandidatesActionTypes.AddCandidateRequested
      ),
      mergeMap((action: any) => {
        // dummy code to get the last voter
        var candidates = this._store.pipe(
          select((store) => store.voters.voters),
          select(selectAll)
        );
        const lastCandidate = takeFirst(candidates).reduce((max, voter) =>
          voter.id ? { ...voter } : max
        );

        return of({
          id: lastCandidate.id + 1,
          name: action.payload.name,
          votes: 0,
        }).pipe(
          map((candidate) => ({
            type: CandidatesActionTypes.AddCandidateSucceeded,
            payload: { candidate },
          })),
          catchError(() => of({ type: 'AddCandidateFailed' }))
        );
      })
    )
  );
}
