import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeslaCarConfigComponent } from './tesla-car-config.component';
import { TeslaDataService } from '../tesla-core/services/test-data-service';

describe('TeslaCarConfigComponent', () => {
  let component: TeslaCarConfigComponent;
  let fixture: ComponentFixture<TeslaCarConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeslaCarConfigComponent],
      providers: [TeslaDataService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TeslaCarConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
