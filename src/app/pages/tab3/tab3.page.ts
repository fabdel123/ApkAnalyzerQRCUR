import { Component, OnInit } from '@angular/core';
import { DataLocalService } from '../../services/data-local.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  // RegLocal: any[] = [];
  // TextoBuscar = '';

  constructor(public dataLocal: DataLocalService,
              // private DataRegLocal: DataLocalService
              private menuCtrl: MenuController,
              ) {}

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {

    // this.DataRegLocal.getDatalocal()
    //   .subscribe( RegLocal => {
    //   console.log(RegLocal);
    //   this.RegLocal = RegLocal;
    // });
  }

  /*BuscarReg( event ) {
    // console.log(event);
    this.TextoBuscar = event.detail.value;
  }*/


  /*ValidarHistorico() {
    alert ('Enviando Resultados...');
  }*/

  DesplegarMenu() {
    this.menuCtrl.toggle();
  }

  enviarCorreo() {
    console.log('Enviando Correo...');
    this.dataLocal.enviarCorreo();
  }

// Permite mantener persistentes los registros sin que se purguen cuando se recargue la aplicación o pagína
// Adicional de permitir abrir el navegador Web si el tipo de Scan es HTTP.
  abrirRegistro( registro ) {
    console.log('Registro', registro );
    this.dataLocal.abrirRegistro( registro );
  }

}
