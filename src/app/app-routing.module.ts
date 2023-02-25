import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoteManageComponent } from './components/vote-manage/vote-manage.component';
import { VoteComponent } from './components/vote/vote.component';

const routes: Routes = [
  {
    path: '',
    component: VoteManageComponent,
  },
  {
    path: 'vote',
    component: VoteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
