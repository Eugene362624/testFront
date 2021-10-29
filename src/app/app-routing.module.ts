import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMatchComponent } from './admin/add-match/add-match.component';
import { AdminComponent } from './admin/admin.component';
import { MatchesListComponent } from './matches/matches.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: '', component: MatchesListComponent },
  { path: 'sorted', component: MatchesListComponent },
  { path: 'admin/add-match', component: AddMatchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
