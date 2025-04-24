import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-arrival-departure',
  templateUrl: './arrival-departure.component.html',
  styleUrls: ['./arrival-departure.component.css']
})
export class ArrivalDepartureComponent implements OnInit {

  // Just need to capture (onHidden) event for date comparsion of arrival and departure.
  // No need of extra event. 
  
  @ViewChild('roomAllocationPatientVisitorForm') form!: NgForm;
  
  bsConfig: Partial<BsDatepickerConfig> = {
    dateInputFormat: 'DD/MM/YYYY',
    containerClass: 'theme-default',
    showClearButton: true,
    showTodayButton: true,
    todayPosition: 'right',
    clearPosition: 'right',
    showWeekNumbers: false,
  }

  data: any = {
  
  }

  arrivalDate: Date | undefined = undefined
  departureDate: Date | undefined = undefined
  
  ngOnInit(): void {
    this.data.occupantArrivalDate = new Date(2025, 4, 13)
    this.data.occupantDepartureDate = new Date(2025, 4, 11)
  }

  isDepartureGreaterThanArrival: boolean = false

  checkArrivalShorterThanDeparture(){
    if(this.data.occupantArrivalDate && this.data.occupantDepartureDate){
      const isBefore = moment(this.data.occupantArrivalDate).isBefore(moment(this.data.occupantDepartureDate))
      this.isDepartureGreaterThanArrival = isBefore
    }
  }
  arrivalBlur(){
    this.checkArrivalShorterThanDeparture()
  }

  departureBlur(){ 
    this.checkArrivalShorterThanDeparture()
  }

  onSave(){
    console.log('sssss', this.isDepartureGreaterThanArrival)
    console.log('form-valid', this.form.form.valid)
  }
    
   onArrivalDateChange(event: Date | string){
      console.log('date-value-arrival', event)
      if(event == 'Invalid Date'){
        this.arrivalDate = undefined
      }
    }
  
    changeArrival(event: Event){
      const value = (<HTMLInputElement>event.target).value
      console.log('event---', value)
      if(value == 'Invalid date'){
        console.log('invalid-date')
        this.arrivalDate = undefined
      }
    }
  
    blurArrival(event: any){
      console.log('sssssssssssssss', event)
      const value = (<HTMLInputElement>event.target).value
      setTimeout(() => {
        this.arrivalDate = undefined
      }, 100);
      
    }
  
    onDepartureDateChange(event: Date | string){
      console.log('date-value-arrival', event)
      if(event == 'Invalid Date'){
        this.departureDate = undefined
      }
    }

    departureDateChange(eventDate: Date){
      // const eventDateStr = moment(eventDate).format('YYYY-MM-DD');
      // const arrivalDateStr = moment(this.data.occupantArrivalDate).format('YYYY-MM-DD');
      // const isBefore = eventDateStr < arrivalDateStr || eventDateStr == arrivalDateStr;
      // if (this.data.occupantArrivalDate && isBefore) {
      //   setTimeout(() => {
      //     this.data.occupantDepartureDate = null; 
      //   }, 50);
      // }
      // eventDate.setDate(eventDate.getDate() - 1)
      //this.arrivalMaxDate = eventDate
    }
  
    arrivalDateChange(arrivalDate: Date){ 
      // const arrivalDateStr = moment(arrivalDate).format('YYYY-MM-DD');
      // const departureDateStr = moment(this.data.occupantDepartureDate).format('YYYY-MM-DD');
      // const isAfter = arrivalDateStr > departureDateStr || arrivalDateStr == departureDateStr;
      // if (this.data.occupantDepartureDate && isAfter) {
      //   setTimeout(() => {
      //     this.data.occupantArrivalDate = null; 
      //   }, 50);
      // }
      //arrivalDate.setDate(arrivalDate.getDate() + 1)
      //this.minDate = arrivalDate
    }

    onBlurInputArrival(){

    }
  
    onBlurInputDeparture(){
  
    }




}
