import { Component } from '@angular/core';
import { GAD_QUESTIONS } from '../shared/constants';

@Component({
  selector: 'app-radio-buttons-group-another',
  templateUrl: './radio-buttons-group-another.component.html',
  styleUrls: ['./radio-buttons-group-another.component.css']
})
export class RadioButtonsGroupAnotherComponent {


  gadQuestions = GAD_QUESTIONS

  data: {[key: string]: any | null} = {
    // 'questionGad1Id': {
    //   'Guid1': '2f4c02a8-3b76-4e09-8145-8f7c0a5b4f7d'
    // },
    // 'questionGad2Id': {
    //   'Guid1': '2f4c02a8-3b76-4e09-8145-8f7c0a5b4f7d'
    // }
  }

  chooseValue(sectionId: string, question: any, questionId: string){
    question.selected = questionId
    this.data[sectionId] = questionId

    console.log('gadQuestions', this.gadQuestions, this.data)
  }

}
