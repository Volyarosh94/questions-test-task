import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionsComponent } from './routes/questions/component/questions.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./routes/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'questions',
    loadChildren: () => import('./routes/questions/questions.module').then((m) => m.QuestionsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
