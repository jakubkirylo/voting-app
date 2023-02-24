import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  CandidatesActionTypes,
  LoadCandidatesRequested,
} from '../actions/candidates.actions';

@Injectable()
export class CandidatesEffects {
  constructor(private actions$: Actions) {}

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
}
