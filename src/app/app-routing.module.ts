import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {WelcomeComponent} from './home/welcome.component';
import {PageNotFoundComponent} from './page-not-found.component';
import {AuthGuard} from './user/auth.guard';
import {SelectiveStrategyService} from './selective-strategy.service';

@NgModule({
  imports: [RouterModule.forRoot([
    {path: 'welcome', component: WelcomeComponent},
    {path: '', redirectTo: 'welcome', pathMatch: 'full'},
    {
      path: 'products',
      canLoad: [AuthGuard],
      data: {preload: true},
      loadChildren: () => {
        return import('./products/product.module').then(m => m.ProductModule);
      }
    },

    {path: '**', component: PageNotFoundComponent}
  ], {preloadingStrategy: SelectiveStrategyService})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
