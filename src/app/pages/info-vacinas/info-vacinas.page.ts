import { TemplateService } from 'src/app/services/template.service';
import { VacinaService } from './../../services/vacina.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Vacina } from 'src/app/model/vacina';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-info-vacinas',
  templateUrl: './info-vacinas.page.html',
  styleUrls: ['./info-vacinas.page.scss'],
})
export class InfoVacinasPage implements OnInit {

  lista : Vacina[] = [];
  idpet: string ="";

  constructor(private vacinaService : VacinaService,
    private navCtrl : NavController,
    private template : TemplateService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {// os cliente precisam estar aqui antes da pagina carregar 
    this.route.paramMap.subscribe(url=>{

      let id = url.get('id');
      

      this.idpet = id;
      console.log(this.idpet);
    })


    this.vacinaService.listaDeVacinas(this.idpet).subscribe(response => {
      //this.clienteServ.listaDeClientes() -> chamei a lista de clientes 
      //o ListaDeClientes é um OBSERVABLE dessa forma retorna um subscribe
      //Esse é o comando que irá aguardar a resposta do servidor

      //se o servidor responder ele fazer isso aqui
      console.log(response);//isso serve para ver se o problema é aqui, se houver algum erro aparecera aq
      //solicitando uma resposta do servidor
      this.lista = response;
      console.log(this.lista);

      
    }, err=> {
      //o lista de cliente retorna observable 
    })

    
  }

  //metodo para poder enviar o id do cliente pela url
  visualizar(vacina){
    //navigateFordward => para navegar pra frente, e n retornar
    //quero abrir essa pagina e quero enviar o cliente.id
    this.navCtrl.navigateForward(['/alt-info-vacinas',vacina.id])
    console.log(vacina.id)
  }

  adicionar(idpet){
    //navigateFordward => para navegar pra frente, e n retornar
    //quero abrir essa pagina e quero enviar o cliente.id
    this.navCtrl.navigateForward(['/add-info-vacinas',this.idpet])
    console.log(this.idpet)
  }

  excluir(vacina){
    this.navCtrl.navigateForward(['/del-vacina',vacina.id])

  }
  

}
