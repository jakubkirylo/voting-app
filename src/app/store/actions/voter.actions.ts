import { Voter } from 'src/app/models/voter';

export enum VotersActionTypes {
  LoadVotersRequested = '[Voters] Load Voters',
  LoadVotersSucceeded = '[Voters] Load Voters Succeeded',
  AddVoterRequested = '[Voters] Add Voter',
  AddVoterSucceeded = '[Voters] Add Voter Succeeded',
}

export class LoadVotersRequested {
  readonly type = VotersActionTypes.LoadVotersRequested;
}

export class LoadVotersSucceeded {
  readonly type = VotersActionTypes.LoadVotersSucceeded;
  constructor(public payload: { voters: Voter[] }) {}
}

export class AddVoterRequested {
  readonly type = VotersActionTypes.AddVoterRequested;
  constructor(public payload: { voter: Voter }) {}
}

export class AddVoterSucceeded {
  readonly type = VotersActionTypes.AddVoterSucceeded;
  constructor(public payload: { voter: Voter }) {}
}

export type VotersActions =
  | LoadVotersRequested
  | LoadVotersSucceeded
  | AddVoterRequested
  | AddVoterSucceeded;
