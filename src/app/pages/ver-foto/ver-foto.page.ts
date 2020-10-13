import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ver-foto',
  templateUrl: './ver-foto.page.html',
  styleUrls: ['./ver-foto.page.scss'],
})
export class VerFotoPage implements OnInit {

  private id;
  public foto: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController
  ) {
    this.id = this.route.snapshot.params.id;
   }

  ngOnInit() {
    this.http.get(`https://uploadimagedreyk.herokuapp.com/images/${this.id}`, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}})
      .subscribe( (response: any) => {
        this.foto = response.url;
        console.log(this.foto);
      }, (error) => {
        console.log(error);
      });
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      cssClass: 'my-custom-class',
      mode: 'ios',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
          this.presentAlertConfirm();
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta!!!',
      mode: 'ios',
      message: 'Deseja realmente excluir esta imagem?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Sim',
          handler: () => {
            console.log('Confirm Okay');
            this.delete();
          }
        }
      ]
    });

    await alert.present();
  }

  options(){
    this.presentActionSheet();
  }
  delete(){
    console.log(this.route.snapshot.params.id);
    this.http.delete(`https://uploadimagedreyk.herokuapp.com/del/${this.route.snapshot.params.id}`,
    {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}})
      .subscribe( (response: any) => {
        console.log(response);
        this.router.navigate(['home']);
      }, (error) => {
        console.log(error);
      });
  }

}
