import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)])
  })

  firebaseSvc = inject(FirebaseService);
  utlsSvc = inject(UtilsService)



  ngOnInit() {
  }

 async submit(){
    if (this.form.valid){

      const loading = await this.utlsSvc.loading();
      await loading.present();

      
      this.firebaseSvc.signUp(this.form.value as User).then(async res=> {

        this.firebaseSvc.updateUser(this.form.value.name)

        let uid = res.user.uid;
        this.form.controls.uid.setValue(uid);

        this.setUserInfo(uid);

      }).catch(error => {
        console.log(error);

        this.utlsSvc.presentToast({
          message: 'Usuario o Password inválida',
          duration: 2500,
          color: 'danger',
          position: 'middle',
          icon: 'alert-circle-outline'

        })
      }).finally(()=> {
        loading.dismiss();
      })
    }
  }

  async setUserInfo(uid: string){
    if (this.form.valid){

      const loading = await this.utlsSvc.loading();
      await loading.present();

      let path = `users/${uid}`;
      delete this.form.value.password
      
      this.firebaseSvc.setDocument(path, this.form.value).then(async res=> {

        this.utlsSvc.saveInLocalStorage('user', this.form.value);
        this.utlsSvc.routerLink('/main/home');
        this.form.reset();
   
      }).catch(error => {
        console.log(error);

        this.utlsSvc.presentToast({
          message: 'Usuario o Password inválida',
          duration: 2500,
          color: 'danger',
          position: 'middle',
          icon: 'alert-circle-outline'

        })
      }).finally(()=> {
        loading.dismiss();
      })
    }
  }

}
