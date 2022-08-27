import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServerService } from '../services/server.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  correct_responses = 0;
  current_question: number = 1;
  responses_form: any = {};
  questions: any[] = [];
  show_questions: boolean = false;
  last_question: boolean = false;

  constructor(private server: ServerService, private router: Router) {}

  ngOnInit(): void {
    this.server.get_random_questions().subscribe((data: any) => {
      this.questions = data.questions;
      console.log(data);
      this.show_questions = true;
      if (this.current_question == data.questions.length) {
        this.last_question = true;
      }
    });
  }

  submit_question() {
    let responses_list = Object.entries(this.responses_form);
    if (responses_list.length == 0) {
      Swal.fire({
        title: 'Error!',
        text: 'Please select a response',
        icon: 'warning',
        confirmButtonText: 'Continue',
      });
    } else {
      let response = parseInt(responses_list[0][0]);
      let correct_response = this.questions[
        this.current_question - 1
      ].responses.find((response: any) => response.correct == true);
      if (correct_response && response == correct_response.id) {
        this.correct_responses++;
      }
      if (!this.last_question) {
        this.current_question++;
        if (this.current_question == this.questions.length) {
          this.last_question = true;
        }
      } else {
        if (this.correct_responses >= this.questions.length / 2) {
          Swal.fire({
            title: 'Congratulations',
            text: `You passed the test with a score of ${this.correct_responses}/${this.questions.length}`,
            icon: 'success',
            confirmButtonText: 'Go Home',
          }).then((data) => {
            if (data.isConfirmed) {
              this.router.navigate(['/']);
            }
          });
        } else {
          Swal.fire({
            title: 'Ooh :(',
            text: `Unfortunately you did not pass the test, score ${this.correct_responses}/${this.questions.length}`,
            icon: 'error',
            confirmButtonText: 'Go Home',
          }).then((data) => {
            if (data.isConfirmed) {
              this.router.navigate(['/']);
            }
          });
        }
      }
      this.responses_form = {};
    }
  }

  select_response(id: number) {
    this.responses_form = {};
    this.responses_form[id] = true;
  }
}
