import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig, HammerModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


export class HammerConfig extends HammerGestureConfig {
  override overrides = <any>{
    'pinch': { enable: false },
    'rotate': { enable: false }
  }
}
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, StoreModule.forRoot({}, {}), EffectsModule.forRoot([]), HammerModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, { provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig }],
  bootstrap: [AppComponent],
})
export class AppModule {}
