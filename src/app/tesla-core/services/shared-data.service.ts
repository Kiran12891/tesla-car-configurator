import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ConfigDetail, Model, ModelConfig, SelectedConfig } from '../interfaces/model.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private carModel = new Subject<SelectedConfig>();
  teslaCarModelService = this.carModel.asObservable();

  private isCarModelStepCompleted = new BehaviorSubject(false)
  carModelStepCompService = this.isCarModelStepCompleted.asObservable();

  private isCarConfigStepCompleted = new BehaviorSubject(false)
  carConfigStepCompService = this.isCarConfigStepCompleted.asObservable();

  saveTeslaCarModelInfo!: SelectedConfig;
  storeModelData!: Model[];
  storeUpdatedCarConfig!: ConfigDetail | undefined;
  saveSelectedModelConfig!: ModelConfig;
  isSelModelUpdated = false;

  constructor() { }

  updateTeslaCarModel(data: SelectedConfig) {
    this.carModel.next(data);
  }

  teslaCarModelStepCompleted(value: boolean) {
    this.isCarModelStepCompleted.next(value);
  }

  teslaCarConfigStepCompleted(value: boolean) {
    this.isCarConfigStepCompleted.next(value);
  }

}
