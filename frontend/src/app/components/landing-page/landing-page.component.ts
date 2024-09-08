import { Component, OnInit } from '@angular/core';
import { Renderer2, ElementRef } from '@angular/core';
import { SignupService } from '../../services/signup.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit{

  

  constructor(private userService: SignupService, private renderer: Renderer2, private el: ElementRef) {}

  parentResults: any[] = [];

  handleResultsChange(newResults: any[]) {
    // scrollup by 300 pixel
    window.scrollBy(0, 300);
    console.log('Results received from child:', this.parentResults);
}


  ngOnInit(): void {
  this.renderer.addClass(this.el.nativeElement.ownerDocument.body, 'bg-img');
  this.userService.isAuth();
 }

 ngOnDestory(): void {
    this.renderer.removeClass(this.el.nativeElement.ownerDocument.body, 'bg-img');
  }

//  

}
