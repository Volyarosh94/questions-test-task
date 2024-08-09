import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsComponent } from './component/questions.component';
import { RouterModule } from '@angular/router';
import { questionsRoutes } from './questions.routes';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { QuestionService } from '../../services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { JwtInterceptor } from '../../interceptors/jwt.interceptor';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(questionsRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    QuestionsComponent,
    EditComponent
  ],
  providers: [
    HttpClientModule,
    QuestionService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ]
})
export class QuestionsModule { }
