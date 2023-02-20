import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Voter } from 'src/app/models/voters';
import { VotersActions, VotersActionTypes } from '../actions/voters.actions';

export interface State extends EntityState<Voter> {}
const adapter: EntityAdapter<Voter> = createEntityAdapter<Voter>();
const emptyState: State = adapter.getInitialState({});
export const initialState: State = { ...emptyState };

export function reducer(
  state: State = initialState,
  action: VotersActions
): State {
  switch (action.type) {
    case VotersActionTypes.LoadVotersRequested: {
      return {
        ...state,
      };
    }
    case VotersActionTypes.LoadVotersSucceeded: {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
}

export const { selectAll, selectEntities } = adapter.getSelectors();

// export const sortedUsersSelector: MemoizedSelector<
//     EntityState<ManageableUser>,
//     ManageableUser[]
// > = createSelector(selectAll, items => {
//     return R.sortBy((o: ManageableUser) => o.email, items);
// });
