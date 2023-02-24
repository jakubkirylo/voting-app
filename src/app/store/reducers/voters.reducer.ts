import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { Voter } from 'src/app/models/voter';
import { VotersActions, VotersActionTypes } from '../actions/voter.actions';
import * as R from 'ramda';
import { VoteActions, VoteActionTypes } from '../actions/vote-actions';

export interface State {
  voters: EntityState<Voter>;
  loading: boolean;
}
const adapter: EntityAdapter<Voter> = createEntityAdapter<Voter>();
const emptyState: State = {
  voters: adapter.getInitialState({}),
  loading: false,
};
export const initialState: State = { ...emptyState };

export function voterReducer(
  state: State = initialState,
  action: VotersActions | VoteActions
): State {
  switch (action.type) {
    case VotersActionTypes.LoadVotersRequested: {
      return {
        ...state,
        loading: true,
      };
    }
    case VotersActionTypes.LoadVotersSucceeded: {
      return {
        ...state,
        voters: adapter.addMany(action.payload.voters, state.voters),
        loading:
          action.type === VotersActionTypes.LoadVotersSucceeded
            ? false
            : state.loading,
      };
    }
    case VotersActionTypes.AddVoterRequested: {
      return {
        ...state,
        loading: true,
      };
    }
    case VotersActionTypes.AddVoterSucceeded: {
      return {
        ...state,
        voters: adapter.addOne(action.payload.voter, state.voters),
        loading:
          action.type === VotersActionTypes.AddVoterSucceeded
            ? false
            : state.loading,
      };
    }
    case VoteActionTypes.VoteSucceeded: {
      return {
        ...state,
        voters: adapter.updateOne(
          { id: action.payload.voter.id, changes: action.payload.voter },
          state.voters
        ),
      };
    }
    default: {
      return state;
    }
  }
}

export const { selectAll, selectEntities } = adapter.getSelectors();

export const eligibleVoters = createSelector(selectAll, (items) => {
  return R.filter((v: Voter) => !v.hasVoted, items);
});
