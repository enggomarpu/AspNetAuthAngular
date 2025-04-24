import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDatePattern]'
})
export class DatePatternDirective {
  private regex: RegExp = new RegExp(/^\d{1,2}\/\d{1,2}\/\d{4}$/);
  
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: InputEvent) {
    const input = event.target as HTMLInputElement;
    if (!this.regex.test(input.value)) {
      // Prevent further invalid input
      input.value = input.value.substring(0, input.value.length - 1);
    }
  }
}