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
  chi: number[][] =[[3.8415, 5.9915,7.8147,9.4877,11.0705,12.5916,14.0671,15.5073,16.9190,
  18.3070,19.6752, 21.0261, 22.3620, 23.6848, 24.9958, 26.2962,27.5871, 28.8693, 30.1435, 
  31.4104, 32.6706],[2.7055, 4.6052, 6.2514, 7.7794, 9.2363,10.6446,12.0170, 13.3616, 14.6837, 15.9872, 12.2750, 18.5493,
  19.8119, 21.0641, 22.3071, 23.5418, 24.7690, 24.1555, 25.3289, 26.4976,27.662]]
  finalcompare:number=0;
  private seedNumber: number;
  private numbersToGenerateNumber: number;
  private selected:number;
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
    let kin:number= Math.floor(1+ 3.222 * Math.log10(this.numbersToGenerateNumber));
    let k:number= Math.floor(1+ 3.222 * Math.log10(this.numbersToGenerateNumber));
    let v:number=(kin-1);
    var arreglados=this.generatedRandomNumbers;
    arreglados.sort();
    let max:number=arreglados[arreglados.length-1];
    let lit:number = max/kin;
    let tablas=[];
    let fabs: number[]= [];
    let fersteorica:number[]= [];
    let fers:number[]= [];
    let final:number[]= [];
    let l:number=0;
   
    for(let contador =1; contador<=kin; contador++){
      //console.log("%f",arreglado.sort[arreglados.length-1]);
      tablas.push((arreglados[arreglados.length-1]/kin)*contador);
      
      fabs.push(0);
    }
    tablas.forEach(element => {
      console.log("%f",element);
      
    });

    
  
    
    for(let n =0; n<this.numbersToGenerateNumber; n++){
      let r=false;
      let count =0;
      while(r==false&&count<kin){
        if(arreglados[n]<=tablas[count]){
            fabs[count]=fabs[count]+1;
            
            r=true;
        }else{
          count++;
        }
      }
    }
 
   tablas.forEach(element => {
    console.log("%f",element);
    
  });
    
    if(this.numbersToGenerateNumber>20){
    for(let n =0; n<kin; n++){
      
      if(fabs[n]<5){
        
        fabs[n-1]=fabs[n-1]+fabs[n];
        for(let m=n; m<k-1; m++){
         console.log("M es %d"+m);
          let h=m+1;
          console.log
          let counting=1;
          let rin=false;
          while(fabs[h]<5&&h<k-1){
            fabs[n-1] = fabs[n-1]+fabs[h];
            rin=true;
            tablas[n-1]=tablas[h];
           
            
            h++;
            counting++;
            
          }
          for(let tab=n; tab<k;tab++){
            if(h<k){
            tablas[tab]=tablas[h];
              h++;
            }
          }

          if(rin==true){
            
            fabs[m] = fabs[m+counting];
            fabs[n-1+counting]=fabs[m+counting+1];
            fabs[m+counting]=fabs[m+counting+1];
            

            fabs.forEach(element => {
              console.log("Each element true",element);
              
            });
            console.log("El fabs counting es"+fabs[m]);
            m=n-1+counting;
            
            console.log("M ahora es %d"+m);
          }else{
            fabs[m] = fabs[m+1];
          
          }
          k=k-counting;
        }
        
       
      }
    }
  }
  fabs.forEach(element => {
    console.log("%f",element);
    
  });
  tablas.forEach(element => {
    console.log("%f",element);
    
  });
  
    for(let newn =0; newn<k; newn++){
      fers.push(fabs[newn]/this.numbersToGenerateNumber);
      
      if(newn==0){
        fersteorica.push(tablas[newn]);
        
      }else{
        fersteorica.push(tablas[newn]-tablas[newn-1]);
      } 
     
      final.push(Math.pow(fersteorica[newn]-fers[newn],2)/fersteorica[newn]);
    }
    fersteorica.forEach(element => {
      console.log(element);
      
    });
    final.forEach(element => {
      this.finalcompare=element+this.finalcompare;
      
    });

    v=k-1;
    l=v-1;
  
  
    if(this.selected==0.05){
      if(this.finalcompare<this.chi[0][v-1]){
        this.onShowFlashMessage(this.finalcompare + ' Pasa la prueba pues Es menor que el valor chi:' +this.chi[0][v-1], true);
      }else{
        this.onShowFlashMessage(this.finalcompare + ' No Pasa la prueba pues Es menor que el valor chi:' +this.chi[0][v-1], true);
      }
    }else{
      if(this.finalcompare<this.chi[1][v-1]){
        this.onShowFlashMessage(this.finalcompare + ' Pasa la prueba pues Es menor que el valor chi:' +this.chi[1][v-1], true);
      }else{
        this.onShowFlashMessage(this.finalcompare + ' No Pasa la prueba pues Es menor que el valor chi:' +this.chi[1][v-1], true);
      }
    }
   
  }


}
