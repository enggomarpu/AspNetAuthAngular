import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-date-reactive-form',
  templateUrl: './date-reactive-form.component.html',
  styleUrls: ['./date-reactive-form.component.css']
})
export class DateReactiveFormComponent {

  dateForm!: FormGroup;
  bsConfig: Partial<BsDatepickerConfig> = {
    dateInputFormat: 'DD/MM/YYYY',
    containerClass: 'theme-default',
    showClearButton: true,
    showTodayButton: true,
    todayPosition: 'right',
    clearPosition: 'right',
    showWeekNumbers: false,
}
  submitted = false;
  arrivalDateValue: Date | undefined = undefined
  minDate: Date | undefined = undefined
  arrivalMaxDate: Date | undefined = undefined
  //departureDate: Date | undefined = undefined


  constructor(private fb: FormBuilder) {
    this.dateForm = this.fb.group({
      arrivalDate: new FormControl('', {validators: [Validators.required]}),
      departureDate: new FormControl('', {validators: [Validators.required]}),
    })

    this.arrivalDateField.valueChanges.subscribe(date => {
      if (date && (isNaN(date.getTime()))) {
        this.arrivalDateField.setValue(null);
      }
      if(date instanceof Date){
        this.minDate = new Date(date)
      }
    });


    this.departureDateField.valueChanges.subscribe(date => {
      if (date && (isNaN(date.getTime()))) {
        this.departureDateField.setValue(null);
      }
      if(date instanceof Date){
        this.arrivalMaxDate = new Date(date)
      }
    });
    

    

  }

  validateDate() {
    const date = this.arrivalDateField.value;
    
    if (date && isNaN(date.getTime()) ) {
      this.arrivalDateField.setValue(null);
    }
  }
  



  ngOnInit(): void {
   
  }

  onArrivalDateChange(event: Date | string): void {
    let dateValue = undefined
    console.log('arrival-event', event)
    if(event == 'Invalid Date'){
      dateValue = undefined
    }
    this.arrivalDateValue = undefined
    this.arrivalDateField.setValue(dateValue)
  }

  get arrivalDateField(): FormControl {
		return this.dateForm.get('arrivalDate') as FormControl;
	}

  get departureDateField(): FormControl {
		return this.dateForm.get('departureDate') as FormControl;
	}

  onSubmit(): void {
    this.submitted = true;
    this.dateForm.markAllAsTouched(); 
    if (this.dateForm.invalid) {
      return;
    }
    
    // Process form submission
    console.log('Form value:', this.dateForm.value);
  }

}
