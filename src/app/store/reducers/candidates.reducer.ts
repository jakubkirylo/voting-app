import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Candidate } from 'src/app/models/candidate';
import {
  CandidatesActions,
  CandidatesActionTypes,
} from '../actions/candidates.actions';

export interface State {
  candidates: EntityState<Candidate>;
  loading: boolean;
}
const adapter: EntityAdapter<Candidate> = createEntityAdapter<Candidate>();
const emptyState: State = {
  candidates: adapter.getInitialState({}),
  loading: false,
};
export const initialState: State = { ...emptyState };

export function candidateReducer(
  state: State = initialState,
  action: CandidatesActions
): State {
  switch (action.type) {
    case CandidatesActionTypes.LoadCandidatesRequested: {
      return {
        ...state,
        loading: true,
      };
    }
    case CandidatesActionTypes.LoadCandidatesSucceeded: {
      return {
        ...state,
        candidates: adapter.addMany(
          action.payload.candidates,
          state.candidates
        ),
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
}

export const { selectAll, selectEntities } = adapter.getSelectors();
