import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  private loading;
  authForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    private loadingController: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {
    this.authForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(5)]],
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

  onSubmit(){
    console.log(this.authForm.value);
    this.presentLoading();
    this.http.post('https://uploadimagedreyk.herokuapp.com/cadastro', this.authForm.value)
      .subscribe( (response: any) => {
        console.log(response);
        this.loading.dismiss();
        this.login();
      }, (error) => {
        console.log(error);
        this.loading.dismiss();
      });
  }
  login(){
    this.presentLoading();
    this.http.post('https://uploadimagedreyk.herokuapp.com/login', this.authForm.value)
      .subscribe( (response: any) => {
        console.log(response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['home']);
        this.loading.dismiss();
        // this.presentToast('Successfully logged in', 'success');
      }, (error) => {
        console.log(error);
        this.loading.dismiss();
        // this.presentToast('Check the data', 'danger');
      });
  }
}
