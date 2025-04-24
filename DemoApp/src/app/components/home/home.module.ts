import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { DateReactiveFormComponent } from './date-reactive-form/date-reactive-form.component';
import { DatePatternDirective } from './date-reactive-form/date-pattern.directive';
import { FormDatePickerComponent } from './form-date-picker/form-date-picker.component';
import { ArrivalDepartureComponent } from './arrival-departure/arrival-departure.component';
import { RadioButtonsGroupComponent } from '../../radio-buttons-group/radio-buttons-group.component';
import { RadioButtonsGroupAnotherComponent } from 'src/app/radio-buttons-group-another/radio-buttons-group-another.component';




@NgModule({
  declarations: [
    HomeComponent,
    DateReactiveFormComponent,
    DatePatternDirective,
    FormDatePickerComponent,
    ArrivalDepartureComponent,
    RadioButtonsGroupComponent,
    RadioButtonsGroupAnotherComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    BsDatepickerModule.forRoot(),
    NgbDatepickerModule,
    NgxMaskDirective, 
    NgxMaskPipe,
    ReactiveFormsModule,
    
  ],
  exports: [
    HomeComponent,
    DateReactiveFormComponent,
    RadioButtonsGroupComponent,
    RadioButtonsGroupAnotherComponent
  ],
  providers: [provideNgxMask()]
})
export class HomeModule { }
