import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-congruencial',
  templateUrl: './congruencial.component.html',
  styleUrls: ['./congruencial.component.css']
})
export class CongruencialComponent implements OnInit {
  showFlashMessage = false;
  flashMessageSuccess = true;
  flashMessage = '';

  seedText = '';
  numbersToGenerateText = '';
  valueAText = '';
  valueCText = '';
  modText = '';

  private seedNumber: number;
  private numbersToGenerateNumber: number;
  private valueANumber: number;
  private valueCNumber: number;
  private modNumber: number;
  generatedRandomNumbers: number[] = [];

  onShowFlashMessage(text: string, success: boolean) {
    this.flashMessage = text;
    this.flashMessageSuccess = success;
    this.showFlashMessage = true;
  }

  constructor() {
  }

  ngOnInit() {
  }

  onGenerateRandomNumbers() {
    const regDigits = /^\d+$/;

    // Check first, seed value
    if (regDigits.test(this.seedText.trim()) && parseInt(this.seedText.trim(), 10) >= 1) {
      // Then, check 'a' value
      if (regDigits.test(this.valueAText.trim()) && parseInt(this.valueAText.trim(), 10) >= 1) {
        // Then, check 'c' value
        if (regDigits.test(this.valueCText.trim()) && parseInt(this.valueCText.trim(), 10) >= 1) {
          // Then, check module value
          if (regDigits.test(this.modText.trim()) && parseInt(this.modText.trim(), 10) >= 1) {
            // Then, check numbers to generate
            if (regDigits.test(this.numbersToGenerateText.trim())
              && parseInt(this.numbersToGenerateText.trim(), 10) <= 1000 &&
              parseInt(this.numbersToGenerateText.trim(), 10) >= 1) {
              // Everything is ok, preparing to generate random numbers
              this.seedNumber = parseInt(this.seedText.trim(), 10);
              this.numbersToGenerateNumber = parseInt(this.numbersToGenerateText.trim(), 10);
              this.valueANumber = parseInt(this.valueAText.trim(), 10);
              this.valueCNumber = parseInt(this.valueCText.trim(), 10);
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
            this.onShowFlashMessage('El valor del módulo debe ser mayor o igual a 1.', false);
          }
        } else {
          // The 'c' value is invalid
          this.generatedRandomNumbers = [];
          this.onShowFlashMessage('El valor de \'c\' debe ser mayor o igual a 1.', false);
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
    const c = this.valueCNumber;
    const modVal = this.modNumber;

    for (let i = 0; i < this.numbersToGenerateNumber; i++) {
      currentX = (a * currentX + c) % modVal;
      this.generatedRandomNumbers.push(currentX / modVal);
    }

    this.onShowFlashMessage(this.numbersToGenerateNumber + ' Números generados con semilla: ' +
      this.seedNumber + ', valor de \'a\'=' + this.valueANumber +
      ', valor de \'c\'=' + this.valueCNumber +
      ', valor del módulo=' + this.modNumber, true);
  }
}
