import * as fromVoters from './voters.reducer';
import * as fromCandidates from './candidates.reducer';
import { ActionReducerMap, combineReducers } from '@ngrx/store';
import { VotersActions } from '../actions/voter.actions';
import { CandidatesActions } from '../actions/candidates.actions';
import { VoteActions } from '../actions/vote-actions';

export interface State {
  voters: fromVoters.State;
  candidates: fromCandidates.State;
}

export const reducers: ActionReducerMap<
  State,
  VotersActions | CandidatesActions | VoteActions
> = {
  voters: fromVoters.voterReducer,
  candidates: fromCandidates.candidateReducer,
};

export const reducer = combineReducers(reducers);

export const getInitialTestingState = (): State => {
  return {
    voters: fromVoters.initialState,
    candidates: fromCandidates.initialState,
  };
};
