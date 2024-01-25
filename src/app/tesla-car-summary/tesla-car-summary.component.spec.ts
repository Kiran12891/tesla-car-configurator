import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeslaCarSummaryComponent } from './tesla-car-summary.component';
import { SharedDataService } from '../tesla-core/services/shared-data.service';
import { SAVE_CAR_MODEL_INFO_STUB, STORE_UPDATE_CAR_INFO_CONFIG } from '../tesla-core/stub/tesla-car-summary-stub';

describe('TeslaCarSummaryComponent', () => {
  let component: TeslaCarSummaryComponent;
  let fixture: ComponentFixture<TeslaCarSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeslaCarSummaryComponent],
      providers: [SharedDataService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TeslaCarSummaryComponent);
    component = fixture.componentInstance;
    component['sharedDataService'].saveTeslaCarModelInfo = SAVE_CAR_MODEL_INFO_STUB;
    component['sharedDataService'].storeUpdatedCarConfig = STORE_UPDATE_CAR_INFO_CONFIG;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
