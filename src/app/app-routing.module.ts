import { ChatComponent } from './components/chat/chat.component';
import { AboutComponent } from './components/about/about.component';
import { FriendsComponent } from './components/friends/friends.component';
import { GamesComponent } from './components/games/games.component';
import { NewGameComponent } from './components/new-game/new-game.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/games', pathMatch: 'full' },
  { path: 'new', component: NewGameComponent },
  { path: 'games', component: GamesComponent },
  { path: 'games/:id', component: ChatComponent },
  { path: 'friends', component: FriendsComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: 'games' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
