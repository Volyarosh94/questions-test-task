import { Routes } from '@angular/router';
import { QuestionsComponent } from './component/questions.component';
import { EditComponent } from './edit/edit.component';

export const questionsRoutes: Routes = [
  {
    path: '',
    component: QuestionsComponent
  },
  {
    path: ':id',
    component: EditComponent
  }
];
