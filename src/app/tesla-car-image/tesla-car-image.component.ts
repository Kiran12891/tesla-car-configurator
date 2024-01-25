import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { SharedDataService } from '../tesla-core/services/shared-data.service';
import { SelectedConfig } from '../tesla-core/interfaces/model.interface';

@Component({
  selector: 'app-tesla-car-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tesla-car-image.component.html',
  styleUrl: './tesla-car-image.component.scss'
})
export class TeslaCarImageComponent {
  imageUrl = '';
  unSubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(private sharedDataService: SharedDataService) { }

  ngOnInit() {
    this.sharedDataService.teslaCarModelService.pipe(takeUntil(this.unSubscribe$)).subscribe((data: SelectedConfig) => {
      this.imageUrl = '/assets/images/' + data.model.code + '/' + data.color.code + '.jpg'
    })
  }
}
