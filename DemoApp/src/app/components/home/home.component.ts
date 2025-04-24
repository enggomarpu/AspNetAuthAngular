import { Component, OnInit, ViewChild } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { parsePhoneNumberFromString, AsYouType } from 'libphonenumber-js';
import { NgbCalendar, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { ulid } from 'ulid'
import { MEDICATIONS, GAD_QUESTIONS, GAD_ITEMS } from 'src/app/shared/constants';

export interface MedicalHistoryQuestion {
  id: string; // Using string that contains a valid Guid
  text: string;
  answer: boolean | null;
  comment: string;
}

export interface MedicalHistorySection {
  id: string; // Using string that contains a valid Guid
  title: string;
  questions: MedicalHistoryQuestion[];
}

export interface MedicalHistoryFormData {
  applicationId: string;
  sections: MedicalHistorySection[];
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  DateOfBirthField: Date | undefined = new Date();
  
  arrivalDate: Date | undefined = undefined
  departureDate: Date | undefined = undefined

  medications = MEDICATIONS

  bsConfig: Partial<BsDatepickerConfig> = {
    dateInputFormat: 'DD/MM/YYYY',
    containerClass: 'theme-default',
    showClearButton: true,
    showTodayButton: true,
    todayPosition: 'right',
    clearPosition: 'right',
    showWeekNumbers: false,
  }
  

  isValidMobileNumber: boolean = false
  mobileNumberValue: string = ''
  showMask: boolean = true;
  maskedMobileNumber: string = ''
  formSubmitted: boolean = false
  uniqueId: string = ''

  positiveNumber: number | null = null;


  // data: {[key: string]: string | null} = {
  //   'questionGad1Id': '1',
  //   'questionGad2Id': '2',
  // };

  data: { [key: string]: any } = {
    questionGad1Id: 1,
    questionGad2Id: 3
  };

  model: any = {}
  questions = GAD_QUESTIONS
  items = GAD_ITEMS


  data2: any = {}

  // Add this method to handle radio selection manually
  updateSelection(questionId: string, value: any): void {
    this.data2[questionId] = value;
  }
  
  

  
  ngOnInit(): void {
    this.uniqueId = ulid()
     // Pre-initialize the data object with keys for each question
    //  this.questions.forEach(q => {
    //   this.data[q.id] = '0'; 
    // });

    this.questions = GAD_QUESTIONS



  }

  validateInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.validity.valid) {
      input.value = ''; 
    }
  }

 

  

  onValueChange(event: Date | string){
    console.log('date-value-departure', event)
    if(event == 'Invalid Date'){
      this.DateOfBirthField = undefined
    }
  }
  onMaskedInputChange(value: string){
    this.isValidMobileNumber = this.validateUKPhoneNumber(value)
  }

  validateUKHomeNumber(phone: string) {
    const parsedNumber = parsePhoneNumberFromString(phone, 'GB');
    if (parsedNumber && parsedNumber.isValid() && parsedNumber.getType() === 'FIXED_LINE') {
      return true;
    }
    return false;    
  }

  onSubmit(form: NgForm): void {
    this.formSubmitted = true; 

    if (form.invalid) {
      console.log('Form is invalid!');
      return;
    }

  }

  validateUKPhoneNumber(phone: string) {
    const parsedNumber = parsePhoneNumberFromString(phone, 'GB');
    if (parsedNumber && parsedNumber.isValid()) {
      return true;
    }
    return false;    
  }

  onPhoneInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const rawValue = inputElement.value;

    // Format the input value
    const formatter = new AsYouType('GB'); // Use the desired country code
    const formattedValue = formatter.input(rawValue);

    // Update the input element and the phoneInput variable
    this.mobileNumberValue = formattedValue;
    inputElement.value = formattedValue;
  }

  onPhoneNumberChange(phone: string): void {

    const formatter = new AsYouType('GB'); 
    const formatted = formatter.input(phone);

    this.mobileNumberValue = formatted

    this.isValidMobileNumber = this.validateUKPhoneNumber(formatted);

    // if(this.isValidMobileNumber){
    //   this.mobileNumberValue = formatted
    // }

  }

  chooseYesNo(sectionId: string, question: MedicalHistoryQuestion, selectedValue: boolean){
   question.answer = selectedValue

   console.log('medications', this.medications)

  }

  changeValue(optionId: string, questionId: string){
    this.model[questionId] = optionId

    console.log('this.mode', this.model)
  }

  changeValue2(event: string){
    //this.model[questionId] = itemId
    console.log('$event', event)
  }




  nextStep(){
    console.log('next-click----')
    alert('button-clicked')
  }


  nextStepTwo(){
    console.log('next-click----')
    alert('button-clicked---------------------')
  }

  checkulid(){
    console.log('---------------', this.uniqueId)
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

  trackByQuestionId(index: number, question: any): string {
    return question.id;
  }

  //iTvDMPahSVS1nUIn5qMg
  downloadPdf() {
    fetch("https://cdn.filestackcontent.com/iTvDMPahSVS1nUIn5qMg")
      .then(response => response.blob())
      .then(blob => {
        // Create a blob URL for the PDF data
        var url = window.URL.createObjectURL(blob);
  
        // Create a link element to trigger the download
        var a = document.createElement("a");
        a.href = url;
        a.download = "sample-document-template.pdf"; // Set the desired file name
        document.body.appendChild(a);
  
        // Trigger a click event on the link element to initiate the download
        a.click();
  
        // Clean up by revoking the blob URL and removing the link element
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch(error => {
        console.error("Failed to download the PDF file: ", error);
      });
  }
  
  
  trackById(index: number, item: any): any {
    return item.id; // Replace `id` with your unique identifier
  }



  

  







}
