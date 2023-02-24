import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CandidatesEffects } from './store/effects/candidates.effects';
import { VotersEffects } from './store/effects/voters.effects';
import { reducers } from './store/reducers';
import { VoteComponent } from './vote/vote.component';
import { AddVoterComponent } from './components/add-voter/add-voter.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VoteManageComponent } from './vote-manage/vote-manage/vote-manage.component';
import { VoteEffects } from './store/effects/vote.effects';

@NgModule({
  declarations: [
    AppComponent,
    VoteComponent,
    AddVoterComponent,
    VoteManageComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([VotersEffects, CandidatesEffects, VoteEffects]),
    StoreDevtoolsModule.instrument({}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
