import { ClienteService } from 'src/app/services/cliente.service';
import { NavController } from '@ionic/angular';
import { PetshopService } from './../services/petshop.service';
import { PetService } from 'src/app/services/pet.service';
import { PedidoService } from './../services/pedido.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TemplateService } from '../services/template.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { Pet } from '../model/pet';
import { Petshop } from '../model/petshop';
import { Cliente } from '../model/cliente';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-agendar-pedido',
  templateUrl: './agendar-pedido.page.html',
  styleUrls: ['./agendar-pedido.page.scss'],
})
export class AgendarPedidoPage implements OnInit {

  petshop : Petshop = new Petshop();
  cliente : Cliente = new Cliente();
  listaPet : Pet[] = [];
  formGroup: FormGroup;
  idpetshop: string ="";
  idcliente: string ="";

  status: string = "novo";


  horario_coleta :string = "";
  horario_entrega : string = "";
  id : string = "";

  
  endereco: string;
  nome_cliente: string ;

  idUser: any = "";
  

  constructor(private formBuilder: FormBuilder,
    private template: TemplateService,
    private pedidoServ: PedidoService,
    private auth : AngularFireAuth,
    private route: ActivatedRoute,
    private petservice : PetService,
    private petshopservice : PetshopService,
    private navCtrl : NavController,
    private clienteservice : ClienteService,
    public storage: AngularFireStorage,)
    {

      this.route.paramMap.subscribe(url=>{

        this.id = url.get('id');
         
         this.idUser = this.id;
         this.idpetshop = this.id;
         
       
        
         this.petshopservice.petshopsPorId(this.id).subscribe(response => {
 
 
         this.petshop.setData(response);
         this.dowloadImage()
         
           
         }, err=> {
         //o lista de cliente retorna observable 
         })
       })
      
      this.auth.currentUser.then(response=>{
        this.idcliente=response.uid;
        
        
        this.petservice.listaDePets(this.idcliente).subscribe(response=>{
          
          this.listaPet = response;

          


        })

        this.clienteservice.buscaPorId(this.idcliente).subscribe(response=>{
          


        
          this.cliente.setData(response);

          this.endereco = response.endereco;
          this.nome_cliente = response.nome;
          
          console.log(this.endereco);
          console.log(this.nome_cliente);
          this.iniciarForm()

        })
        
        

       
      })
      this.iniciarForm();

     }

     ngOnInit() {

      this.route.paramMap.subscribe(url=>{
  
        let id = url.get('id');
        
  
        this.idpetshop = id;
        this.petshopservice.petshopsPorId(this.idpetshop).subscribe(response=>{
          this.petshop=response;

          
          
        })

        
       
      })
      this.iniciarForm();
      
  }

  iniciarForm() {
    this.formGroup = this.formBuilder.group({
      //aqui dentr vou colocar os campos do formulario
      // campos que preciso no cadastro, id gerado de forma automatica
      idcliente: [this.idcliente],
      idpetshop: [this.idpetshop],
      status: [this.status],
      servico:[],
      pet:[],
      data_sugerido:[],
      horario_sugerido:[],
      horario_coleta : [this.horario_coleta],
      horario_entrega: [this.horario_entrega],
      nome_pet: [],
      endereco: [this.endereco],
      nome_cliente: [this.nome_cliente]
      
      
     
    })//NAO ESTOU FAZENDO VALIDAÇÃO OU SEJA SE ESQUECERMOS UM 
    //REGISTRO ELE N DARÁ ERRO (O FIREBASE)
  }


  cadastrar() {
    //template de carregamento
      //abre janela no inicio do carregamento
      //quando eu chamo o formGroup.value eles chamam todos esses dados lá de cima
      this.pedidoServ.cadastrarPedido(this.formGroup.value).subscribe(response => {
        
        console.log("Cadastrado com sucesso");

        ;//janelinha de carregamento
        this.template.myAlert("Agendado com sucesso!");//response lá do service
        //
        this.navCtrl.navigateBack(['/localizar-petshops'])

        
      },erro => {
        console.log("Erro")

      
        this.template.myAlert("Erro ao Agendar");
      })

    
  }

  dowloadImage(){

    this.storage.storage.ref().child(`perfil_petshop/${this.idUser}.jpg`).getDownloadURL().then(response=>{
      this.petshop.imagem = response;
      console.log("puxou do banco")
      console.log(this.idUser);
    }).catch(response=>{
      this.storage.storage.ref().child(`perfil_petshop/petshop_perfil.jpg`).getDownloadURL().then(response=>{
        this.petshop.imagem = response;
        console.log("nao puxou do banco")
       
      })
    })

 }

}

