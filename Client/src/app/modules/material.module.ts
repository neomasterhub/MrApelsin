import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const matModules = [
  MatProgressSpinnerModule,
];

@NgModule({
  exports: [matModules],
  imports: [matModules],
})
export class MaterialModule {
}
