import { Component } from '@angular/core';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-loading-animation',
  templateUrl: './loading-animation.component.html',
})
export class LoadingAnimationComponent {
  constructor(public readonly spinnerService: SpinnerService) {
  }
}
