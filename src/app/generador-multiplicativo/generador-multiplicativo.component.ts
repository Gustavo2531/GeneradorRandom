import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generador-multiplicativo',
  templateUrl: './generador-multiplicativo.component.html',
  styleUrls: ['./generador-multiplicativo.component.css']
})
export class GeneradorMultiplicativoComponent implements OnInit {
  showFlashMessage = false;
  flashMessageSuccess = true;
  flashMessage = '';

  seedText = '';
  numbersToGenerateText = '';
  valueAText = '';
  modText = '';

  private seedNumber: number;
  private numbersToGenerateNumber: number;
  private valueANumber: number;
  private modNumber: number;
  generatedRandomNumbers: number[] = [];

  onShowFlashMessage(text: string, success: boolean) {
    this.flashMessage = text;
    this.flashMessageSuccess = success;
    this.showFlashMessage = true;
  }

  constructor() { }

  ngOnInit() {
  }

  onGenerateRandomNumbers() {
    const regDigits = /^\d+$/;

    // Check first, seed value
    if (regDigits.test(this.seedText.trim()) && parseInt(this.seedText.trim(), 10) >= 1) {
      // Then, check 'a' value
      if (regDigits.test(this.valueAText.trim()) && parseInt(this.valueAText.trim(), 10) >= 1) {
        // Then, check module value
        if (regDigits.test(this.modText.trim())
          && parseInt(this.modText.trim(), 10) >= 1
          && parseInt(this.modText.trim(), 10) > parseInt(this.valueAText, 10)
          && parseInt(this.modText.trim(), 10) > parseInt(this.seedText, 10)) {
          // Then, check numbers to generate
          if (regDigits.test(this.numbersToGenerateText.trim())
            && parseInt(this.numbersToGenerateText.trim(), 10) <= 1000 &&
            parseInt(this.numbersToGenerateText.trim(), 10) >= 1) {
            // Everything is ok, preparing to generate random numbers
            this.seedNumber = parseInt(this.seedText.trim(), 10);
            this.numbersToGenerateNumber = parseInt(this.numbersToGenerateText.trim(), 10);
            this.valueANumber = parseInt(this.valueAText.trim(), 10);
            this.modNumber = parseInt(this.modText.trim(), 10);
            this.generateRandomNumbers();
          } else {
            // Numbers to generate are invalid
            this.generatedRandomNumbers = [];
            this.onShowFlashMessage('Puede generar entre 1 y 1000 números random.', false);
          }
        } else {
          // The module value is invalid
          this.generatedRandomNumbers = [];
          this.onShowFlashMessage('El valor del módulo debe ser mayor o igual a 1 y ser estrictamente mayor que \'a\' y la semilla.', false);
        }
      } else {
        // The 'a' value is invalid
        this.generatedRandomNumbers = [];
        this.onShowFlashMessage('El valor de \'a\' debe ser mayor o igual a 1.', false);
      }
    } else {
      // The seed value is invalid
      this.generatedRandomNumbers = [];
      this.onShowFlashMessage('La semilla debe ser mayor o igual a 1.', false);
    }
  }

  generateRandomNumbers() {
    this.generatedRandomNumbers = [];

    let currentX = (this.seedNumber);
    const a = this.valueANumber;
    const modVal = this.modNumber;

    for (let i = 0; i < this.numbersToGenerateNumber; i++) {
      currentX = (a * currentX) % modVal;
      this.generatedRandomNumbers.push(currentX / modVal);
    }

    this.onShowFlashMessage(this.numbersToGenerateNumber + ' Números generados con semilla: ' +
      this.seedNumber + ', valor de \'a\'=' + this.valueANumber +
      ', valor del módulo=' + this.modNumber, true);
  }

}
