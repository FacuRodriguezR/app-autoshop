import { Component, inject, OnInit } from '@angular/core';
import { IonicSlides, NavController, NavParams } from '@ionic/angular';
import { Coupon } from 'src/app/models/coupon';
import {CouponsService} from '../services/coupons.service'
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  couponsService = inject(CouponsService);
  firebaseSvc = inject(FirebaseService)
  router = inject(Router); 

  couponsActive: boolean;

  public coupons: Coupon[];

  swiperModules = [IonicSlides];

  constructor() {
    this.couponsActive = false;
  }

  ngOnInit() {
    this.couponsService.getCoupons().then((coupons:Coupon[]) =>{
      this.coupons = coupons;
      console.log(this.coupons);
      
    })    
  }

  changeActive(coupon: Coupon) {
    this.coupons.forEach(c => c.active = false);  // Desactiva todos los cupones
    coupon.active = true;                         // Activa solo el cupón seleccionado
    this.couponsActive = true;                    // Marca que hay cupones activos
  }

  signOut() {
    this.firebaseSvc.signOut();
  }

  goToCard() {
    const activeCoupons = this.coupons.filter((c) => c.active);
    this.router.navigate(['card-coupon'], { state: { coupons: activeCoupons } }); // Navega y pasa los datos
  }
  onSlideClick(coupon: Coupon) {
    this.changeActive(coupon);  // Activar el cupón
    this.goToCard();            // Generar el QR y redirigir
  }

}