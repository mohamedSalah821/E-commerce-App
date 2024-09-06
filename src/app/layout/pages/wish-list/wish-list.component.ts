import { Component, OnInit } from '@angular/core';
import { WishListService } from '../../../shared/services/wishList/wish-list.service';
import { WishList } from '../../../shared/interfaces/wish-list';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../shared/services/cart/cart.service';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit{

 constructor(private _WishListService:WishListService , private toastr: ToastrService , private _CartService:CartService) {}

  myWishList!:WishList[]
  wishId:string[]=[]
  numOfWish!:number


  ngOnInit(): void {
    if(typeof localStorage !== "undefined"){
      localStorage.setItem('currentPage','/wishList')
    }


    this._WishListService.getWishList().subscribe({
      next:(res)=>{
        console.log(res)
        
        this.myWishList=res.data
        this._WishListService.wishNum.next(res.count)
        
        
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  removeFromWishList(pId:string)
  {
    this._WishListService.removeProductFromWishList(pId).subscribe({
      next:(res)=>{
        console.log(res)
        this.myWishList = this.myWishList.filter(item => item._id !== pId);
        

        this.toastr.warning(res.message+' ❤️')
        this._WishListService.wishNum.next(res.data.length)

      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  addToCart(pId:string){
    this._CartService.addProductToCart(pId).subscribe({
      next:(res)=>{
        console.log(res)
        this.toastr.success(res.message)
        this.removeFromWishList(pId)
        
        
        this._CartService.cartNum.next(res.numOfCartItems)
        

        
      }
    })
  }
}
