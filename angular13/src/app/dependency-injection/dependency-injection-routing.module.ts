import { DiUseExistingComponent as DIUseExistingComponent } from './pages/di-use-existing/di-use-existing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarkdownComponent } from '../shared/pages/markdown/markdown.component';
import { DIHomeComponent } from './pages/di-home/di-home.component';
import { DIUseClassComponent } from './pages/di-useClass/di-useClass.component';
import { DIUseValueComponent } from './pages/diuse-value/diuse-value.component';
import { DIUseFactoryComponent } from './pages/diuse-factory/diuse-factory.component';
import { DIOptionalDependencyComponent } from './pages/dioptional-dependency/dioptional-dependency.component';

const routes: Routes = [
  {
    // Use empty path routes to group routes together without adding any
    // additional path segments to the URL. Users will still visit /di
    // and the DIHomeComponent still serves as the Routing Component
    // containing child routes.
    path: '',
    component: DIHomeComponent,
    children: [
      {
        path: '',
        component: MarkdownComponent,
        data: { url: 'app/dependency-injection/README.md' },
      },
      { path: 'useclass', component: DIUseClassComponent },
      { path: 'useexisting', component: DIUseExistingComponent },
      { path: 'usevalue', component: DIUseValueComponent },
      { path: 'usefactory', component: DIUseFactoryComponent },
      { path: 'optional', component: DIOptionalDependencyComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DependencyInjectionRoutingModule {}
