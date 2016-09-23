import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';

import { AppComponent } from './app.component';
import { MdModule } from './shared/md.module';
import { DecisionsListComponent } from './decisions-list/decisions-list.component';
import { DecisionCreateComponent } from './decision-create/decision-create.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthService } from './auth.service';
import { DecisionsService } from './decisions.service';
import { WebSocketService } from './web-socket.service';
import { decisionsReducer } from './reducers/decisions.reducer';
import { authReducer } from './reducers/auth.reducer';
import { ProfileBoxComponent } from './profile-box/profile-box.component';

@NgModule({
  declarations: [
    AppComponent,
    DecisionsListComponent,
    DecisionCreateComponent,
    HomeComponent,
    NotFoundComponent,
    ProfileBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'new', component: DecisionCreateComponent },
      { path: '**', component: NotFoundComponent },
    ], { useHash: true }),
    MdModule.forRoot(),
    StoreModule.provideStore({
      decisions: decisionsReducer,
      auth: authReducer,
    }, {
      decisions: [],
      auth: {},
    }),
    StoreDevtoolsModule.instrumentStore({
      monitor: useLogMonitor({
        visible: true,
        position: 'right'
      })
    }),
    StoreLogMonitorModule
  ],
  providers: [
    AuthService,
    DecisionsService,
    WebSocketService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}