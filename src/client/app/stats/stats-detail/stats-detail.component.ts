import {Component, OnInit, HostBinding,
  trigger, transition,
  animate, style, state, ChangeDetectionStrategy, ViewEncapsulation  } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ModelService } from '../../shared/model/model.service';
import { IMedalist } from '../../shared/model/medalist.interface';
import 'rxjs/add/operator/switchMap';
import { Observable }  from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'sd-stats-details',
  templateUrl: 'stats-detail.component.html',
  styleUrls: ['./stats-detail.style.css'],
  animations: [
    trigger('routeAnimation', [
      state('*',
        style({
          opacity: 1,
          transform: 'translateX(0)'
        })
      ),
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition(':leave', [
        animate('0.5s ease-out', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]

})

export class StatsDetailComponent implements OnInit {

  public currentCountry: string;
  public medalists: Array<IMedalist>;

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  @HostBinding('style.position') get position() {
    return 'absolute';
  }

  ngOnInit() {
     this.route.data
       .subscribe((data: { country:any }) => {
          this.currentCountry = data.country;
          this.getMedalistsByCountry(this.currentCountry);
          console.log("country:", this.currentCountry);
       });
   }

   getMedalistsByCountry(country: string){
     this.model.getOlympicsData().subscribe(data => {
       let medalists = this.model.getMedalistsByCountry(data);
       this.medalists =  medalists[country];
     });
   }

  constructor(private route: ActivatedRoute,
    private router: Router, public model: ModelService) {
  }


}
