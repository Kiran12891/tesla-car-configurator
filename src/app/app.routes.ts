import { Routes } from '@angular/router';
import { carModelGuard } from './tesla-core/guards/tesla-car-model.guard';
import { TeslaCarModelComponent } from './tesla-car-model/tesla-car-model.component';
import { TeslaCarConfigComponent } from './tesla-car-config/tesla-car-config.component';
import { TeslaCarSummaryComponent } from './tesla-car-summary/tesla-car-summary.component';

export const routes: Routes = [
    { path: '', redirectTo: 'tesla-car-model', pathMatch: "full" },
    { path: 'tesla-car-model', component: TeslaCarModelComponent },
    { path: 'tesla-car-config-option', component: TeslaCarConfigComponent, canActivate: [carModelGuard] },
    { path: 'tesla-car-summary', component: TeslaCarSummaryComponent, canActivate: [carModelGuard] },
    { path: '**', redirectTo: 'tesla-car-model' },

];
