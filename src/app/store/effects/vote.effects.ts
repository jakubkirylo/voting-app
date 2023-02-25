import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { VoteActionTypes, VoteRequested } from '../actions/vote-actions';

@Injectable()
export class VoteEffects {
  constructor(private actions$: Actions) {}

  voteRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType<VoteRequested>(VoteActionTypes.VoteRequested),
      mergeMap((result) =>
        // response from server
        of(false).pipe(
          map(() => {
            const voter = { ...result.payload.voter, hasVoted: true };
            const candidate = {
              ...result.payload.candidate,
              votes: result.payload.candidate.votes + 1,
            };
            return {
              type: VoteActionTypes.VoteSucceeded,
              payload: {
                voter: voter,
                candidate: candidate,
              },
            };
          }),
          catchError(() => of({ type: 'LoadCandidatesFailed' }))
        )
      )
    )
  );
}
