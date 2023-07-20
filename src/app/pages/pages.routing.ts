import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ListComponent } from './game/list/list.component';
import { DetailComponent } from './game/detail/detail.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard'

const routes: Routes = [
  {
    path: 'games', 
    component: PagesComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
    children:[
      { path: '', component: ListComponent },
      { path: ':id', component: DetailComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
