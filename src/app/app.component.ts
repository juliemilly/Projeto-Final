import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Localizar petshops',
      url: '/localizar-petshops',
      icon: 'search'
    },
    {
      title: 'Pedidos',
      url: '/pedidos',
      icon: 'folder'
    },
    {
      title: 'Gerenciar pets',
      url: '/gerenciar-pets',
      icon: 'paw'
    },
    {
      title: 'Dicas para Pet',
      url: '/dicas-pet',
      icon: 'reader'
    },
    {
      title: 'perfil',
      url: '/perfil',
      icon: 'person'
    },
    {
      title: 'sair',
      url: '/sair-cliente',
      icon: 'exit'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
