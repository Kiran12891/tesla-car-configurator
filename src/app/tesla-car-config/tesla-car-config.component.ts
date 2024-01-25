import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { TeslaDataService } from '../tesla-core/services/test-data-service';
import { SharedDataService } from '../tesla-core/services/shared-data.service';
import { chooseDropdown, configText, cost, maxSpeed, miles, range, selectConfigOptionText, step2, towHitch, yokeWheel } from '../tesla-core/constants/common-constants';
import { Config, ModelConfig } from '../tesla-core/interfaces/model.interface';

@Component({
  selector: 'app-tesla-car-config',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CurrencyPipe, CommonModule],
  templateUrl: './tesla-car-config.component.html',
  styleUrl: './tesla-car-config.component.scss'
})
export class TeslaCarConfigComponent {
  selectedModelConfig!: ModelConfig;
  isComponentedDetroyed: boolean = false;
  selectedDetails!: Config;
  initialValues: {} = {};
  chooseDropdown = chooseDropdown; range = range; miles = miles; maxSpeed = maxSpeed; selectConfigOptionText = selectConfigOptionText;
  cost = cost; towHitch = towHitch; yokeWheel = yokeWheel; configText = configText; step2 = step2;
  unSubscribe$: Subject<boolean> = new Subject<boolean>();

  teslaCarConfigForm = new FormGroup({
    configSelected: new FormControl('', [Validators.required]),
    towHitch: new FormControl(false, []),
    steeringWheel: new FormControl(false, []),
  })

  constructor(private carDataService: TeslaDataService, private sharedDataService: SharedDataService) { }

  ngOnInit() {
    this.initData();
    this.teslaCarConfigForm.valueChanges.pipe(takeUntil(this.unSubscribe$)).subscribe((data) => {
      if (this.teslaCarConfigForm.valid) {
        this.sharedDataService.teslaCarConfigStepCompleted(true);
      } else {
        this.sharedDataService.teslaCarConfigStepCompleted(false);
      }
      if (!this.isComponentedDetroyed && data?.configSelected) {
        this.selectedDetails = this.getConfigDetails(data?.configSelected);
        let selectedConfigDetails = {
          configDetails: this.getConfigDetails(data?.configSelected) ?? '',
          towHitch: data?.towHitch ?? false,
          steeringWheel: data?.steeringWheel ?? false
        }
        this.sharedDataService.storeUpdatedCarConfig = selectedConfigDetails;
      }
    })
  }

  initData() {
    this.initialValues = this.teslaCarConfigForm.value;
    if (this.sharedDataService.storeUpdatedCarConfig && !this.sharedDataService.isSelModelUpdated) {
      if (this.sharedDataService?.storeUpdatedCarConfig?.configDetails?.id != 0) {
        this.selectedDetails = this.sharedDataService?.storeUpdatedCarConfig?.configDetails;
      }
      this.teslaCarConfigForm.setValue({
        configSelected: this.sharedDataService?.storeUpdatedCarConfig?.configDetails?.id.toString() ?? '',
        towHitch: this.sharedDataService.storeUpdatedCarConfig.towHitch ?? false,
        steeringWheel: this.sharedDataService.storeUpdatedCarConfig.steeringWheel ?? false
      })
    }

    let saveTeslaCarModelInfo = this.sharedDataService.saveTeslaCarModelInfo;
    if (this.sharedDataService.isSelModelUpdated) {
      this.teslaCarConfigForm.reset(this.initialValues);
      this.sharedDataService.isSelModelUpdated = false;
      this.getModelConfigDetails(saveTeslaCarModelInfo.model.code)
    } else {
      this.selectedModelConfig = this.sharedDataService.saveSelectedModelConfig;
    }
  }

  getConfigDetails(id: string) {
    let configDetailIndividual = this.selectedModelConfig.configs.filter((val) => {
      return val.id == +id
    })
    return configDetailIndividual[0]
  }

  getModelConfigDetails(selectedModelCode: string) {
    this.carDataService.getModelsConfigDetails(selectedModelCode).pipe(takeUntil(this.unSubscribe$)).subscribe((data: ModelConfig) => {
      this.selectedModelConfig = data;
      this.sharedDataService.saveSelectedModelConfig = data;
    })
  }

  ngOnDestroy() {
    this.isComponentedDetroyed = true;
    this.unSubscribe$.next(true);
    this.unSubscribe$?.unsubscribe();
  }

}
