import { CommonModule } from '@angular/common';
import { Component, forwardRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import { Roles } from './roles.enum';

@Component({
  selector: 'app-string-list',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StringListComponent),
      multi: true,
    },
  ],
  templateUrl: './string-list.component.html',
  styleUrl: './string-list.component.css'
})
export class StringListComponent implements ControlValueAccessor {
  @Input() availableValues = Object.values(Roles);
  private onChange!: (value: string[]) => void;
  private onTouched: () => void = () => {};
  selectedValues: string[] = [];

  @Input()
  public addLabel = 'Добавить'

  @Input()
  public deleteLabel = 'Удалить'

  writeValue(value: string[]): void {
    if(value) {
      this.selectedValues = [...value];
      };
    }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = (value: string[]) => {
      fn([...value]); 
    };
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public add() {
    this.selectedValues.push(this.availableValues[0]);
    this.onChange(this.selectedValues);
  }

  onInput(event: Event, index: number) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectedValues[index] = selectedValue;
    this.onChange(this.selectedValues);
  }

  onBlur() {
    this.onTouched();
    this.onChange(this.selectedValues);
  }

  remove(index: number) {
    this.selectedValues.splice(index, 1); 
    this.onChange(this.selectedValues);   
  }

  trackByFunc = (idx: number) => idx;
}
