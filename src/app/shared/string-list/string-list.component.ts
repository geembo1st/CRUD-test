import { CommonModule } from '@angular/common';
import { Component, forwardRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
/**
 * Есть кнопка "Добавить"
 * При нажатии, добавлять новый инпут
 * У каждого инпута слева будет кнопка "Удалить"
 * Компонента должна реализоввыать ControlValueAccessor
 */

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
  values: string[] = [];
  private onChange!: (value: string[]) => void;
  private onTouched: () => void = () => {};

  @Input()
  public addLabel = 'Добавить'

  @Input()
  public deleteLabel = 'Удалить'

  writeValue(value: string[]): void { //тут тоже меняй ссылку
    if(value) {
      this.values = [...value];
      };
    }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = (value: string[]) => {
      fn([...value]); // --меняем ссылку
    };
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public add() {
    this.values = [...this.values, ''];
    this.onChange(this.values);
  }

  onInput(event: Event, index: number) {
    const value = (event.target as HTMLInputElement).value;
    this.values[index] = value;
    this.onChange(this.values);
  }

  onBlur() {
    this.onTouched();
    this.onChange(this.values);
  }

  removeBook(index: number) {
    this.values.splice(index, 1); 
    this.onChange(this.values);   
  }

  trackByFunc = (idx: number) => idx;
}
