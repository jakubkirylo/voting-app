import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VotersEffects } from './store/effects/voters.effects';
import { reducers } from './store/reducers';
import { VoteComponent } from './vote/vote.component';

@NgModule({
  declarations: [AppComponent, VoteComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([VotersEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
