import { Component, OnInit } from '@angular/core';
import { Question } from '../../../interfaces';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../../../services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./styles/_import.scss']
})
export class EditComponent implements OnInit {
  question: Question;
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.params.id;
    this.questionService.getQuestionById(id).subscribe({
      next: (res: Question) => {
        this.question = res;
        this.updateForm();
      },
      error: (e) => {
        alert(e.error.message);
      }
    });
  }

  updateForm() {
    this.editForm = this.fb.group({
      id: [this.question.id],
      text: [this.question.text, [Validators.required, Validators.minLength(5)]]
    });
  }

  save() {
    const id = this.question.id;
    const text = this.editForm.value.text;
    this.questionService.updateQuestion(id, text).subscribe({
      next: () => {
        this.router.navigate(['questions']);
      },
      error: (e) => {
        alert(e.error.message);
      }
    });
  }


  cancel(): void {
    this.router.navigate(['questions']);
  }

  delete() {
    if (confirm('Are you sure you want to delete this question?')) {
      this.questionService.deleteQuestion(this.question.id).subscribe({
        next: () => {
          this.router.navigate(['questions']);
        },
        error: (e) => {
          alert(e.error.message);
        }
      });
    }
  }

  get newQuestionControl(): AbstractControl {
    return this.editForm.get('text');
  }

  get hasErrors(): boolean {
    return this.newQuestionControl.invalid && (this.newQuestionControl.touched || this.newQuestionControl.dirty);
  }

  get isLengthError(): boolean {
    return this.newQuestionControl.errors && this.newQuestionControl.errors['minlength'];
  }
}
