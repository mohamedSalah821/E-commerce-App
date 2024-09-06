import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../../shared/services/categories/categories.service';
import { Categories } from '../../../shared/interfaces/categories';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink ,TranslateModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit ,OnDestroy {

  catSub!:Subscription
  catData:Categories[]=[]

  constructor(private _CategoriesService:CategoriesService ){}
 

  ngOnInit(){
    if(typeof localStorage !== "undefined"){
      localStorage.setItem('currentPage','/categories')

    }

   this.catSub= this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        
        this.catData=res.data
      },
      error: (err) => {
        
      }
    })

  
 

  }
  ngOnDestroy(): void {
    this.catSub?.unsubscribe()
  }
}
