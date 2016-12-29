import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { TestBed, async } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';
import { ModelService } from './model.service';
import { IMedalist } from './medalist.interface';
import { ApiService, DataParcerService } from '../services/index';

export function main() {
  describe('ModelService', () => {
    let modelService: ModelService;
    let mockBackend: MockBackend;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          ModelService,
          ApiService,
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

    it('should resolve to list of medalists when get called', async(() => {
      let modelService = TestBed.get(ModelService);
      let mockBackend = TestBed.get(MockBackend);

      mockBackend.connections.subscribe((c: any) => {
        c.mockRespond(new Response(new ResponseOptions({ body: '['
          +'{'+
          '  "athlete": "KOGO, Micah",'+
          '  "country": "KEN",'+
          '  "sex": "Men",'+
          '  "event": "10000m",'+
          '  "medal": "Bronze"'+
          '},'+
          '{'+
          '  "athlete": "BEKELE, Kenenisa", '+
          '  "country": "ETH", '+
          '  "sex": "Men", '+
          '  "event": "10000m", '+
          '  "medal": "Gold" ' +
          '}]'
         })));
      });

      modelService.getOlympicsData().subscribe((data: any) => {
        expect(data).toEqual([
          {
            "athlete": "KOGO, Micah",
            "country": "KEN",
            "sex": "Men",
            "event": "10000m",
            "medal": "Bronze"
          },
          {
            "athlete": "BEKELE, Kenenisa",
            "country": "ETH",
            "sex": "Men",
            "event": "10000m",
            "medal": "Gold"
          }]);
      });
    }));

    it('should resolve to filter medalists accordingly', async(() => {
      let modelService = TestBed.get(ModelService);
      let initialData = '[{"athlete":"KOGO, Micah","country":"KEN","sex":"Men","event":"10000m","medal":"Gold"},{"athlete":"BEKELE, Kenenisa","country":"KEN","sex":"Men","event":"10000m","medal":"Gold"}]';
      let country =  'KEN';
      let number =  2;
      let responseData = '[{"country":"KEN","medals":2,"gold":[{"athlete":"KOGO, Micah","country":"KEN","sex":"Men","event":"10000m","medal":"Gold"},{"athlete":"BEKELE, Kenenisa","country":"KEN","sex":"Men","event":"10000m","medal":"Gold"}]}]';
      let mapData = modelService.getCountriesByMedals(JSON.parse(initialData), country, number);
      expect(JSON.stringify(mapData)).toEqual(responseData);
    }));


  });
}
