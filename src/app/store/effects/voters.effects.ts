import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  AddVoterRequested,
  LoadVotersRequested,
  VotersActionTypes,
} from '../actions/voter.actions';
import * as fromRoot from '../../store/reducers';
import { select, Store } from '@ngrx/store';
import { selectAll } from '../reducers/voters.reducer';
import { takeFirst } from '../store.helpers';

@Injectable()
export class VotersEffects {
  constructor(
    private actions$: Actions,
    private readonly _store: Store<fromRoot.State>
  ) {}

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
      mergeMap((action: any) => {
        // dummy code to get the last voter
        var voters = this._store.pipe(
          select((store) => store.voters.voters),
          select(selectAll)
        );
        const lastVoter = takeFirst(voters).reduce((max, voter) =>
          voter.id ? { ...voter } : max
        );

        return of({
          id: lastVoter.id + 1,
          name: action.payload.name,
          hasVoted: false,
        }).pipe(
          map((voter) => ({
            type: VotersActionTypes.AddVoterSucceeded,
            payload: { voter },
          })),
          catchError(() => of({ type: 'AddVoterFailed' }))
        );
      })
    )
  );
}
