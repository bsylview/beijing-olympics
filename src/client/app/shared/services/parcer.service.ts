import { Injectable } from '@angular/core';
import { IMedalist } from '../model/medalist.interface';
import * as _ from 'underscore';

@Injectable()
export class DataParcerService {
  groupMedalistsByParam(data: Array<IMedalist>, param: string): any{
    return _.groupBy(data, param);
  }

  sortDescending(data: Array<IMedalist>):any{
    return _(data).chain().sortBy(function(data: any){ return data.length}).value().reverse();
  }

  mapValues(medalists:any, country: string, number:number): any{
    return {
      country:country,
      medals: number,
      gold:  medalists['Gold'],
      silver: medalists['Silver'],
      bronze: medalists['Bronze'],
    };
  }

  filterCountriesByMedals(data: Array<IMedalist>) {
    let groupByCountry = this.groupMedalistsByParam(data, 'country');
    let revSort = this.sortDescending(groupByCountry);
    let filter = _.map(revSort, function(value: Array<IMedalist>, key:number){
      let medalists  = this.groupMedalistsByParam(value, 'medal');
      let country =  value[0].country;
      let number =  value.length;
      return this.mapValues(medalists, country, number);
    }.bind(this));
    return filter;
  }



}
