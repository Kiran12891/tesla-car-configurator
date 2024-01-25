import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeslaCarModelComponent } from './tesla-car-model.component';
import { TeslaDataService } from '../tesla-core/services/test-data-service';
import { HttpClientModule } from '@angular/common/http';

describe('TeslaCarModelComponent', () => {
  let component: TeslaCarModelComponent;
  let fixture: ComponentFixture<TeslaCarModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeslaCarModelComponent, HttpClientModule],
      providers: [TeslaDataService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TeslaCarModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
