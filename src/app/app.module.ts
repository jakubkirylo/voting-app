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
import { VoteComponent } from './components/vote/vote.component';

import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VoteEffects } from './store/effects/vote.effects';
import { VoteManageComponent } from './components/vote-manage/vote-manage.component';
import { GenericListComponent } from './components/generic-list/generic-list.component';
import { AddComponent } from './components/add-voter/add.component';

@NgModule({
  declarations: [
    AppComponent,
    VoteComponent,
    AddComponent,
    VoteManageComponent,
    GenericListComponent,
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
