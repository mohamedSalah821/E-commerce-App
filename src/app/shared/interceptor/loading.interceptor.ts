import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const spinner:NgxSpinnerService=inject(NgxSpinnerService)
  spinner.show();

  return next(req).pipe(finalize(()=>{
    spinner.hide();
  }));
};
