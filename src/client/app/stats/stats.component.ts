import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ModelService } from '../shared/model/model.service';
import { IMedalist } from '../shared/model/medalist.interface';

@Component({
  moduleId: module.id,
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'sd-stats',
  templateUrl: 'stats.component.html',
  styleUrls: ['stats.style.css']
})

export class StatsComponent {
  //chart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public allMedals: number[];
  public goldMedals: number[];
  public silverMedals: number[];
  public bronzeMedals: number[];
  public barChartData: any[];
  public chartColors: Array<any> = [
    { backgroundColor: '#87CEEB'},
    { backgroundColor: '#FFD700'},
    { backgroundColor: '#C0C0C0'},
    { backgroundColor: '#cd7f32'}];

  public medalists: Array<IMedalist>;
  public countriesByMedals: Array<any>;

  ngOnInit() {
    this.getOlympicsData();
  }

  constructor(public model: ModelService,  private route: ActivatedRoute,
    private router: Router) {
  }

  initChartData(data: any) {
    this.barChartLabels = [];
    this.allMedals = [];
    this.goldMedals = [];
    this.silverMedals = [];
    this.bronzeMedals = []
    for (let i = 0; i < data.length; i++) {
      this.barChartLabels[i] = data[i].country;
      this.allMedals[i] = data[i].medals;
      this.goldMedals[i] = 0;
      this.silverMedals[i] = 0;
      this.bronzeMedals[i] = 0
      if (data[i].gold) {
        this.goldMedals[i] = data[i].gold.length;
      }
      if (data[i].silver) {
        this.silverMedals[i] = data[i].silver.length;
      }
      if (data[i].bronze) {
        this.bronzeMedals[i] = data[i].bronze.length;
      }
    }
    this.barChartData = [
      { data: this.allMedals, label: 'All Medals' },
      { data: this.goldMedals, label: 'Gold Medals' },
      { data: this.silverMedals, label: 'Silver Medals' },
      { data: this.bronzeMedals, label: 'Bronze Medals' }
    ]
  }

  getOlympicsData() {
    this.model.getOlympicsData().subscribe(data => {
      this.medalists = data;
      this.countriesByMedals = this.model.getCountriesByMedals(data);
      this.initChartData(this.countriesByMedals);
    });
  }

  // events
 public chartClicked(e: any): void {
   console.log(e);
   if (e.active[0]){
     let index = e.active[0]._index;
     let country = this.countriesByMedals[index].country;
     this.router.navigate([country], { relativeTo: this.route });
   }
 }
}
