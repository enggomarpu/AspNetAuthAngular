import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.css']
})
export class PrimaryButtonComponent {
  @Output() onButtonClick = new EventEmitter<void>();

  @Input() label: string = 'Button';  
  @Input() type?: string = 'button';   
  @Input() disabled?: boolean = false; 
  @Input() readonly?: boolean = false; 
  @Input() class: string = '';       
  @Input() icon?: string;           
  // @Input() hidden?: boolean = false;  
  @Input() iconPosition?: 'left' | 'right' = 'right';

  onClick(){
    this.onButtonClick.emit()
  }



}
