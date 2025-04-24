import { ChangeDetectionStrategy, Component, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { ControlValueAccesorDirective } from '../control-value-accessor.directive';
import { InputType } from '../input.interface';
import { FormGroup, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'c-input',
  // imports: [
  //   CommonModule,
  //   FormsModule,
  //   ReactiveFormsModule,
  //   ErrorInputComponent,
  // ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  templateUrl: './form-textarea.component.html',
  //styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent<T>
  extends ControlValueAccesorDirective<T>
  implements InputType
{
  @Input() id = '';
  @Input() css: InputType['css'] = 'input-primary';
  @Input() placeholder?: string | undefined;
  @Input() value?: string | number | undefined;
  @Input() customErrorMessages: Record<string, string> = {};
  @Input() name!: string;
}
