import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-coupon',
  templateUrl: './card-coupon.page.html',
  styleUrls: ['./card-coupon.page.scss'],
})
export class CardCouponPage implements OnInit {
  public coupons: any[] = [];         // Array para almacenar cupones recibidos
  public activeCoupons: any[] = [];    // Array para almacenar cupones activos
  public QRCode: string = '';          // Propiedad para el código QR

  constructor() {}

  ngOnInit() {
    // Accede a los cupones recibidos desde el estado de la navegación
    this.coupons = history.state.coupons || [];

    // Filtra los cupones activos
    this.activeCoupons = this.coupons.filter(coupon => coupon.active);

    // Genera el contenido para el código QR utilizando el campo coupon.cupon
    if (this.activeCoupons.length > 0) {
      this.QRCode = this.activeCoupons.map(coupon => coupon.coupon).join(', '); // Une los cupones activos en un string
    } else {
      this.QRCode = 'No hay cupones activos'; // Mensaje en caso de que no haya cupones activos
    }
    
    console.log('Cupones activos:', this.activeCoupons);
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Texto copiado al portapapeles:', text);
    });
  }
}
