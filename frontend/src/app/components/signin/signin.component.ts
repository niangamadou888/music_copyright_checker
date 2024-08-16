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
          this.toastService.showToast('success', 'User logged in successfully')
          console.log('user logged in', response)
          window.location.href = '/'
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
