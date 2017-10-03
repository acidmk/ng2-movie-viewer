import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { CommonModule } from "@angular/common";
import { HttpModule } from '@angular/http';


import { reducers } from './reducers';
import { MovieEffects } from './effects/movie';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components';

import { MovieDbService } from './services/movie-db';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [    
    BrowserModule,
    CommonModule,
    //FormsModule,
    ComponentsModule,
    HttpModule,
    NgbModule.forRoot(),
    EffectsModule.forRoot([MovieEffects]),
    StoreModule.forRoot(reducers, {
      initialState: { }
    })
  ],
  providers: [MovieDbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
