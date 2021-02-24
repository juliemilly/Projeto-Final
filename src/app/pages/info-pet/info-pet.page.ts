import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PetService } from 'src/app/services/pet.service';
import { ActivatedRoute } from '@angular/router';
import { Pet } from 'src/app/model/pet';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-info-pet',
  templateUrl: './info-pet.page.html',
  styleUrls: ['./info-pet.page.scss'],
})
export class InfoPetPage implements OnInit {

  idpet: string = "";
  pet : Pet = new Pet();
  idUser: any = "";

  constructor(private petService : PetService,
    private navCtrl : NavController,
    private route: ActivatedRoute,
    public storage: AngularFireStorage) { }

  ngOnInit() {

    this.route.paramMap.subscribe(url=>{
      let id = url.get('id');
      this.idUser = id;

      this.idpet= id;
      console.log(id)
      console.log(this.idpet)

      this.petService.buscaPorId(id).subscribe(response=>{
        this.pet = response;
        this.dowloadImage();
        console.log(this.pet);
      })
    })
  }

  alterar(){
    //navigateFordward => para navegar pra frente, e n retornar
    //quero abrir essa pagina e quero enviar o cliente.id
    this.navCtrl.navigateForward(['/alt-info-pet',this.idpet])
    console.log(this.idpet)
  }

  deletar(){
    //navigateFordward => para navegar pra frente, e n retornar
    //quero abrir essa pagina e quero enviar o cliente.id
    this.navCtrl.navigateForward(['/del-pet',this.idpet])
    console.log(this.idpet)
  }

  visualizarCarteirinha(){
    this.navCtrl.navigateForward(['info-vacinas',this.idpet])
    console.log(this.idpet)
  }

  visualizarAddImagem(){
    this.navCtrl.navigateForward(['add-imagem-pet',this.idpet])
    console.log(this.idpet)
  }

  dowloadImage(){

    this.storage.storage.ref().child(`pet/${this.idUser}.jpg`).getDownloadURL().then(response=>{
      this.pet.imagem = response;
      console.log("puxou do banco")
    }).catch(response=>{
      this.storage.storage.ref().child(`pet/dog.png`).getDownloadURL().then(response=>{
        this.pet.imagem = response;
        console.log("nao puxou do banco")
      })
    })

 }

}
