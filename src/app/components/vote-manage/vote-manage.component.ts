import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Candidate } from 'src/app/models/candidate';
import { Voter } from 'src/app/models/voter';
import { LoadCandidatesRequested } from 'src/app/store/actions/candidates.actions';
import { LoadVotersRequested } from 'src/app/store/actions/voter.actions';
import * as fromRoot from '../../store/reducers';
import * as fromVoters from '../../store/reducers/voters.reducer';
import * as fromCandidates from '../../store/reducers/candidates.reducer';
import {
  IGenericListDefinition,
  IGenericListType,
} from 'src/app/models/generic-list-definition';

@Component({
  selector: 'app-vote-manage',
  templateUrl: './vote-manage.component.html',
  styleUrls: ['./vote-manage.component.css'],
})
export class VoteManageComponent implements OnInit {
  @ViewChild('add', { static: true })
  add: TemplateRef<any>;
  public voters$: Observable<Voter[]>;
  public candidates$: Observable<Candidate[]>;

  public addType: IGenericListType;

  private readonly materialDialogConfig = {
    id: 'projects-modal-component',
    height: '40%',
    width: '40%',
  };

  constructor(
    private readonly _store: Store<fromRoot.State>,
    private readonly _dialog: MatDialog
  ) {}

  ngOnInit() {
    this._store.dispatch(new LoadVotersRequested());
    this._store.dispatch(new LoadCandidatesRequested());

    this.voters$ = this._store.pipe(
      select((store) => store.voters.voters),
      select(fromVoters.selectAll)
    );

    this.candidates$ = this._store.pipe(
      select((store) => store.candidates.candidates),
      select(fromCandidates.selectAll)
    );
  }

  public addNewVoterDialog(): void {
    this.addType = IGenericListType.Voters;
    this._dialog.open(this.add, this.materialDialogConfig);
  }

  public addNewCandidateDialog(): void {
    this.addType = IGenericListType.Candidates;
    this._dialog.open(this.add, this.materialDialogConfig);
  }

  public addSubmitted(): void {
    this._dialog.closeAll();
  }

  public getVotersListDefinition(): IGenericListDefinition {
    return {
      name: IGenericListType.Voters,
      sourceData$: this.voters$,
      columns: [
        { name: 'name', label: 'Name' },
        { name: 'hasVoted', label: 'Has voted' },
      ],
      title: 'Voters',
      add: {
        tooltip: 'Add a new voter',
        icon: 'add',
        action: () => {
          this.addNewVoterDialog();
        },
      },
    };
  }

  public getCandidatesListDefinition(): IGenericListDefinition {
    return {
      name: IGenericListType.Candidates,
      sourceData$: this.candidates$,
      // columns definition should be extended to get column name, label, type, filtering, sorting, etc.
      // also needs css definition to properly display the columns if number of them varies
      columns: [
        { name: 'name', label: 'Name' },
        { name: 'votes', label: 'Votes' },
      ],
      title: 'Candidates',
      add: {
        tooltip: 'Add a new candidate',
        icon: 'add',
        action: () => {
          this.addNewCandidateDialog();
        },
      },
    };
  }
}
