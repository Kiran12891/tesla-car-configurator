import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeslaCarImageComponent } from './tesla-car-image.component';

describe('TeslaCarImageComponent', () => {
  let component: TeslaCarImageComponent;
  let fixture: ComponentFixture<TeslaCarImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeslaCarImageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TeslaCarImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
