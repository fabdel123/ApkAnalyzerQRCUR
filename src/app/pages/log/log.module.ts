import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogPageRoutingModule } from './log-routing.module';

import { LogPage } from './log.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogPageRoutingModule
  ],
  declarations: [LogPage]
})
export class LogPageModule {}
