// Angular based imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';

// Sub module imports
import { MaterialModule } from './material/material.module';

// Direct component imports
// Task components could be separated into their own module (not necessary at this size of app)
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { TaskComponent } from './task/task.component';
import { TaskListComponent } from './task/task-list/task-list.component';

// NGRX and store imports
import { StoreModule } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import { TaskEffects } from './task/store/task.effects';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TaskComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([TaskEffects]),
    MaterialModule,
    StoreModule.forRoot(fromApp.appReducer)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
