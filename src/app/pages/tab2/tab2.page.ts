import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { DataLocalService } from '../../services/data-local.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

swipeOpts = {
  allowSlidePrev: false,
  allowSlideNext: false
};

  constructor( private barcodeScanner: BarcodeScanner,
               private dataLocal: DataLocalService
              ) {}
// Muestra en consola un mensaje de el Ingreso a Tab QR en la consola interna (Solo pruebas PC)

  // ionViewDidEnter() {
  //   // console.log('viewDidEnter');
  // }

// Muestra en consola un mensaje de la salida al Tab QR en la consola interna (Solo pruebas PC)
  // ionViewDidLeave() {
  //   // console.log('viewDidLeave');
  // }

// (Solo pruebas PC) Muestra una pagína aparte que permite validar el registro de codigo QR
  ionViewWillEnter() {
    // console.log('viewWillEnter');
    this.scan();
  }

// Muestra en consola un mensaje de la salida del Tab QR, sin realizar escaneo en la consola interna (Solo pruebas PC)
  // ionViewWillLeave() {
  //   // console.log('viewWillLeave');
  // }

// Permite correr el plugin de la camara e iniciar el Escaneo de QR
  scan() {

// Muestra el tipo de Codigo QR, que se va a analizar
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData.format, barcodeData.text);

// Si el escaneo se cancela, devuelve a el Tab de Historico sin guardar el registro fallído
      if ( !barcodeData.cancelled ) {
        this.dataLocal.HistorialRegistros (barcodeData.format, barcodeData.text);
      }

      // Envia un mensaje de error en la consola interna (Solo pruebas PC)
     }).catch(err => {
         console.log('Error', err);

         // Eliminar esta línea antes de pasar a producción (Solo para pruebas de PC o Ionic Devapp)
         // Envia directamente a la pagína principal de la universidad, cuando no encuentra un QR valído
         this.dataLocal.HistorialRegistros ( 'QRCode', 'https://urepublicana.edu.co');
     });
  }

}
