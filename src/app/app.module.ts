import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

import { AlertModule, ButtonsModule, TabsModule } from 'ng2-bootstrap/ng2-bootstrap';

import { AppComponent } from './app.component';
import { MdModule } from './shared/md.module';
import { PollsListComponent } from './polls-list/polls-list.component';
import { PollFormComponent } from './poll-form/poll-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthService } from './services/auth.service';
import { PollsService } from './services/polls.service';
import { HousesService } from './services/houses.service';
import { FlatsService } from './services/flats.service';
import { ServicesService } from './services/services.service';
import { WebSocketService } from './services/web-socket.service';
import { pollsReducer } from './reducers/polls.reducer';
import { authReducer } from './reducers/auth.reducer';
import { housesReducer } from './reducers/houses.reducer';
import { flatsReducer } from './reducers/flats.reducer';
import { servicesReducer } from './reducers/services.reducer';
import { selectedHouseReducer } from './reducers/selected-house.reducer';
import { selectedFlatReducer } from './reducers/selected-flat.reducer';
import { selectedPollReducer } from './reducers/selected-poll.reducer';
import { selectedServiceReducer } from './reducers/selected-service.reducer';
import { ProfileBoxComponent } from './profile-box/profile-box.component';
import { PollsComponent } from './polls/polls.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FinancesComponent } from './finances/finances.component';
import { PaymentsComponent } from './payments/payments.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { ResourcesComponent } from './resources/resources.component';
import { HousesListComponent } from './houses-list/houses-list.component';
import { FlatsListComponent } from './flats-list/flats-list.component';
import { HouseFormComponent } from './house-form/house-form.component';
import { FlatFormComponent } from './flat-form/flat-form.component';
import { ServicesListComponent } from './services-list/services-list.component';
import { ServiceFormComponent } from './service-form/service-form.component';
import { BillingComponent } from './billing/billing.component';

@NgModule({
  declarations: [
    AppComponent,
    PollsListComponent,
    PollFormComponent,
    NotFoundComponent,
    ProfileBoxComponent,
    PollsComponent,
    DashboardComponent,
    FinancesComponent,
    PaymentsComponent,
    AnnouncementsComponent,
    ResourcesComponent,
    FlatsListComponent,
    HousesListComponent,
    HouseFormComponent,
    FlatFormComponent,
    ServicesListComponent,
    ServiceFormComponent,
    BillingComponent
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
      { path: 'polls', component: PollsComponent },
      { path: 'announcements', component: AnnouncementsComponent },
      { path: '**', component: NotFoundComponent },
    ], { useHash: true }),
    MdModule.forRoot(),
    StoreModule.provideStore({
      polls: pollsReducer,
      selectedPoll: selectedPollReducer,
      auth: authReducer,
      houses: housesReducer,
      selectedHouse: selectedHouseReducer,
      flats: flatsReducer,
      selectedFlat: selectedFlatReducer,
      services: servicesReducer,
      selectedService: selectedServiceReducer,
    }, {
      polls: [],
      selectedPoll: null,
      auth: {},
      houses: [],
      selectedHouse: null,
      flats: [],
      selectedFlat: null,
      services: [],
      selectedService: null,
    }),
    StoreDevtoolsModule.instrumentStore({
      monitor: useLogMonitor({
        visible: true,
        position: 'right'
      })
    }),
    StoreLogMonitorModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
      deps: [Http]
    }),
    AlertModule,
    ButtonsModule,
    TabsModule,
  ],
  providers: [
    AuthService,
    PollsService,
    HousesService,
    FlatsService,
    ServicesService,
    WebSocketService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
