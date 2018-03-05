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

  onGenerateChi(){
    let kin= 1+ 3.222 * Math.log10(this.numbersToGenerateNumber);
    let k= 1+ 3.222 * Math.log10(this.numbersToGenerateNumber);
    let v= (kin-1);
    let arreglados=this.generatedRandomNumbers;
    arreglados.sort;
    let max=arreglados[arreglados.length-1];
    let m = max/kin;
    let tablas: number[];
    let fabs: number[];
    let fersteorica:number[];
    let fers:number[];
    let final:number[];
    for(let contador =1; contador<=kin; contador++){
      tablas.push(kin*contador);
      fabs.push(0);
    }
    for(let n =0; n<this.numbersToGenerateNumber; n++){
      let r=false;
      let count =0;
      while(r==false&&count<kin){
        if(arreglados[n]<=tablas[count]){
            fabs[count]++;
            r=true;
        }else{
          count++;
        }
      }
    }
    for(let n =0; n<kin; n++){
      if(fabs[n]<5){
        
        for(let m =n-1; m<k; m++){
          fabs[m] = fabs[m+1];
        }
        k=k-1;
      }
    }
    for(let newn =0; newn<k; newn++){
      fers.push(fabs[newn]/this.numbersToGenerateNumber);
      if(newn==0){
        fersteorica.push(fabs[newn]);
      }else{
        fersteorica.push(fabs[newn]-fabs[newn-1]);
      } 
      final.push(Math.pow(fersteorica[newn]-fers[newn],2)/fersteorica[newn]);
    }

   
  }
}
