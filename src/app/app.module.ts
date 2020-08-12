import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {MatGridListModule} from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BubbleSortComponent } from './bubble-sort/bubble-sort.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import { SortingAppComponent } from './sorting-app/sorting-app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {MatCardModule} from "@angular/material/card";
import { SearchingComponent } from './searching/searching.component';
import {MatInputModule} from "@angular/material/input";
import { FormsModule } from '@angular/forms';
import {MatSelect, MatSelectModule} from "@angular/material/select";
import {MatListModule} from "@angular/material/list";

@NgModule({
  declarations: [
    AppComponent,
    BubbleSortComponent,
    SortingAppComponent,
    SearchingComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatGridListModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSliderModule,
    MDBBootstrapModule.forRoot(),
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatListModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
