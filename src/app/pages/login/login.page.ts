import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private loading;
  authForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {  }

  ngOnInit() {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    });
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    this.loading.present();
  }
  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    toast.present();
  }

  onSubmit(){
    console.log('AuthForm: ', this.authForm.value);
    this.presentLoading();
    this.http.post('https://uploadimagedreyk.herokuapp.com/login', this.authForm.value)
      .subscribe( (response: any) => {
        console.log(response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['home']);
        this.loading.dismiss();
        this.presentToast('Successfully logged in', 'success');
      }, (error) => {
        console.log(error);
        this.loading.dismiss();
        this.presentToast('Check the data', 'danger');
      });
  }

  pageCadastro(){
    this.router.navigate(['cadastro']);
  }



}
