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

import { MdModule } from './shared/md.module';

// Components
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { AppComponent } from './components/app/app.component';
import { BillingComponent } from './components/billing/billing.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FinancesComponent } from './components/finances/finances.component';
import { FlatFormComponent } from './components/flat-form/flat-form.component';
import { FlatsListComponent } from './components/flats-list/flats-list.component';
import { HouseFormComponent } from './components/house-form/house-form.component';
import { HousesListComponent } from './components/houses-list/houses-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { PollFormComponent } from './components/poll-form/poll-form.component';
import { PollsComponent } from './components/polls/polls.component';
import { PollsListComponent } from './components/polls-list/polls-list.component';
import { ProfileBoxComponent } from './components/profile-box/profile-box.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { ServiceFormComponent } from './components/service-form/service-form.component';
import { ServicesListComponent } from './components/services-list/services-list.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';

// Services
import { AuthService } from './services/auth.service';
import { FlatsService } from './services/flats.service';
import { HousesService } from './services/houses.service';
import { PollsService } from './services/polls.service';
import { ServicesService } from './services/services.service';
import { TransactionsService } from './services/transactions.service';
import { WebSocketService } from './services/web-socket.service';

// Pipes
import { FindOnePipe } from './pipes/find-one.pipe';

// Reducers
import { authReducer } from './reducers/auth.reducer';
import { flatsReducer } from './reducers/flats.reducer';
import { selectedFlatReducer } from './reducers/selected-flat.reducer';
import { housesReducer } from './reducers/houses.reducer';
import { selectedHouseReducer } from './reducers/selected-house.reducer';
import { pollsReducer } from './reducers/polls.reducer';
import { selectedPollReducer } from './reducers/selected-poll.reducer';
import { servicesReducer } from './reducers/services.reducer';
import { selectedServiceReducer } from './reducers/selected-service.reducer';
import { transactionsReducer } from './reducers/transactions.reducer';
import { selectedTransactionReducer } from './reducers/selected-transaction.reducer';

@NgModule({
  declarations: [
    AnnouncementsComponent,
    AppComponent,
    BillingComponent,
    DashboardComponent,
    FinancesComponent,
    FlatFormComponent,
    FlatsListComponent,
    HouseFormComponent,
    HousesListComponent,
    NotFoundComponent,
    PaymentsComponent,
    PollFormComponent,
    PollsComponent,
    PollsListComponent,
    ProfileBoxComponent,
    ResourcesComponent,
    ServiceFormComponent,
    ServicesListComponent,
    TransactionFormComponent,
    TransactionsListComponent,
    FindOnePipe,
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
      transactions: transactionsReducer,
      selectedTransaction: selectedTransactionReducer,
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
      transactions: [],
      selectedTransaction: null,
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
    FlatsService,
    HousesService,
    PollsService,
    ServicesService,
    TransactionsService,
    WebSocketService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
