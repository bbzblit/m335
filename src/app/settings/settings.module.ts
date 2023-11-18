import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsPage } from './settings.page';
import { SettingsRoutingModule } from './settings-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [SettingsPage],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    IonicModule,
    FormsModule
  ]
})
export class SettingsModule { }
