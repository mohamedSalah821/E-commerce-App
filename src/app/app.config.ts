import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { headerInterceptor } from './shared/interceptor/header.interceptor';
import { errorInterceptor } from './shared/interceptor/error.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './shared/interceptor/loading.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';


  function httpLoaderFactory(htttp:HttpClient){
    return new  TranslateHttpLoader(htttp , '../assets/i18n/' ,'.json')
  }

export const appConfig: ApplicationConfig = {
  providers:[ provideRouter(routes,withViewTransitions(),
              withInMemoryScrolling({scrollPositionRestoration:'top'})),
              provideClientHydration(),
              provideHttpClient(withFetch(),withInterceptors([headerInterceptor,errorInterceptor,loadingInterceptor])),
              importProvidersFrom(RouterModule,BrowserAnimationsModule,NgxSpinnerModule ,

                TranslateModule.forRoot({
                  loader:{
                    provide:TranslateLoader,
                    useFactory: httpLoaderFactory,
                    deps:[HttpClient]
                  }
                })

               ),
              provideToastr()
            ]
};
