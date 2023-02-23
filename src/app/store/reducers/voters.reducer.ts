import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Voter } from 'src/app/models/voter';
import { VotersActions, VotersActionTypes } from '../actions/voter.actions';

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
  action: VotersActions
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
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
}

export const { selectAll, selectEntities } = adapter.getSelectors();
