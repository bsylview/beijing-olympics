import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';
import { ApiService  } from '../services/api.service';
import { DataParcerService  } from '../services/parcer.service';
import { IMedalist } from './medalist.interface';

@Injectable()
export class ModelService {
  constructor(private _api: ApiService, private _parcer: DataParcerService) { }

  getOlympicsData() {
    return this._api.getOlympicsData();
  }

  getCountriesByMedals(data: Array<IMedalist>) {
    return this._parcer.filterCountriesByMedals(data);
  }

  getMedalistsByCountry(data:Array<IMedalist>) {
    return this._parcer.groupMedalistsByParam(data, 'country');
  }
}
