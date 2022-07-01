import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarkdownComponent } from '../shared/pages/markdown/markdown.component';
import { AlignContentComponent } from './pages/align-content/align-content.component';
import { AlignItemsComponent } from './pages/align-items/align-items.component';

// Components
import { FlexboxHomeComponent } from './pages/flexbox-home/flexbox-home.component';
import { JustifyContentComponent } from './pages/justify-content/justify-content.component';

const routes: Routes = [
  {
    // Use empty path routes to group routes together without adding any
    // additional path segments to the URL. Users will still visit /flexbox
    // and the FlexboxHomeComponent still serves as the Routing Component
    // containing child routes.
    path: '',
    component: FlexboxHomeComponent,
    children: [
      {
        path: '',
        component: MarkdownComponent,
        data: { url: 'app/flexbox/README.md' },
      },
      { path: 'justify', component: JustifyContentComponent },
      { path: 'alignItems', component: AlignItemsComponent },
      { path: 'alignContent', component: AlignContentComponent },
    ],
  },
];

@NgModule({
  //Only call RouterModule.forRoot() in the root AppRoutingModule.
  // In any other module, you must call the RouterModule.forChild() method to register additional routes.
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlexboxRoutingModule {}
