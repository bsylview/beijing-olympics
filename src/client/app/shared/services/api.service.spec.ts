import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { TestBed, async } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';

export function main() {
  describe('ApiService', () => {
    let apiService: ApiService;
    let mockBackend: MockBackend;

    beforeEach(() => {

      TestBed.configureTestingModule({
        providers: [
          ApiService,
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

    it('should return an Observable when get called', async(() => {
      expect(TestBed.get(ApiService).getOlympicsData()).toEqual(jasmine.any(Observable));
    }));

    it('should resolve to list of medalists when get called', async(() => {
      let apiService = TestBed.get(ApiService);
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

      apiService.getOlympicsData().subscribe((data: any) => {
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


  });
}
