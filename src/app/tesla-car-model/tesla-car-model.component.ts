import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { chooseDropdown, chooseModel, colorDropdown, modelDropdown, step1 } from '../tesla-core/constants/common-constants';
import { Color, Model, ModelWithoutColors } from '../tesla-core/interfaces/model.interface';
import { TeslaDataService } from '../tesla-core/services/test-data-service';
import { SharedDataService } from '../tesla-core/services/shared-data.service';

@Component({
  selector: 'app-tesla-car-model',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './tesla-car-model.component.html',
  styleUrl: './tesla-car-model.component.scss'
})
export class TeslaCarModelComponent {
  modelList: Model[] = [];
  colorList: Color[] = [];
  selectedModel!: ModelWithoutColors;
  modelDropdown = modelDropdown; colorDropdown = colorDropdown; chooseDropdown = chooseDropdown;
  chooseModel = chooseModel; step1 = step1;
  unSubscribe$: Subject<boolean> = new Subject<boolean>();

  teslaCarModelForm = new FormGroup({
    selectedCarModel: new FormControl('', [Validators.required]),
    modelColor: new FormControl('', [Validators.required]),
  })

  constructor(private teslaDataService: TeslaDataService, private sharedDataService: SharedDataService) { }

  ngOnInit() {
    this.initData();
    this.teslaCarModelForm.controls['selectedCarModel'].valueChanges.pipe(takeUntil(this.unSubscribe$)).subscribe((data) => {
      this.modelList.forEach((model) => {
        if (model.code === data) {
          this.selectedModel = {
            code: model.code,
            description: model.description
          };
          this.colorList = model.colors;
          this.teslaCarModelForm.controls['modelColor'].setValue(this.colorList[0].code)
        }
      })
    })

    this.teslaCarModelForm.controls['modelColor'].valueChanges.pipe(takeUntil(this.unSubscribe$)).subscribe((code) => {
      const color = this.modelList.find((model) => model.code === this.selectedModel.code)?.colors
        .find((color) =>
          color.code === code
        );
      this.updateTeslaCarModel(this.selectedModel, color);
    })

    this.teslaCarModelForm.valueChanges.pipe(takeUntil(this.unSubscribe$)).subscribe((data) => {
      if (this.teslaCarModelForm?.valid) {
        this.sharedDataService.teslaCarModelStepCompleted(true);
      } else {
        this.sharedDataService.teslaCarModelStepCompleted(false);
      }
    })
  }

  initData() {
    if (!this.sharedDataService.storeModelData) {
      this.teslaDataService.getModelDataList().pipe(takeUntil(this.unSubscribe$)).subscribe((data) => {
        this.modelList = data;
        this.sharedDataService.storeModelData = data;
      });
    } else {
      this.modelList = this.sharedDataService.storeModelData;
      this.colorList = this.sharedDataService.storeModelData.find((model) => model.code === this.sharedDataService.saveTeslaCarModelInfo.model?.code)?.colors ?? [];
      this.teslaCarModelForm.setValue({
        selectedCarModel: this.sharedDataService.saveTeslaCarModelInfo.model?.code,
        modelColor: this.sharedDataService.saveTeslaCarModelInfo.color?.code,
      })
    }
  }

  updateTeslaCarModel(model: ModelWithoutColors, color: Color | undefined) {
    if (color) {
      this.sharedDataService.updateTeslaCarModel({ model, color })
      this.sharedDataService.saveTeslaCarModelInfo = { model, color };
    }
  }

  modelChange() {
    this.sharedDataService.isSelModelUpdated = true;
    this.sharedDataService.storeUpdatedCarConfig = undefined;
    this.sharedDataService.teslaCarConfigStepCompleted(false);
  }

  ngOnDestroy() {
    this.unSubscribe$.next(true);
    this.unSubscribe$?.unsubscribe();
  }

}
