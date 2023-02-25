import { Observable } from 'rxjs';
import { Candidate } from './candidate';
import { Voter } from './voter';

export enum IGenericListType {
  Voters = 'Voters',
  Candidates = 'Candidates',
}

export interface columnDef {
  name: string;
  label: string;
}

export interface IGenericListDefinition {
  name: IGenericListType;
  sourceData$: Observable<Voter[] | Candidate[]>;
  columns: columnDef[];
  title: string;
  add?: {
    tooltip: string;
    icon: string;
    action: () => void;
  };
}
