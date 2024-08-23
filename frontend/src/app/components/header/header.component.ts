import { isFakeTouchstartFromScreenReader } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.isAuth();
    
  }
  isLogged: boolean = false;

  isAuth(): boolean {
    let token: string | null = null;

    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }

    if (token) {
      this.isLogged = true;
      return true;
    }

    this.isLogged = false;
    return false;
  }

  logOut(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      this.toastService.showToast('success', 'Logged out successfully');
      setTimeout(() => {
        window.location.href = '/';
      } , 2000);
    }
  }
}
