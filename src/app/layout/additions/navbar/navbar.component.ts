import { UserData } from './../../../shared/interfaces/user-data';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from '../../../shared/services/flowbite/flowbite.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { CartService } from '../../../shared/services/cart/cart.service';
import { TranslationService } from '../../../shared/services/translation/translation.service';
import { TranslateModule } from '@ngx-translate/core';
import { WishListService } from '../../../shared/services/wishList/wish-list.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  islogin:boolean=false;
  cartItem!:number
  wishItem!:number

  constructor(private flowbiteService: FlowbiteService , private _WishListService:WishListService,private _AuthService:AuthService ,private _TranslationService:TranslationService, private _Router:Router ,private _CartService:CartService) {}

  ngOnInit(): void {

    this._AuthService.userData.subscribe((userData) => {
      if (userData !== null) {
        this.islogin = true;
        this.loadCartAndWishlistData();
      } else {
        this.islogin = false;
      }
    });
 
  
 

    this.flowbiteService.loadFlowbite(flowbite => {
      
    });

    
  }


  loadCartAndWishlistData() {
    this._CartService.getCart().subscribe({
      next: (res) => {
        this._CartService.cartNum.next(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      }
    });

    this._CartService.cartNum.subscribe((res) => {
      this.cartItem = res;
    });

    this._WishListService.getWishList().subscribe({
      next: (res) => {
        this._WishListService.wishNum.next(res.count);
      }
    });

    this._WishListService.wishNum.subscribe((res) => {
      this.wishItem = res;
    });
  }




  signOut(){
    localStorage.removeItem('userToken');
    // localStorage.removeItem('navigateTo')
    this._AuthService.userData.next(null);
    this._Router.navigate(['/login'])
  }


  changLang(lang:string)
  {
    this._TranslationService.changeLang(lang)
  }
}
