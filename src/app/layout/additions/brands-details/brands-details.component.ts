import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../../shared/services/brands/brands.service';
import { ActivatedRoute } from '@angular/router';
import { Brands} from '../../../shared/interfaces/brands';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-brands-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './brands-details.component.html',
  styleUrl: './brands-details.component.scss'
})
export class BrandsDetailsComponent implements OnInit {




  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    autoplay: true, 
    autoplayTimeout: 1500, 
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }

  brandsData!:Brands
  constructor(private _BrandsService:BrandsService,private _ActivatedRoute:ActivatedRoute){}


  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe((res:any)=>{
         console.log(res.params.brandId)

      this._BrandsService.getSpecBrands(res.params.brandId).subscribe({
        next: (res)=>{
          console.log(res)
          this.brandsData=res.data
        },
        error: (err)=>{
          console.log(err)
        }
      })
    })
     

  }



}

