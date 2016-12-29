import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatsComponent } from './stats.component';
import { StatsDetailComponent } from './stats-detail/stats-detail.component';
import { StatsDetailResolver }   from './stats-detail/stats-detail-resolver.service';

const statsRoutes: Routes = [
  {
    path: 'stats',
    component: StatsComponent,
    children: [
      {
        path: ':country',
        component: StatsDetailComponent,
        resolve: {
          country: StatsDetailResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(statsRoutes)
    // RouterModule.forChild([
    //   { path: 'stats', component: StatsComponent }
    // ])
  ],
  exports: [
    RouterModule
  ],
  providers: [
    StatsDetailResolver
  ]
})
export class StatsRoutingModule { }
