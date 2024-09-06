import { Component, OnDestroy, OnInit } from '@angular/core';
import { BrandsService } from '../../../shared/services/brands/brands.service';
import { Brands } from '../../../shared/interfaces/brands';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink ,TranslateModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit,OnDestroy {

brandSub!:Subscription
  constructor(private _BrandsService:BrandsService) {}
  






  brandsData:Brands[]=[]



  ngOnInit(){
    if(typeof localStorage !== "undefined"){
      localStorage.setItem('currentPage','/brands')

    }

    this.brandSub=this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        this.brandsData=res.data
      },
      error: (err) => {
      }
    })
  }

  ngOnDestroy(): void {
    this.brandSub?.unsubscribe()
  }
}
