import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionsModule } from './routes/questions/questions.module';
import { AuthModule } from './routes/auth/auth.module';
import { ComponentsModule } from './components/components.module';
import { AuthService } from './services';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    AuthModule,
    QuestionsModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
