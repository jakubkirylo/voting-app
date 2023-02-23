export enum VoteActionTypes {
  VoteRequested = '[Vote] Vote',
  VoteSucceeded = '[Vote] Vote Succeeded',
}

export class VoteRequested {
  readonly type = VoteActionTypes.VoteRequested;
}

export class VoteSucceeded {
  readonly type = VoteActionTypes.VoteSucceeded;
}

export type VoteActions = VoteRequested | VoteSucceeded;
