import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AdminComponent } from './admin/admin.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MatchesListComponent } from './matches/matches.component';
import { MatchSort } from './matches/matchSort/matchSort.component';
import { MatchService } from './matches/shared/match.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ButtonModule, DatePickerModule, InputModule, SelectModule } from "carbon-components-angular";
import { AddMatchComponent } from './admin/add-match/add-match.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdminComponent,
    MatchesListComponent,
    MatchSort,
    AddMatchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    ButtonModule,
    InputModule,
    SelectModule,
    DatePickerModule
  ],
  providers: [
    MatchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
