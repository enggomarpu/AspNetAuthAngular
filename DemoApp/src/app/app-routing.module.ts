import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { ErrorComponent } from './shared/error/error.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  { 
    path: 'account', 
    // loadChildren: () => import('./components/account/account.module').then(m => m.AccountModule)
    loadChildren: () => import('./components/account/account.module').then(m => m.AccountModule)
  },
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
