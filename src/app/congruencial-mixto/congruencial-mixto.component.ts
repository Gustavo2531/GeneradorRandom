import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-congruencial-mixto',
  templateUrl: './congruencial-mixto.component.html',
  styleUrls: ['./congruencial-mixto.component.css']
})
export class CongruencialMixtoComponent implements OnInit {
  showFlashMessage = false;
  flashMessageSuccess = true;
  flashMessage = '';

  seedText = '';
  numbersToGenerateText = '';
  valueAText = '';
  valueCText = '';
  modText = '';

  private primeNumberList = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103,
    107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223,
    227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347,
    349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463,
    467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607,
    613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743,
    751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883,
    887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997, 1009];

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
          if (regDigits.test(this.modText.trim()) && parseInt(this.modText.trim(), 10) >= 1 && parseInt(this.modText.trim(), 10) <= 1000) {
            // Then, check numbers to generate
            if (regDigits.test(this.numbersToGenerateText.trim())
              && parseInt(this.numbersToGenerateText.trim(), 10) <= 1000 &&
              parseInt(this.numbersToGenerateText.trim(), 10) >= 1) {
              // Then check if 'c' and the module are coprime
              if (this.coprimeNumbers(parseInt(this.valueCText.trim(), 10), parseInt(this.modText.trim(), 10))) {
                // Then check if there is a prime that divides the module and (a-1)
                if (this.primeSecondCheck(parseInt(this.modText.trim(), 10), parseInt(this.valueAText.trim(), 10))) {
                  // Then check if 4 divides the module and (a-1)
                  if ( ( parseInt(this.modText.trim(), 10) % 4 === 0 ) && ( (parseInt(this.valueAText.trim(), 10) - 1 ) % 4 === 0) ) {
                    // Everything is ok, preparing to generate random numbers
                    this.seedNumber = parseInt(this.seedText.trim(), 10);
                    this.numbersToGenerateNumber = parseInt(this.numbersToGenerateText.trim(), 10);
                    this.valueANumber = parseInt(this.valueAText.trim(), 10);
                    this.valueCNumber = parseInt(this.valueCText.trim(), 10);
                    this.modNumber = parseInt(this.modText.trim(), 10);
                    this.generateRandomNumbers();
                  } else {
                    // 4 does not divide the module and (a-1)
                    this.generatedRandomNumbers = [];
                    this.onShowFlashMessage('No se cumple la tercera condición para un periodo completo', false);
                  }
                } else {
                  // No prime q found to divide m and (a-1)
                  this.generatedRandomNumbers = [];
                  this.onShowFlashMessage('No se cumple la segunda condición para un periodo completo', false);
                }
              } else {
                // 'c' and module are not coprime
                this.generatedRandomNumbers = [];
                this.onShowFlashMessage('No se cumple la primera condición para un periodo completo', false);
              }
            } else {
              // Numbers to generate are invalid
              this.generatedRandomNumbers = [];
              this.onShowFlashMessage('Puede generar entre 1 y 1000 números random.', false);
            }
          } else {
            // The module value is invalid
            this.generatedRandomNumbers = [];
            this.onShowFlashMessage('El valor del módulo debe estar entre 1 y 1000.', false);
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

  // Check if two values are coprime using the Euclidean algorithm
  gcd(a: number, b: number) {
    if (a === 0) {
      return b;
    } else if (b === 0) {
      return a;
    } else {
      return this.gcd(b, a % b);
    }
  }

  coprimeNumbers(a: number, b: number) {
    return this.gcd(a, b) === 1;
  }

  primeSecondCheck(m: number, a: number) {
    let found = false;
    for (let i = 0; i < this.primeNumberList.length && !found; i++) {
      if ((m % this.primeNumberList[i] === 0) && ((a - 1) % this.primeNumberList[i] === 0)) {
        found = true;
      }
    }
    return found;
  }
}
