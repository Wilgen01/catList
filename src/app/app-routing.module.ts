import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, data: { title: 'Home' }},
  {path: 'detail/:id_breed', loadChildren: () =>
  import('./pages/cat-detail/cat-detail.module').then(m => m.CatDetailModule)},
  {path: 'category', loadChildren: () =>
  import('./pages/category/category.module').then(m => m.CategoryModule)},
  {path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
