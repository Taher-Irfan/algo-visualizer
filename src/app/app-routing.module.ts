import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BubbleSortComponent} from "./bubble-sort/bubble-sort.component";
import {SortingAppComponent} from "./sorting-app/sorting-app.component";
import {SearchingComponent} from "./searching/searching.component";


const routes: Routes = [
  {path:'graph', component: BubbleSortComponent},
  {path: 'sort', component:SortingAppComponent},
  {path: 'search', component:SearchingComponent},
  {path: '',redirectTo: '/graph', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
