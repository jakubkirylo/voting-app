import { Candidate } from 'src/app/models/candidate';
import { Voter } from 'src/app/models/voter';

export enum VoteActionTypes {
  VoteRequested = '[Vote] Vote',
  VoteSucceeded = '[Vote] Vote Succeeded',
}

export class VoteRequested {
  readonly type = VoteActionTypes.VoteRequested;
  constructor(public payload: { voter: Voter; candidate: Candidate }) {}
}

export class VoteSucceeded {
  readonly type = VoteActionTypes.VoteSucceeded;
  constructor(public payload: { voter: Voter; candidate: Candidate }) {}
}

export type VoteActions = VoteRequested | VoteSucceeded;
