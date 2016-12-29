import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { TestBed, async } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';
import { DataParcerService } from './parcer.service';
import { IMedalist } from '../model/medalist.interface';

export function main() {
  describe('DataParcerService', () => {
    let parcerService: DataParcerService;
    let mockBackend: MockBackend;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          DataParcerService,
          MockBackend,
          BaseRequestOptions,
          {
            provide: Http,
            useFactory: (backend: ConnectionBackend, options: BaseRequestOptions) => new Http(backend, options),
            deps: [MockBackend, BaseRequestOptions]
          }
        ]
      });
    });

    it('should resolve to group medalists by country when get called', async(() => {
      let parcerService = TestBed.get(DataParcerService);
      let mockBackend = TestBed.get(MockBackend);
      let initialData = [
        {
          "athlete": "KOGO, Micah",
          "country": "KEN",
          "sex": "Men",
          "event": "10000m",
          "medal": "Bronze"
        },
        {
          "athlete": "BEKELE, Kenenisa",
          "country": "KEN",
          "sex": "Men",
          "event": "10000m",
          "medal": "Gold"
        }]
      let param = 'country';
      let responseData = '{"KEN":[{"athlete":"KOGO, Micah","country":"KEN","sex":"Men","event":"10000m","medal":"Bronze"},{"athlete":"BEKELE, Kenenisa","country":"KEN","sex":"Men","event":"10000m","medal":"Gold"}]}';
      let groupByCountry = parcerService.groupMedalistsByParam(initialData, param);
      expect(JSON.stringify(groupByCountry)).toEqual(responseData);
    }));


    it('should resolve to sort medalists descending', async(() => {
      let parcerService = TestBed.get(DataParcerService);
      let initialData = '{"KEN":[{"athlete":"KOGO, Micah","country":"KEN","sex":"Men","event":"10000m","medal":"Bronze"}],"ETH":[{"athlete":"BEKELE, Kenenisa","country":"ETH","sex":"Men","event":"10000m","medal":"Gold"},{"athlete":"SIHINE, Sileshi","country":"ETH","sex":"Men","event":"10000m","medal":"Silver"}],"USA":[{"athlete":"FLANAGAN, Shalane","country":"USA","sex":"Women","event":"10000m","medal":"Bronze"}]}';
      let param = 'country';
      let responseData = '[[{"athlete":"BEKELE, Kenenisa","country":"ETH","sex":"Men","event":"10000m","medal":"Gold"},{"athlete":"SIHINE, Sileshi","country":"ETH","sex":"Men","event":"10000m","medal":"Silver"}],[{"athlete":"FLANAGAN, Shalane","country":"USA","sex":"Women","event":"10000m","medal":"Bronze"}],[{"athlete":"KOGO, Micah","country":"KEN","sex":"Men","event":"10000m","medal":"Bronze"}]]';
      let sortDescending = parcerService.sortDescending(JSON.parse(initialData));
      expect(JSON.stringify(sortDescending)).toEqual(responseData);
    }));

    it('should resolve to map medalists accordingly', async(() => {
      let parcerService = TestBed.get(DataParcerService);
      let initialData = '{"Gold":[{"athlete":"KOGO, Micah","country":"KEN","sex":"Men","event":"10000m","medal":"Gold"},{"athlete":"BEKELE, Kenenisa","country":"KEN","sex":"Men","event":"10000m","medal":"Gold"}]}';
      let country =  'KEN';
      let number =  2;
      let responseData = '{"country":"KEN","medals":2,"gold":[{"athlete":"KOGO, Micah","country":"KEN","sex":"Men","event":"10000m","medal":"Gold"},{"athlete":"BEKELE, Kenenisa","country":"KEN","sex":"Men","event":"10000m","medal":"Gold"}]}';
      let mapData = parcerService.mapValues(JSON.parse(initialData), country, number);
      expect(JSON.stringify(mapData)).toEqual(responseData);
    }));

    it('should resolve to filter medalists accordingly', async(() => {
      let parcerService = TestBed.get(DataParcerService);
      let initialData = '[{"athlete":"KOGO, Micah","country":"KEN","sex":"Men","event":"10000m","medal":"Gold"},{"athlete":"BEKELE, Kenenisa","country":"KEN","sex":"Men","event":"10000m","medal":"Gold"}]';
      let country =  'KEN';
      let number =  2;
      let responseData = '[{"country":"KEN","medals":2,"gold":[{"athlete":"KOGO, Micah","country":"KEN","sex":"Men","event":"10000m","medal":"Gold"},{"athlete":"BEKELE, Kenenisa","country":"KEN","sex":"Men","event":"10000m","medal":"Gold"}]}]';
      let mapData = parcerService.filterCountriesByMedals(JSON.parse(initialData), country, number);
      expect(JSON.stringify(mapData)).toEqual(responseData);
    }));


  });
}
