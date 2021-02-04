import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { HttpClient } from '@angular/common/http';
import { File } from '@ionic-native/file/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Platform } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  Historico: Registro [] = [];
  path: string;

  constructor( private storage: Storage,
               private navCtrl: NavController,
               private iABrowser: InAppBrowser,
               private http: HttpClient,
               private file: File,
               private emailComposer: EmailComposer,
               public platform: Platform,
              ) {

// Permite cargar los datos de registros
  this.cargarStorage();
  }

// Permitirá esperar la respuesta de los registros sin generar registros adicionales
  async cargarStorage() {
    this.Historico = await this.storage.get('registros') || [];
  }

  async HistorialRegistros( format: string, text: string ) {

    await this.cargarStorage();

    const NuevoHistorial = new Registro( format, text );
    this.Historico.unshift( NuevoHistorial );

// Proceso de grabación de datos al Storage
    console.log(this.Historico);
    this.storage.set('registros', this.Historico);

    this.abrirRegistro( NuevoHistorial );

  }

// Permite escanear el código y devolverlo a la Tab de Historial de registros
abrirRegistro( registro: Registro) {

    this.navCtrl.navigateForward('/tabs/tab3');

    switch (registro.type) {
// Si el registro es de tipo HTTP, abrira el navegador Web
        case 'http':
        this.iABrowser.create( registro.text, '_system' );
        break;

    }

  }

  enviarCorreo() {

    const arrTemp = [];
    const titulos = 'Tipo, Formato, Creado en, Texto\n' ;

    arrTemp.push( titulos );

    this.Historico.forEach( registro => {

    const linea = `${ registro.type }, ${ registro.format }, ${ registro.created }, ${ registro.text.replace(',', ' ') }\n`;
    arrTemp.push( linea );

    });

    // Permite validar datos a enviar a correo electronico de tipo CSV
    // console.log( arrTemp.join('') );

    this.crearArchivoFisico( arrTemp.join('') );


  }
// Permite la creación del archivo fisico CSV que se enviara al correo electronico
  crearArchivoFisico( text: string ) {

    if (this.platform.is('android')) {
      this.path = this.file.externalDataDirectory;
    } else { // si estamos en ios
      this.path = this.file.dataDirectory;
}


    this.file.checkFile(this.path, 'escaneos.csv')
      .then( existe => {
        console.log( 'Existe Archivo?', existe );
        return this.escribirEnArchivo( text );
      })
      .catch( err => {

        return this.file.createFile( this.path, 'escaneos.csv', false )
              .then( creado => this.escribirEnArchivo( text ) )
              .catch( err2 => console.log( 'No se pudo crear el archivo',  err2 ));
      });

  }

  async escribirEnArchivo( text: string ) {
    console.log(`${this.path}escaneos.csv`);
    await this.file.writeExistingFile( this.path, 'escaneos.csv', text );

    const archivo = `${this.path} escaneos.csv `;
    console.log('archivo creado', this.path + 'escaneos.csv');

    const email = {
      to: 'fabdel_0123@outlook.com',
      // cc: 'erika@mustermann.de',
      // bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [
        archivo,
      ],
      subject: 'Backup de Escaneos',
      body: 'En el archivo adjunto, se encontraran los escaneos realizados en la institución - <strong>QR_Scanner</strong>',
      isHtml: true
    };

    // Envia un mensaje de usando las configuraciones por defecto del dispositivo
    this.emailComposer.open(email);

  }

}
