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

  constructor(private musicService: MusicCheckerService, private toastService: ToastService) {}

  ngOnInit(): void {


  }
  searchByName(): void {
    this.musicService.getVidsByName(this.search_query).subscribe((response: any) => {
      this.results.push(response)
      console.log(response)
      return response
    });
  }

  searchById(): void {
    this.musicService.getVidsById(this.search_query).subscribe((response: any) => {
      this.results.push(response)
      console.log(response)
      return response
    });
  }

  submitForm(form: NgForm): void {

    this.results = [];

    if(!this.search_query.trim() && !this.search_query.trim()) {
      this.toastService.showToast('error', 'Search query can\'t be empty')
      return
    }

    if (this.searchType === 'name') {
      this.searchByName();
    } else {
      this.searchById();
    }

    // if (this.search_query.trim()) {
    //   this.musicService.getVidsById(this.search_query).subscribe((response: any) => {
    //     this.results = [];

    //     if (response.items && response.items.length > 0) {
    //       this.results = response.items.map((item: { snippet: { title: any; description: any; thumbnails: { high: { url: any; }; }; }; id: { videoId: any; }; }) => {
    //         const lis = this.musicService.getLicense(item.id.videoId).subscribe(data => console.log(data.data))
    //         return {
    //           title: item.snippet.title,
    //           description: item.snippet.description,
    //           thumbnail: item.snippet.thumbnails.high.url,
    //           videoId: item.id.videoId,
    //           license: lis

    //         };
    //       });
    //     }
    //   });
    // }
  }

  likeVideo(videoId: string): void {
    this.musicService.likeVideo(videoId).subscribe((response: any) => {
      if (response.success) {
        this.toastService.showToast('success', 'Video liked successfully');
      } else {
        this.toastService.showToast('error', 'Failed to like video');
      }
    });
  }
  
}
