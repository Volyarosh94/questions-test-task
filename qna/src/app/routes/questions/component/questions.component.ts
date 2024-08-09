import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../services';
import { Question } from '../../../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./styles/_import.scss']
})
export class QuestionsComponent implements OnInit {
  questions: Question[] = [];
  questionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe(questions => {
      this.questions = questions;
    });

    this.questionForm = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(5)]],
      id: [null]
    });
  }

  addQuestion() {
    this.questionForm['submitted'] = true;

    if (this.questionForm.valid) {
      const question = {text: this.questionForm.value.text};

      this.questionService.addQuestion(question).subscribe({
        next: (res: Question) => {
          this.questions.push({text: res.text, id: res.id});
          this.questionForm.reset();
          this.questionForm['submitted'] = false;
        },
        error: (e) => {
          alert(e.error.message);
        }
      })
    }
  }

  editQuestion(question: Question) {
    this.questionService.lockQuestion(question.id).subscribe({
      next: () => {
        this.router.navigate(['/questions', question.id]);
      },
      error: (e) => {
        console.log(e);
        alert("Someone is already editing this question");
      }
    });
  }

  deleteQuestion(question: Question) {
    if (confirm('Are you sure you want to delete this question?')) {
      this.questionService.deleteQuestion(question.id).subscribe({
        next: () => {
          const index = this.questions.indexOf(question);
          if (index !== -1) {
            this.questions.splice(index, 1);
          }
        },
        error: (e) => {
          alert(e.error.message);
        }
      });
    }
  }

  get isLengthError(): boolean {
    return this.questionForm['submitted'] && this.questionForm.controls['text'].invalid;
  }
}
