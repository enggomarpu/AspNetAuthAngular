import { Component } from '@angular/core';
import { MEDICATIONS } from 'src/app/shared/constants';

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
  selector: 'app-radio-buttons-group',
  templateUrl: './radio-buttons-group.component.html',
  styleUrls: ['./radio-buttons-group.component.css']
})
export class RadioButtonsGroupComponent {

  medications = MEDICATIONS

  data: any = {
    inpuText: ''
  }

    chooseYesNo(sectionId: string, question: MedicalHistoryQuestion, selectedValue: boolean){
     question.answer = selectedValue
  
     console.log('medications', this.medications)
  
    }

}
