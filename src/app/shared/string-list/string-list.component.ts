import { Component, HostListener } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

/**
 * Есть кнопка "Добавить"
 * При нажатии, добавлять новый инпут
 * У каждого инпута слева будет кнопка "Удалить"
 * Компонента должна реализоввыать ControlValueAccessor
 */

@Component({
  selector: 'app-string-list',
  standalone: true,
  imports: [],
  templateUrl: './string-list.component.html',
  styleUrl: './string-list.component.css'
})
export class StringListComponent implements ControlValueAccessor {
  @HostListener('blur') public touckHandler!: (e: FocusEvent) => void;

  public onChange!: (value: string[]) => void;

  writeValue(value: string[]): void { //тут тоже меняй ссылку
    throw new Error('Method not implemented.');
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = (value: string[]) => {
      fn([...value]); // --меняем ссылку
    };
  }

  registerOnTouched(fn: (e: FocusEvent) => void): void {
    this.touckHandler = fn;
  }

  public add() {
    this.onChange([])
  }
}
