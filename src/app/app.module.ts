import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

import { AppComponent } from './app.component';
import { MdModule } from './shared/md.module';
import { DecisionsListComponent } from './decisions-list/decisions-list.component';
import { DecisionFormComponent } from './decision-form/decision-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthService } from './auth.service';
import { DecisionsService } from './decisions.service';
import { HousesService } from './houses.service';
import { FlatsService } from './flats.service';
import { ServicesService } from './services.service';
import { WebSocketService } from './web-socket.service';
import { decisionsReducer } from './reducers/decisions.reducer';
import { authReducer } from './reducers/auth.reducer';
import { housesReducer } from './reducers/houses.reducer';
import { flatsReducer } from './reducers/flats.reducer';
import { servicesReducer } from './reducers/services.reducer';
import { selectedHouseReducer } from './reducers/selected-house.reducer';
import { selectedFlatReducer } from './reducers/selected-flat.reducer';
import { selectedDecisionReducer } from './reducers/selected-decision.reducer';
import { selectedServiceReducer } from './reducers/selected-service.reducer';
import { ProfileBoxComponent } from './profile-box/profile-box.component';
import { PollsComponent } from './polls/polls.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FinancesComponent } from './finances/finances.component';
import { PaymentsComponent } from './payments/payments.component';
import { NewsComponent } from './news/news.component';
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
    DecisionsListComponent,
    DecisionFormComponent,
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
      { path: 'news', component: NewsComponent },
      { path: '**', component: NotFoundComponent },
    ], { useHash: true }),
    MdModule.forRoot(),
    StoreModule.provideStore({
      decisions: decisionsReducer,
      selectedDecision: selectedDecisionReducer,
      auth: authReducer,
      houses: housesReducer,
      selectedHouse: selectedHouseReducer,
      flats: flatsReducer,
      selectedFlat: selectedFlatReducer,
      services: servicesReducer,
      selectedService: selectedServiceReducer,
    }, {
      decisions: [],
      selectedDecision: null,
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
    })
  ],
  providers: [
    AuthService,
    DecisionsService,
    HousesService,
    FlatsService,
    ServicesService,
    WebSocketService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
