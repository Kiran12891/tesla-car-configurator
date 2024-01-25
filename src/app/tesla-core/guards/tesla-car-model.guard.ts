import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { SharedDataService } from '../services/shared-data.service';

export const carModelGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const sharedDataService = inject(SharedDataService)
  const router = inject(Router)
  if (sharedDataService.storeModelData) {
    return true;
  }
  return router.navigate(['/tesla-car-model'])
};
