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
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthService } from './auth.service';
import { DecisionsService } from './decisions.service';
import { HousesService } from './houses.service';
import { FlatsService } from './flats.service';
import { WebSocketService } from './web-socket.service';
import { decisionsReducer } from './reducers/decisions.reducer';
import { authReducer } from './reducers/auth.reducer';
import { housesReducer } from './reducers/houses.reducer';
import { flatsReducer } from './reducers/flats.reducer';
import { selectedHouseReducer } from './reducers/selected-house.reducer';
import { selectedFlatReducer } from './reducers/selected-flat.reducer';
import { ProfileBoxComponent } from './profile-box/profile-box.component';
import { PollsComponent } from './polls/polls.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FinancesComponent } from './finances/finances.component';
import { PaymentsComponent } from './payments/payments.component';
import { NewsComponent } from './news/news.component';
import { ResourcesComponent } from './resources/resources.component';
import { HousesListComponent } from './houses-list/houses-list.component';
import { FlatsListComponent } from './flats-list/flats-list.component';
import { HouseCreateComponent } from './house-create/house-create.component';
import { HouseUpdateComponent } from './house-update/house-update.component';
import { FlatCreateComponent } from './flat-create/flat-create.component';
import { FlatUpdateComponent } from './flat-update/flat-update.component';

@NgModule({
  declarations: [
    AppComponent,
    DecisionsListComponent,
    DecisionCreateComponent,
    NotFoundComponent,
    ProfileBoxComponent,
    PollsComponent,
    DashboardComponent,
    FinancesComponent,
    PaymentsComponent,
    NewsComponent,
    ResourcesComponent,
    FlatsListComponent,
    HousesListComponent,
    HouseCreateComponent,
    HouseUpdateComponent,
    FlatUpdateComponent,
    FlatCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: DashboardComponent },
      { path: 'payments', component: PaymentsComponent },
      { path: 'finances', component: FinancesComponent },
      { path: 'resources', component: ResourcesComponent },
      { path: 'resources/new-house', component: HouseCreateComponent },
      { path: 'resources/new-flat', component: FlatCreateComponent },
      { path: 'polls', component: PollsComponent },
      { path: 'new', component: DecisionCreateComponent },
      { path: 'news', component: NewsComponent },
      { path: '**', component: NotFoundComponent },
    ], { useHash: true }),
    MdModule.forRoot(),
    StoreModule.provideStore({
      decisions: decisionsReducer,
      auth: authReducer,
      houses: housesReducer,
      selectedHouse: selectedHouseReducer,
      flats: flatsReducer,
      selectedFlat: selectedFlatReducer,
    }, {
      decisions: [],
      auth: {},
      houses: [],
      selectedHouse: null,
      flats: [],
      selectedFlat: null,
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
    HousesService,
    FlatsService,
    WebSocketService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
