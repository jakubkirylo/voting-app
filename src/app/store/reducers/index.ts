import * as fromVoters from './voters.reducer';
import * as fromCandidates from './candidates.reducer';
import { ActionReducerMap, combineReducers } from '@ngrx/store';
import { VotersActions } from '../actions/voter.actions';
import { CandidatesActions } from '../actions/candidates.actions';

export interface State {
  voters: fromVoters.State;
  candidates: fromCandidates.State;
}

export const reducers: ActionReducerMap<
  State,
  VotersActions | CandidatesActions
> = {
  voters: fromVoters.voterReducer,
  candidates: fromCandidates.reducer,
};

export const reducer = combineReducers(reducers);

export const getInitialTestingState = (): State => {
  return {
    voters: fromVoters.initialState,
    candidates: fromCandidates.initialState,
  };
};
