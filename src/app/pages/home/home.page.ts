import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public foto = [];
  private loading;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthenticationService
  ) {}

  ionViewDidEnter() {
    this.funcaoGetFotos();
  }

  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    toast.present();
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait... exiting',
    });
    this.loading.present();
  }

  funcaoGetFotos(){
    this.http.get('https://uploadimagedreyk.herokuapp.com/images', {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}})
      .subscribe( (response: any) => {
        console.log(response.resultado);
        this.foto = response.resultado;

      }, (error) => {
        console.log(error);
      });
  }

  inputFileChange(event){
    if (event.target.files && event.target.files[0]){
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      this.presentLoading();
      this.http.post('https://uploadimagedreyk.herokuapp.com/post', formData, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .subscribe( (response: any) => {
          console.log(response);
          // tslint:disable-next-line: deprecation
          // document.location.reload(true);
          this.loading.dismiss();
          this.presentToast('Image Uploaded', 'success');
          this.ionViewDidEnter();
        }, (error) => {
          console.log(error);
          this.loading.dismiss();
          this.presentToast('Image no uploaded', 'danger');
        });
    }
  }
  verFoto(id){
    console.log(id);
    this.router.navigate([`ver-foto/${id}`]);
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta!!!',
      mode: 'ios',
      message: 'Deseja realmente Sair?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Sim',
          handler: async () => {
            this.authService.logout();
            this.presentLoading();
            console.log('Confirm Okay');
            localStorage.removeItem('token');
            this.router.navigate(['login']);
            this.fechar();
            console.log('Loading dismissed!');
            this.presentToast('Disconnected', '');
          }
        }
      ]
    });

    await alert.present();
  }
  fechar(){
    setTimeout(() => {
      this.loading.dismiss();
      console.log('fechou');
    });
  }
}
