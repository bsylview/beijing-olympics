import { FormsModule } from '@angular/forms';
import {
  async,
  TestBed
} from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';
import { StatsComponent } from './stats.component';
import { ModelService, IMedalist, DataParcerService } from '../shared/index';


export function main() {
  describe('Stats component', () => {

    beforeEach(() => {

      TestBed.configureTestingModule({
        imports: [FormsModule],
        declarations: [StatsComponent],
        providers: [
          DataParcerService,
          { provide: ModelService, useValue: new MockModelService() }
        ]
      });

    });
  });
}

class MockModelService {

  returnValue: Array<IMedalist>;

  getOlympicsData(): Observable<Array<IMedalist>> {
    return Observable.create((observer: any) => {
      observer.next(this.returnValue);
      observer.complete();
    });
  }

  getCountriesByMedals(data: Array<IMedalist>) {
    let dataParcerService = TestBed.get(DataParcerService);
    return dataParcerService.filterCountriesByMedals(data);
  }
}
