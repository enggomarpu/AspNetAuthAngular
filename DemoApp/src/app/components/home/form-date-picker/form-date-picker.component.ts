import { Component, Input, forwardRef, OnInit, SkipSelf, ViewChild, OnChanges, SimpleChanges, EventEmitter, Output } from "@angular/core";
import { ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel } from "@angular/forms";
import { BsDatepickerConfig, BsDatepickerDirective } from "ngx-bootstrap/datepicker";

@Component({
  selector: "app-date-picker",
  templateUrl: "./form-date-picker.component.html",
  //styleUrls: ["./form-date-picker.component.scss"],
  viewProviders: [{
    provide: ControlContainer,
    useFactory: (container: ControlContainer) => container,
    deps: [[new SkipSelf(), ControlContainer]]
  }],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormDatePickerComponent),
    multi: true
  }]
})
export class FormDatePickerComponent implements ControlValueAccessor, OnInit, OnChanges {
  @Input() label: string = "";
  @Input() required: boolean = false;
  @Input() tabIndex: number = 0;
  @Input() validationMessage: string = "This field is required";
  @Input() readonly: boolean = false;
  @Input() name: string = '';
  @Input() id?: string;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() isGreaterCheck?: boolean = false;
  @Input() placeholder: string = "DD/MM/YYYY";

  @Output() dateChange = new EventEmitter<any>();
  @Output() onBlurChange = new EventEmitter<any>();
  @Output() onBlurInput = new EventEmitter<any>();

  @ViewChild('control') control!: NgModel;
  @ViewChild(BsDatepickerDirective, { static: false }) datePicker?: BsDatepickerDirective;

  bsConfig: Partial<BsDatepickerConfig> = {
    dateInputFormat: 'DD/MM/YYYY',
    containerClass: 'theme-default',
    showClearButton: true,
    showTodayButton: true,
    todayPosition: 'right',
    clearPosition: 'right',
    showWeekNumbers: false,
  };
  displayValue: Date | string = "";
  private innerValue: Date | null = null;
  private touched: boolean = false;
  disabled: boolean = false;
  private hasReceivedValue = false;

  constructor() {
    
  }

  ngOnInit(): void {
    if (this.innerValue) {
      this.displayValue = this.innerValue;
    }
    this.updateDateConstraints();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['minDate'] || changes['maxDate']) {
      this.updateDateConstraints();
    }
  }

  private updateDateConstraints(): void {
    this.bsConfig = {
      ...this.bsConfig,
      minDate: this.minDate,
      maxDate: this.maxDate,
      containerClass: 'theme-default'
    };
  }

  handleValueChange(value: any): void {
    if (value instanceof Date && isNaN(value.getTime())) {
      setTimeout(() => {
        this.innerValue = null;
        this.displayValue = '';
        this.onChange(null);
        this.dateChange.emit(null);
      });
      return;
    }

    if (!value) {
      this.innerValue = null;
      this.displayValue = '';
      this.onChange(null);
      this.dateChange.emit(null);
      return;
    }

    if (value instanceof Date) {
      
      const current = new Date()
      const isEqual = value.toDateString() === current.toDateString()
      const isGreater = new Date(value) > current || isEqual


      this.innerValue = value;
      this.displayValue = value;
      this.onChange(value);
      this.dateChange.emit(value);

      
      if (this.minDate && this.isGreaterCheck) {
        if (isGreater) {
          this.innerValue = value;
          this.displayValue = value;
          this.onChange(value);
          this.dateChange.emit(value);
        }
        if (!isGreater) {
          setTimeout(() => {
            this.innerValue = null;
            this.displayValue = '';
            this.onChange(null);
            this.dateChange.emit(null);
          });
        }
      }


    } else if (typeof value === 'string') {
      const parsedDate = this.parseDate(value);
      if (parsedDate) {
        this.innerValue = parsedDate;
        this.displayValue = parsedDate;
        this.onChange(parsedDate);
        this.dateChange.emit(parsedDate);
      }
    }
  }

  writeValue(value: any): void {
    // If we already have a valid date and receive an empty string, ignore it
    if (this.hasReceivedValue && (!value || value === '')) {
      return;
    }

    if (value instanceof Date || (typeof value === 'string' && value)) {
      let dateValue: Date | null = null;

      if (value instanceof Date) {
        dateValue = value;
      } else if (typeof value === 'string') {
        dateValue = new Date(value);
        if (isNaN(dateValue.getTime())) {
          dateValue = this.parseDate(value);
        }
      }

      if (dateValue && !isNaN(dateValue.getTime())) {
        this.innerValue = dateValue;
        this.displayValue = dateValue;
        this.hasReceivedValue = true;
      }
    } else {
      // Only clear values if we haven't received a valid value yet
      if (!this.hasReceivedValue) {
        this.innerValue = null;
        this.displayValue = '';
      }
    }
  }

  getId(): string {
    return this.id || this.name || '';
  }

  toggleDatePicker(): void {
    if (!this.readonly && !this.disabled) {
      const datePickerElement = document.querySelector(`#${this.getId()}`) as HTMLElement;
      datePickerElement?.click();
    }
  }

  // ControlValueAccessor implementation
  onChange = (_: any) => { };
  onTouched = () => { };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
  onInputKeydown(event: KeyboardEvent): void {
    if (event.key === 'Tab' && this.datePicker) {
      this.datePicker.hide();
    }
  }
  onBlur(): void {
    if (!this.touched) {
      this.touched = true;
      this.onTouched();
    }
    this.onBlurInput.emit()
  }

  onHidden(){
    this.onBlurChange.emit()
  }

  onKeyUp(): void {
    if (this.datePicker) {
      this.datePicker.hide();
    }
    console.log("Test");
  }

  get isInvalid(): boolean {
    return this.control?.invalid && (this.control?.dirty || this.control?.touched) || false;
  }

  private parseDate(dateStr: string): Date | null {
    if (!dateStr) return null;

    const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dateStr.match(datePattern);
    if (!match) return null;

    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1;
    const year = parseInt(match[3], 10);

    const date = new Date(year, month, day);

    if (
      date.getFullYear() === year &&
      date.getMonth() === month &&
      date.getDate() === day &&
      year >= 1900 &&
      year <= new Date().getFullYear() + 100
    ) {
      return date;
    }

    return null;
  }
}
