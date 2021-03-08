import { AuthInterceptor } from './interceptors/auth';
import { AuthService } from '@services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { NewGameComponent } from '@components/new-game/new-game.component';
import { GamesComponent } from '@components/games/games.component';
import { FriendsComponent } from '@components/friends/friends.component';
import { AboutComponent } from '@components/about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { TableComponent } from '@components/public/table/table.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChatComponent } from '@components/chat/chat.component';
import { MessageComponent } from '@components/chat/message/message.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '@components/login/login.component';
import { HeadersInterceptor } from './interceptors/headers';
import { ModalComponent } from '@components/friends/modal/modal.component';
import { ResultComponent } from '@components/chat/modal/result.component';
import {MatDialogModule} from '@angular/material/dialog';
import { initFactory } from './models/initFactory';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NewGameComponent,
    GamesComponent,
    FriendsComponent,
    AboutComponent,
    TableComponent,
    ChatComponent,
    MessageComponent,
    LoginComponent,
    ModalComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTabsModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTableModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: HeadersInterceptor, 
      multi: true 
    },
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor, 
      multi: true 
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initFactory,
      deps: [AuthService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
