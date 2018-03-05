import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-centros-cuadrados',
  templateUrl: './centros-cuadrados.component.html',
  styleUrls: ['./centros-cuadrados.component.css']
})
export class CentrosCuadradosComponent implements OnInit {
  showFlashMessage = false;
  flashMessageSuccess = true;
  flashMessage = '';

  seedText = '';
  numbersToGenerateText = '';

  private seedNumber: number;
  private numbersToGenerateNumber: number;
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
    const reg = new RegExp('[0-9]{4}');
    const regDigits = /^\d+$/;

    if (regDigits.test(this.seedText.trim()) && reg.test(this.seedText.trim())
      && parseInt(this.seedText.trim(), 10) >= 1000
      && parseInt(this.seedText.trim(), 10) <= 9999) {
      if (regDigits.test(this.numbersToGenerateText.trim())
        && parseInt(this.numbersToGenerateText.trim(), 10) <= 1000 &&
        parseInt(this.numbersToGenerateText.trim(), 10) >= 1) {
        this.seedNumber = parseInt(this.seedText.trim(), 10);
        this.numbersToGenerateNumber = parseInt(this.numbersToGenerateText.trim(), 10);
        this.generateRandomNumbers();
      } else {
        this.generatedRandomNumbers = [];
        this.onShowFlashMessage('Puede generar entre 1 y 1000 números random.', false);
      }
    } else {
      this.generatedRandomNumbers = [];
      this.onShowFlashMessage('La semilla debe ser de cuatro dígitos y ser mayor o igual a 1000.', false);
    }
  }

  generateRandomNumbers() {
    this.generatedRandomNumbers = [];

    let currentX = (this.seedNumber) * (this.seedNumber);
    for (let i = 0; i < this.numbersToGenerateNumber; i++) {
      let currentXStr = '' + currentX;

      if (currentXStr.length > 4) {
        if (currentXStr.length % 2 !== 0) {
          currentXStr = '0' + currentXStr;
        }
        const spliceIndex = ((currentXStr.length - 4) / 2);
        currentXStr = currentXStr.substr(spliceIndex, 4);
      }
      currentX = parseInt(currentXStr, 10);
      currentX = currentX * currentX;
      this.generatedRandomNumbers.push(parseFloat('0.' + currentXStr));
    }

    this.onShowFlashMessage(this.numbersToGenerateNumber + ' Números generados con semilla: ' + this.seedNumber, true);
  }
}
