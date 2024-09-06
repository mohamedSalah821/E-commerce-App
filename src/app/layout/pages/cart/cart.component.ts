import { Component } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { Cart } from '../../../shared/interfaces/cart';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink,TranslateModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  isLoading:boolean=false;
  
  myCart!:Cart;

  constructor(private _CartService:CartService,private toastr: ToastrService ,private _Router:Router){}

  ngOnInit(){
    if(typeof localStorage !== "undefined"){
      localStorage.setItem('currentPage','/cart')
    }

    this._CartService.getCart().subscribe({
      next: (res) => {
        console.log(res);
        this.myCart = res;
        // console.log(res.numOfCartItems);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  updateQuantity(pId:string , pCount:number){
    
    this._CartService.updateCart(pId,pCount.toString()).subscribe({
      next: (res) => {
        console.log(res);
        this.myCart=res
        this.toastr.success(res.status+" Cart Updated");
        this._CartService.cartNum.next(res.numOfCartItems)

      },
      error: (err) => {
        console.error(err);
        
      }
    })

  }

  removeSpecItem(pId:string){
    this._CartService.removeSpecItem(pId).subscribe({
      next: (res) => {
        console.log(res);
        this.myCart=res
        this.toastr.error("Item Deleted");
        this._CartService.cartNum.next(res.numOfCartItems)

      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  clearCart(){
  this.isLoading=true;
    this._CartService.clearCart().subscribe({
      next: (res) => {
        console.log(res)
        
        if(res.message=='success'){
          this.myCart={} as Cart

          this._CartService.cartNum.next(0)
        }

        this.toastr.error("Cart Cleared");
        this.isLoading=false;
        this._Router.navigate(['/home'])
        
        
      },
      error: (err) => {
        console.error(err);
        this.isLoading=false;
        
      }
    })

  }

  
}
