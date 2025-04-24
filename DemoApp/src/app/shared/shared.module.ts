import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';

import { ErrorComponent } from './error/error.component';
import { PrimaryButtonComponent } from './primary-button/primary-button.component';
//import { FormTextareaComponent } from './form-textarea/form-textarea.component';
import { FormsModule } from '@angular/forms';
//import { ControlValueAccessorDirective } from './control-value-accessor.directive';




@NgModule({
  declarations: [
    NotFoundComponent,
    ErrorComponent,
    PrimaryButtonComponent,
    
    //FormTextareaComponent,
    //ControlValueAccessorDirective
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [PrimaryButtonComponent]
})
export class SharedModule { }
