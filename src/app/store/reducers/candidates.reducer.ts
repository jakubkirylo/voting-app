import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Candidate } from 'src/app/models/candidate';
import {
  CandidatesActions,
  CandidatesActionTypes,
} from '../actions/candidates.actions';
import { VoteActions, VoteActionTypes } from '../actions/vote-actions';

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
  action: CandidatesActions | VoteActions
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
        loading:
          action.type === CandidatesActionTypes.LoadCandidatesSucceeded
            ? false
            : state.loading,
      };
    }
    case CandidatesActionTypes.AddCandidateRequested: {
      return {
        ...state,
        loading: true,
      };
    }
    case CandidatesActionTypes.AddCandidateSucceeded: {
      return {
        ...state,
        candidates: adapter.addOne(action.payload.candidate, state.candidates),
        loading:
          action.type === CandidatesActionTypes.AddCandidateSucceeded
            ? false
            : state.loading,
      };
    }
    case VoteActionTypes.VoteSucceeded: {
      return {
        ...state,
        candidates: adapter.updateOne(
          {
            id: action.payload.candidate.id,
            changes: action.payload.candidate,
          },
          state.candidates
        ),
      };
    }
    default: {
      return state;
    }
  }
}

export const { selectAll, selectEntities } = adapter.getSelectors();
