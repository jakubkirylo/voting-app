import { Candidate } from 'src/app/models/candidate';

export enum CandidatesActionTypes {
  LoadCandidatesRequested = '[Candidates] Load Candidates',
  LoadCandidatesSucceeded = '[Candidates] Load Candidates Succeeded',
  AddCandidateRequested = '[Candidates] Add Candidate',
  AddCandidateSucceeded = '[Candidates] Add Candidate Succeeded',
}

export class LoadCandidatesRequested {
  readonly type = CandidatesActionTypes.LoadCandidatesRequested;
}

export class LoadCandidatesSucceeded {
  readonly type = CandidatesActionTypes.LoadCandidatesSucceeded;
  constructor(public payload: { candidates: Candidate[] }) {}
}

export class AddCandidateRequested {
  readonly type = CandidatesActionTypes.AddCandidateRequested;
  constructor(public payload: { name: string }) {}
}

export class AddCandidateSucceeded {
  readonly type = CandidatesActionTypes.AddCandidateSucceeded;
  constructor(public payload: { candidate: Candidate }) {}
}

export type CandidatesActions =
  | LoadCandidatesRequested
  | LoadCandidatesSucceeded
  | AddCandidateRequested
  | AddCandidateSucceeded;
