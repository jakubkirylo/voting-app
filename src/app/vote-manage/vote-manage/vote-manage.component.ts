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

@Component({
  selector: 'app-vote-manage',
  templateUrl: './vote-manage.component.html',
  styleUrls: ['./vote-manage.component.css'],
})
export class VoteManageComponent implements OnInit {
  @ViewChild('addVoter', { static: true })
  addVoter: TemplateRef<any>;
  public voters$: Observable<Voter[]>;
  public candidates$: Observable<Candidate[]>;

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
    const materialDialogConfig = {
      id: 'projects-modal-component',
      height: '40%',
      width: '40%',
    };

    this._dialog.open(this.addVoter, materialDialogConfig);
  }
}
