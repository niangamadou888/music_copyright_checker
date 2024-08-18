import { Component } from '@angular/core';
import { SignupService } from '../../services/signup.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  constructor(private userService: SignupService, private toastService: ToastService) {}

  data: any = {
    email:'',
    password:''
  }

  onSubmit(): void {


    if(this.data) {
      this.userService.login(this.data).subscribe({
        next: (response: any) => {
          console.log('response', response.status)
          // get the status code
          if(response.status === 400) {
      
            this.toastService.showToast('error', 'Invalid credentials')
            return;
          }
          this.toastService.showToast('success', 'User logged in successfully')
          // window.location.href = '/'
          this.data = {
            email: '',
            password: ''
          }
        },
        error: (error: any) => {
          this.toastService.showToast('error', `${error.statusText}`)
          // alert('login error')
          console.error('log in error', error)
        }
      })
  }
}

  goBack() {

    window.location.href = '/';
  }
}
