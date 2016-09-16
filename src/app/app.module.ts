import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { MdModule } from './shared/md.module';
import { DecisionsListComponent } from './decisions-list/decisions-list.component';
import { DecisionCreateComponent } from './decision-create/decision-create.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DecisionsService } from './decisions.service';
import { WebSocketService } from './web-socket.service';
import { decisionsReducer } from './reducers/decisions.reducer';

@NgModule({
    declarations: [
        AppComponent,
        DecisionsListComponent,
        DecisionCreateComponent,
        HomeComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot([
            {path: '', component: HomeComponent},
            {path: 'new', component: DecisionCreateComponent},
            {path: '**', component: NotFoundComponent},
        ], {useHash: true}),
        MdModule.forRoot(),
        StoreModule.provideStore({
            decisions: decisionsReducer
        }, {
            decisions: []
        })
    ],
    providers: [
        DecisionsService,
        WebSocketService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
