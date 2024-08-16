import { Component } from '@angular/core';
import { SignupService } from '../../services/signup.service';
import { ToastService } from '../../services/toast.service';

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

  constructor(private userService: SignupService, private toastService: ToastService) {}

  onSubmit(): void {

    if (this.data) {
      this.userService.registerUser(this.data).subscribe({
        next: (response: any) => {
          this.toastService.showToast('success', 'user reistered succesfuly')
          console.log('User registered successfully:', response);
          this.data = {
            username: '',
            email: '',
            password: ''
          }
        },
        error: (error: any) => {
          this.toastService.showToast('error', `${error.statusText}`)
          console.error('Registration error:', error);
        }
      });
    }

  }



  goBack() {

    window.location.href = '/';
  }


}
