import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BubbleSortComponent} from "./bubble-sort/bubble-sort.component";
import {SortingAppComponent} from "./sorting-app/sorting-app.component";
import {SearchingComponent} from "./searching/searching.component";
import { BinaryTreeComponent } from './binary-tree/binary-tree.component';


const routes: Routes = [
  {path: '',redirectTo: 'graph', pathMatch: 'full' },
  {path:'graph', component: BubbleSortComponent},
  {path: 'sort', component:SortingAppComponent},
  {path: 'search', component:SearchingComponent},
  {path: 'tree', component: BinaryTreeComponent},
  {path:'**',redirectTo:'graph'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
