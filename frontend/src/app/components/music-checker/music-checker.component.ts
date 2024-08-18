import { Component, OnInit } from '@angular/core';
import { MusicCheckerService } from '../../services/music-checker.service';
import {MatCardModule} from '@angular/material/card';
import { ToastService } from '../../services/toast.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-music-checker',
  templateUrl: './music-checker.component.html',
  styleUrl: './music-checker.component.css'
})
export class MusicCheckerComponent implements OnInit {

  search_query: string = '';
  results: any[] = []
  searchType: string = 'name';
  clicked: boolean = false;

  constructor(private musicService: MusicCheckerService, private toastService: ToastService) {}

  ngOnInit(): void {


  }
  searchByName(): void {
    this.musicService.getVidsByName(this.search_query).subscribe((response: any) => {
      this.results.push(response)
      console.log(response)
      this.clicked = false;
      return response
    });
  }

  searchById(): void {
    this.musicService.getVidsById(this.search_query).subscribe((response: any) => {
      this.results.push(response)
      console.log(response)
      this.clicked = false;
      return response
    });
  }

  submitForm(form: NgForm): void {

    this.results = [];

    this.clicked = true;
    console.log(this.clicked)

    if(!this.search_query.trim() && !this.search_query.trim()) {
      this.clicked = false;
      this.toastService.showToast('error', 'Search query can\'t be empty')
      return
    }

    if (this.searchType === 'name') {
      this.searchByName();
    } else {
      this.searchById();
    }
  }

  likeVideo(videoId: string): void {
    this.musicService.likeVideo(videoId).subscribe((response: any) => {
      if (response.success) {
        console.log(response)
        this.toastService.showToast('success', 'Video liked successfully');
      } else {
        this.toastService.showToast('error', 'Failed to like video');
      }
    });
  }
  
}
