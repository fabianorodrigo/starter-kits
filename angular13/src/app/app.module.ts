import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequestInterceptor } from './core/request.interceptor';
import { MaterialModule } from './material/material.module';
import { GlobalErrorHandlerService } from './services';
import { SharedModule } from './shared/shared.module';
import { UiModule } from './ui/ui.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // https://angular.io/guide/animations
    MaterialModule,
    HttpClientModule,
    SharedModule,
    UiModule,
    // Os módulos ProductModule, FlexboxModule e Web3jsModule não estão aqui pois são importados de forma Lazy Loading
    // apenas se  e quando a rota que eles correspondem for acessada. Ver em: app-routing.module.ts

    // Notice that in the module imports array, the AppRoutingModule is last and comes after the UiModule.
    // The order of route configuration is important because the router accepts the first route that matches a
    // navigation request path. Each routing module augments the route configuration in the order of import
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
