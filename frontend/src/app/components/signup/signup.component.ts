import { Component } from '@angular/core';
import { SignupService } from '../../services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  data: any ={
    username: '',
    email: '',
    password: '',
  }

  constructor(private userService: SignupService) {}

  onSubmit(): void {

    if (this.data) {
      this.userService.registerUser(this.data).subscribe({
        next: (response: any) => {
          alert('user reistered succesfuly')
          console.log('User registered successfully:', response);
          this.data = {
            username: '',
            email: '',
            password: ''
          }
        },
        error: (error: any) => {
          alert('Registration error')
          console.error('Registration error:', error);
        }
      });
    }

  }



  goBack() {

    window.location.href = '/';
  }


}
