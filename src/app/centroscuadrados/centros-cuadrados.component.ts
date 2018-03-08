import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-centros-cuadrados',
  templateUrl: './centros-cuadrados.component.html',
  styleUrls: ['./centros-cuadrados.component.css']
})
export class CentrosCuadradosComponent implements OnInit {

  
  seedText = '';
  textByNumbers = '';
  chi: number[][] =[[3.8415, 5.9915,7.8147,9.4877,11.0705,12.5916,14.0671,15.5073,16.9190,
  18.3070,19.6752, 21.0261, 22.3620, 23.6848, 24.9958, 26.2962,27.5871, 28.8693, 30.1435, 
  31.4104, 32.6706],[2.7055, 4.6052, 6.2514, 7.7794, 9.2363,10.6446,12.0170, 13.3616, 14.6837, 15.9872, 12.2750, 18.5493,
  19.8119, 21.0641, 22.3071, 23.5418, 24.7690, 24.1555, 25.3289, 26.4976,27.662]]
  finalcompare:number=0;
  private semillaN: number;
  private generateNum: number;
  private selected:number;
  private selectedSK:number;
  private selectK:number;
  kolsmir:number[][]=[[0.975,0.842,0.708,0.624,0.565,0.532,0.486,0.457,0.432,0.410,0.391,0.375,0.361,0.349,
  0.338,0.328,0.318,0.309,0.301,0.294],
  [0.950,0.776,0.642,0.564, 0.510, 0.470, 0.438,0.411, 0.388, 0.368, 0.352, 0.338, 0.325, 0.314, 0.304, 0.295,
  0.286,0.278,0.272, 0.264]]
  numerosAleatorios: number[] = [];
  showFlashMessage = false;
  flashMessageSuccess = true;
  flashMessage = '';
 
  constructor() {
   
  }

  ngOnInit() {
  }
  mostrarMensaje(text: string, success: boolean) {
    this.flashMessage = text;
    this.flashMessageSuccess = success;
    this.showFlashMessage = true;
  }


  generateA() {
    const reg = new RegExp('[0-9]{4}');
    const digitosRegex = /^\d+$/;

    if (digitosRegex.test(this.seedText.trim()) && reg.test(this.seedText.trim())
      && parseInt(this.seedText.trim(), 10) >= 1000
      && parseInt(this.seedText.trim(), 10) <= 9999) {
      if (digitosRegex.test(this.textByNumbers.trim())
        && parseInt(this.textByNumbers.trim(), 10) <= 1000 &&
        parseInt(this.textByNumbers.trim(), 10) >= 1) {
        this.semillaN = parseInt(this.seedText.trim(), 10);
        this.generateNum = parseInt(this.textByNumbers.trim(), 10);
        this.generaAleatorios();
      } else {
        this.numerosAleatorios = [];
        this.mostrarMensaje('Puede generar entre 1 y 1000 números random.', false);
      }
    } else {
      this.numerosAleatorios = [];
      this.mostrarMensaje('La semilla debe ser de cuatro dígitos y ser mayor o igual a 1000.', false);
    }
  }

  generaAleatorios() {
    this.numerosAleatorios = [];

    let numX = (this.semillaN) * (this.semillaN);
    for (let i = 0; i < this.generateNum; i++) {
      let stringDeX = '' + numX;

      if (stringDeX.length > 4) {
        if (stringDeX.length % 2 !== 0) {
          stringDeX = '0' + stringDeX;
        }
        const spliceIndex = ((stringDeX.length - 4) / 2);
        stringDeX = stringDeX.substr(spliceIndex, 4);
      }
      numX = parseInt(stringDeX, 10);
      numX = numX * numX;
      this.numerosAleatorios.push(parseFloat('0.' + stringDeX));
    }

    this.mostrarMensaje(this.generateNum + ' Números generados con semilla: ' + this.semillaN, true);
  }

  onGenerateChi(){
    if(this.selected==null){
      this.mostrarMensaje(0 + ' Selecciona todos los argumentos  ' + 0, true);
      return;
    }
    let kin:number= Math.floor(1+ 3.222 * Math.log10(this.generateNum));
    let k:number= Math.floor(1+ 3.222 * Math.log10(this.generateNum));
    let v:number=(kin-1);
    let arreglados=this.numerosAleatorios;
    arreglados.sort();
    let max:number=arreglados[arreglados.length-1];
    let lit:number = max/kin;
    let tablas=[];
    let fabs: number[]= [];
    let fersteorica:number[]= [];
    let fers:number[]= [];
    let final:number[]= [];
    let l:number=0;
    this.finalcompare=0;
    for(let contador =1; contador<=kin; contador++){
      //console.log("%f",arreglado.sort[arreglados.length-1]);
      tablas.push((arreglados[arreglados.length-1]/kin)*contador);
      
      fabs.push(0);
    }
    tablas.forEach(element => {
      console.log("%f",element);
      
    });

    
  
    
    for(let n =0; n<this.generateNum; n++){
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
    
    if(this.generateNum>20){
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
    for(let newn =0; newn<k; newn++){
      fers.push(fabs[newn]/this.generateNum);
      
      if(newn==0){
        fersteorica.push(tablas[newn]);
        
      }else{
        fersteorica.push(tablas[newn]-tablas[newn-1]);
      } 
     
      final.push(Math.pow(fersteorica[newn]-fers[newn],2)/fersteorica[newn]);
    }
   
    final.forEach(element => {
      this.finalcompare=element+this.finalcompare;
      
    });

    v=k-1;
    l=v-1;
  
  
    if(this.selected==0.05){
      if(this.finalcompare<this.chi[0][v-1]){
        this.mostrarMensaje(this.finalcompare + ' Pasa la prueba pues Es menor que el valor chi:' +this.chi[0][v-1], true);
      }else{
        this.mostrarMensaje(this.finalcompare + ' No Pasa la prueba pues Es mayor que el valor chi:' +this.chi[0][v-1], true);
      }
    }else{
      if(this.finalcompare<this.chi[1][v-1]){
        this.mostrarMensaje(this.finalcompare + ' Pasa la prueba pues Es menor que el valor chi:' +this.chi[1][v-1], true);
      }else{
        this.mostrarMensaje(this.finalcompare + ' No Pasa la prueba pues Es mayor que el valor chi:' +this.chi[1][v-1], true);
      }
    }
   
  }

  onGenerateKilmogorov(){
    if(this.selectedSK==null || this.selectK==null){
      this.mostrarMensaje(0 + ' Selecciona todos los argumentos  ' + 0, true);
      return;
    }
    let arreglados2=this.numerosAleatorios;
    arreglados2.sort();
    let fe=1/arreglados2.length;
    let frec:number[]=[];
    let f1:number[]=[];
    let f2:number[]=[];
    let f1max=0;
    let f2max=0;
    let f=0;
    for(let i=0; i<arreglados2.length;i++){
      frec.push(fe*(i+1));
      f1.push(Math.abs((fe*(i+1))-arreglados2[i]));
      f2.push(Math.abs(arreglados2[i]-(fe*i)));
    }
    f1.sort();
    f1max=f1[f1.length-1];
    f2.sort();
    f2max=f2[f2.length-1];
    if(f1max<f2max){
      f=f2max;
    }else{
      f=f1max;
    }
    console.log(this.selectK);
    if(this.selectK==1){
      if(arreglados2.length<21){
        let ajustada=f*(Math.sqrt(arreglados2.length)+0.12+(0.11/Math.sqrt(arreglados2.length)));
        if(ajustada<this.kolsmir[this.selectedSK][arreglados2.length-1]){
          this.mostrarMensaje(ajustada+ ' Pasa la prueba pues Es menor que el valor chi:' +this.kolsmir[this.selectedSK][arreglados2.length-1], true);
        }else{
          this.mostrarMensaje(ajustada+ ' NO Pasa la prueba pues Es mayor que el valor chi:' +this.kolsmir[this.selectedSK][arreglados2.length-1], true);
        }
      }else{
        let ajustada=f*(Math.sqrt(arreglados2.length)+0.12+(0.11/Math.sqrt(arreglados2.length)));
        let compareKS=0;
        if(this.selectedSK==0){
          compareKS=1.36/Math.sqrt(arreglados2.length);
        }else{
          compareKS=1.22/Math.sqrt(arreglados2.length);
        }
        if(ajustada<compareKS){
          this.mostrarMensaje(ajustada+ ' Pasa la prueba pues Es menor que el valor chi:' +compareKS, true);
        }else{
          this.mostrarMensaje(ajustada+ ' NO Pasa la prueba pues Es mayor que el valor chi:' +compareKS, true);
        }
      }
    }else{
      if(arreglados2.length<21){
        if(f<this.kolsmir[this.selectedSK][arreglados2.length-1]){
          this.mostrarMensaje(f+ ' Pasa la prueba pues Es menor que el valor chi:' +this.kolsmir[this.selectedSK][arreglados2.length-1], true);
        }else{
          this.mostrarMensaje(f+ ' NO Pasa la prueba pues Es mayor que el valor chi:' +this.kolsmir[this.selectedSK][arreglados2.length-1], true);
        }
      }else{
        let compareKS=0;
        if(this.selectedSK==0){
          compareKS=1.36/Math.sqrt(arreglados2.length);
        }else{
          compareKS=1.22/Math.sqrt(arreglados2.length);
        }
        if(f<compareKS){
          this.mostrarMensaje(f+ ' Pasa la prueba pues Es menor que el valor chi:' +compareKS, true);
        }else{
          this.mostrarMensaje(f+ ' NO Pasa la prueba pues Es mayor que el valor chi:' +compareKS, true);
        }
      }
    }
  }
}
