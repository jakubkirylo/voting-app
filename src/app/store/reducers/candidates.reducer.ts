import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Candidate } from 'src/app/models/candidate';
import {
  CandidatesActions,
  CandidatesActionTypes,
} from '../actions/candidates.actions';

export interface State extends EntityState<Candidate> {}
const adapter: EntityAdapter<Candidate> = createEntityAdapter<Candidate>();
const emptyState: State = adapter.getInitialState({});
export const initialState: State = { ...emptyState };

export function reducer(
  state: State = initialState,
  action: CandidatesActions
): State {
  switch (action.type) {
    case CandidatesActionTypes.LoadCandidatesRequested: {
      return {
        ...state,
      };
    }
    case CandidatesActionTypes.LoadCandidatesSucceeded: {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
}
