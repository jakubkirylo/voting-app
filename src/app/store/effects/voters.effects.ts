import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  AddVoterRequested,
  LoadVotersRequested,
  VotersActionTypes,
} from '../actions/voter.actions';

@Injectable()
export class VotersEffects {
  constructor(private actions$: Actions) {}

  loadVotersRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType<LoadVotersRequested>(VotersActionTypes.LoadVotersRequested),
      mergeMap(() =>
        of([
          { id: 1, name: 'John Doe', hasVoted: true },
          { id: 2, name: 'Jane Smith', hasVoted: false },
        ]).pipe(
          map((voters) => ({
            type: VotersActionTypes.LoadVotersSucceeded,
            payload: { voters },
          })),
          catchError(() => of({ type: 'LoadVotersFailed' }))
        )
      )
    )
  );

  addVoterRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType<AddVoterRequested>(VotersActionTypes.AddVoterRequested),
      mergeMap((action: any) =>
        of({ id: 3, name: action.payload.name }).pipe(
          map((voter) => ({
            type: VotersActionTypes.AddVoterSucceeded,
            payload: voter,
          })),
          catchError(() => of({ type: 'AddVoterFailed' }))
        )
      )
    )
  );
}
