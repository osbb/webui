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
import {
  AnnouncementsComponent,
  AppComponent,
  AuthComponent,
  AuthFormComponent,
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
} from './components';

// Services
import {
  AuthService,
  FlatsService,
  HousesService,
  PollsService,
  ServicesService,
  TransactionsService,
  WebSocketService
} from './services';

// Pipes
import { FindOnePipe } from './pipes';

// Reducers
import {
  currentUserReducer,
  flatsReducer,
  selectedFlatReducer,
  housesReducer,
  selectedHouseReducer,
  pollsReducer,
  selectedPollReducer,
  servicesReducer,
  selectedServiceReducer,
  transactionsReducer,
  selectedTransactionReducer
} from './reducers';

// Guards
import { AuthGuard } from './guards';

@NgModule({
  declarations: [
    AnnouncementsComponent,
    AppComponent,
    AuthComponent,
    AuthFormComponent,
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
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'payments',
        component: PaymentsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'finances',
        component: FinancesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'resources',
        component: ResourcesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'polls',
        component: PollsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'announcements',
        component: AnnouncementsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'login',
        component: AuthComponent,
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ], { useHash: true }),
    MdModule.forRoot(),
    StoreModule.provideStore({
      polls: pollsReducer,
      selectedPoll: selectedPollReducer,
      currentUser: currentUserReducer,
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
      currentUser: JSON.parse(localStorage.getItem('currentUser')),
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
    AuthGuard,
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
