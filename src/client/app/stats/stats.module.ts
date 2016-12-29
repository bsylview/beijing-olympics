import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StatsRoutingModule } from './stats-routing.module';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './stats.component';
import { ModelService } from '../shared/model/model.service';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { StatsDetailComponent } from './stats-detail/stats-detail.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StatsRoutingModule,
    ChartsModule
  ],
  declarations: [
    StatsComponent,
    StatsDetailComponent
  ],
  exports: [StatsComponent, StatsDetailComponent],
  providers:[ModelService]
})
export class StatsModule { }
