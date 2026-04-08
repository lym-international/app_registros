import {
  Component, forwardRef, OnInit, OnDestroy,
  Input, LOCALE_ID
} from '@angular/core';
import {
  ControlValueAccessor, NG_VALUE_ACCESSOR,
  FormControl
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';

registerLocaleData(localeEn);

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatetimePickerComponent),
    multi: true
  }]
})
export class DatetimePickerComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() label = 'Date & Time';   // ← "CheckIn" o "CheckOut"
  @Input() required = false;

  private destroy$ = new Subject<void>();

  dateControl  = new FormControl<Date | null>(null);
  hourControl  = new FormControl<number>(12);
  minuteControl = new FormControl<number>(0);
  isPM = false;
  panelOpen = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: Date | null) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => {};

  ngOnInit(): void {
    this.dateControl.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(() => this.emitCombinedDate());
    this.hourControl.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(() => this.emitCombinedDate());
    this.minuteControl.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(() => this.emitCombinedDate());
  }

  ngOnDestroy(): void { this.destroy$.next(); this.destroy$.complete(); }

  openPanel(): void  { this.panelOpen = true; }

  closePanel(): void {
    this.panelOpen = false;
    this.onTouched();
  }

  confirmPanel(): void { this.closePanel(); }

  toggleAmPm(): void { this.isPM = !this.isPM; this.emitCombinedDate(); }

  stepHour(dir: 1 | -1): void {
    let h = (this.hourControl.value || 12) + dir;
    if (h > 12) h = 1;
    if (h < 1)  h = 12;
    this.hourControl.setValue(h);
  }

  stepMinute(dir: 1 | -1): void {
    let m = (this.minuteControl.value || 0) + dir;
    if (m > 59) m = 0;
    if (m < 0)  m = 59;
    this.minuteControl.setValue(m);
  }

  private emitCombinedDate(): void {
    const dateVal = this.dateControl.value;
    if (!dateVal) { this.onChange(null); return; }
    const result = new Date(dateVal);
    let hours = Number(this.hourControl.value) || 0;
    const minutes = Number(this.minuteControl.value) || 0;
    if (this.isPM && hours !== 12) hours += 12;
    if (!this.isPM && hours === 12) hours = 0;
    result.setHours(hours, minutes, 0, 0);
    this.onChange(result);
  }

  writeValue(value: Date | null): void {
    const d = value ? new Date(value) : new Date();
    this.dateControl.setValue(d, { emitEvent: false });
    this.setTimeFromDate(d);
  }

  private setTimeFromDate(d: Date): void {
    let h = d.getHours();
    const m = d.getMinutes();
    this.isPM = h >= 12;
    h = h % 12 || 12;
    this.hourControl.setValue(h, { emitEvent: false });
    this.minuteControl.setValue(m, { emitEvent: false });
  }

  registerOnChange(fn: (v: Date | null) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.dateControl.disable() : this.dateControl.enable();
  }

  get displayValue(): string {
    const d = this.dateControl.value;
    if (!d) return '';
    const h = this.hourControl.value || 0;
    const m = this.minuteControl.value || 0;
    const mm = String(m).padStart(2, '0');
    const ampm = this.isPM ? 'PM' : 'AM';
    return `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}, ${h}:${mm} ${ampm}`;
  }

  get paddedMinute(): string {
    return String(this.minuteControl.value ?? 0).padStart(2, '0');
  }
}