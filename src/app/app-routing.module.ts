import { NewGameComponent } from './components/new-game/new-game.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/games', pathMatch: 'full' },
  { path: 'new', component: NewGameComponent },
  { path: 'games', component: NewGameComponent },
  { path: 'friends', component: NewGameComponent },
  { path: 'about', component: NewGameComponent },
  { path: '**', redirectTo: 'games' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
