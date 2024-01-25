import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SharedDataService } from './tesla-core/services/shared-data.service';
import { step1, step2, step3 } from './tesla-core/constants/common-constants';
import { TeslaDataService } from './tesla-core/services/test-data-service';
import { TeslaCarImageComponent } from './tesla-car-image/tesla-car-image.component';
import { TabsComponent } from './tabs/tabs.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TeslaCarImageComponent, TabsComponent, HttpClientModule, ReactiveFormsModule, RouterOutlet, RouterModule],
  providers: [TeslaDataService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  stepList: string[] = [step1, step2, step3];
  disabledStepList: string[] = [];
  unSubscribe$: Subject<boolean> = new Subject<boolean>();  
  activeTab: string = step1;
  stepsRoute = {
    [step1]: 'tesla-car-model',
    [step2]: 'tesla-car-config-option',
    [step3]: 'tesla-car-summary'
  };

  constructor(private sharedDataService: SharedDataService, private router: Router) { }

  ngOnInit() {
    this.sharedDataService.carModelStepCompService.pipe(takeUntil(this.unSubscribe$)).subscribe((val) => {
      const deleteIndex = this.disabledStepList.indexOf(step2);
      if (val && deleteIndex >= 0) {
        this.disabledStepList.splice(deleteIndex, 1);
      }
      if (!val && !this.disabledStepList.includes(step2)) {
        this.disabledStepList.push(step2);
      }
    });

    this.sharedDataService.carConfigStepCompService.pipe(takeUntil(this.unSubscribe$)).subscribe((val) => {
      const deleteIndex = this.disabledStepList.indexOf(step3);
      if (val && deleteIndex >= 0) {
        this.disabledStepList.splice(deleteIndex, 1);
      }
      if (!val && !this.disabledStepList.includes(step3)) {
        this.disabledStepList.push(step3);
      }
    });

    setTimeout(() => {
      this.activeTab = this.getActiveStep(window.location.pathname.replace('/', ''));
    }, 10)
  }

  updateTabStep(tabName: typeof step1 | typeof step2 | typeof step3) {
    this.router.navigate([this.stepsRoute[tabName]]);
  }

  getActiveStep(path: string) {
    switch (path) {
      case 'tesla-car-model': return step1;
      case 'tesla-car-config-option': return step2;
      case 'tesla-car-summary': return step3;
    }
    return step1;
  }

  ngOnDestroy() {
    this.unSubscribe$.next(true);
    this.unSubscribe$?.unsubscribe();
  }

}
