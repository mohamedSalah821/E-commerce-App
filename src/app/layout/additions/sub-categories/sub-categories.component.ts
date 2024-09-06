import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../shared/services/categories/categories.service';
import { ActivatedRoute } from '@angular/router';
import { Categories } from '../../../shared/interfaces/categories';

@Component({
  selector: 'app-sub-categories',
  standalone: true,
  imports: [],
  templateUrl: './sub-categories.component.html',
  styleUrl: './sub-categories.component.scss'
})
export class SubCategoriesComponent implements OnInit {

  subCatData:Categories[]=[]


  constructor(private _CategoriesService:CategoriesService , private _ActivatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((res:any)=>{
      console.log(res.params.subId)
      this._CategoriesService.getSubCat(res.params.subId).subscribe({
        next:(res:any)=>{
          console.log(res)
          this.subCatData=res.data
          
          
        },
        error:(err:any)=>{
          console.log(err)
        }
      })

    
      
    })

   
   

  }

}
