import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
  ActivatedRouteSnapshot } from '@angular/router';
import { ModelService } from '../../shared/model/model.service';

@Injectable()
export class StatsDetailResolver implements Resolve<any>{
  constructor(private modelService: ModelService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let country = route.params['country'];
    console.log("country:", country);
    return country;
  }

}
