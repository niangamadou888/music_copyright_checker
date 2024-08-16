import { Component } from '@angular/core';
import { SignupService } from '../../services/signup.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  constructor(private userService: SignupService) {}

  data: any = {
    email:'',
    password:''
  }

  onSubmit(): void {

    if(this.data) {
      this.userService.login(this.data).subscribe({
        next: (response: any) => {
          alert('logged in succesfully')
          console.log('user logged in', response)
          window.location.href = '/'
          this.data = {
            email: '',
            password: ''
          }
        },
        error: (error: any) => {
          alert('login error')
          console.error('log in error', error)
        }
      })
  }
}

  goBack() {

    window.location.href = '/';
  }
}
