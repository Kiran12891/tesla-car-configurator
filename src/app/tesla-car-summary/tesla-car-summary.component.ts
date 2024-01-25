import { CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { chooseDropdown, maxSpeed, miles, range, step3, summary, teslaModel, totalCost, towHitchPack, towHitchPackage, yokePackage, yokeWheelPack } from '../tesla-core/constants/common-constants';
import { Color, ConfigDetail, ModelWithoutColors } from '../tesla-core/interfaces/model.interface';
import { SharedDataService } from '../tesla-core/services/shared-data.service';

@Component({
  selector: 'app-tesla-car-summary',
  standalone: true,
  imports: [HttpClientModule, CurrencyPipe],
  templateUrl: './tesla-car-summary.component.html',
  styleUrl: './tesla-car-summary.component.scss'
})
export class TeslaCarSummaryComponent {
  currentConfigDetail!: ConfigDetail;
  teslaCarModelPrice: number = 0;
  teslaCarConfigPrice: number = 0;
  carConfig = [];
  modelDetail!: ModelWithoutColors;
  teslaCarModelDetail!: Color;
  towHitchPackage = towHitchPackage;
  yokeSteeringWheelPackage = yokePackage; step3 = step3;
  chooseDropdown = chooseDropdown; range = range; miles = miles; maxSpeed = maxSpeed;
  totalCost = totalCost; summary = summary; teslaModel = teslaModel; towHitchPack = towHitchPack; yokeWheelPack = yokeWheelPack;

  constructor(private sharedDataService: SharedDataService) { }

  ngOnInit() {
    if (this.sharedDataService.saveTeslaCarModelInfo) {
      this.modelDetail = this.sharedDataService.saveTeslaCarModelInfo.model;
      this.teslaCarModelDetail = this.sharedDataService.saveTeslaCarModelInfo.color;
      this.teslaCarModelPrice = this.teslaCarModelDetail?.price;
    }
    if (this.sharedDataService.storeUpdatedCarConfig) {
      this.currentConfigDetail = this.sharedDataService.storeUpdatedCarConfig;
      this.teslaCarConfigPrice = this.currentConfigDetail?.configDetails?.price;
    }
  }
}
