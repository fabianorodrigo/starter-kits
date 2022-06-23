import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { UiModule } from './ui/ui.module';
import { SharedModule } from './shared/shared.module';
import { RequestInterceptor } from './core/request.interceptor';
import { GlobalErrorHandlerService } from './services';
import { Web3jsModule } from './web3-ui/web3js/web3js.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    SharedModule,
    UiModule,
    Web3jsModule,
    // Notice that in the module imports array, the AppRoutingModule is last and comes after the HeroesModule.
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
