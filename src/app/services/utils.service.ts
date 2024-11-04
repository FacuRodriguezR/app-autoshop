import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AlertOptions, LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  removeFromLocalStorage(arg0: string) {
    throw new Error('Method not implemented.');
  }


  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  modalCtrl = inject(ModalController);
  router = inject(Router);
  alertCtrl = inject(AlertController);





  // alert
async presentAlert(opts?: AlertOptions) {
  const alert = await this.alertCtrl.create(opts);

  await alert.present();
}
 

  // LOADING
  async loading() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      duration: 2000
    });
    return loading;
  }

  // TOAST
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  // ====entrar a cualquier pagina disponible====

  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  // ==== Guarda un elemento en el localstorage ====

  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value))
  }

  //  ==== obtiene un elemento desde localstorage ====

 
  // ======Modal =======

  async presentModal(opts: ModalOptions) {
    const modal = await this.modalCtrl.create(opts);

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) return data;


  }
  dismissModal(data?: any) {
    return this.modalCtrl.dismiss(data);
  }

}