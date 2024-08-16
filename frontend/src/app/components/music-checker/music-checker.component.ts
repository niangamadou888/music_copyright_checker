import { Component, OnInit } from '@angular/core';
import { MusicCheckerService } from '../../services/music-checker.service';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-music-checker',
  templateUrl: './music-checker.component.html',
  styleUrl: './music-checker.component.css'
})
export class MusicCheckerComponent implements OnInit {

  search_query: string = '';
  results: any[] = []

  constructor(private musicService: MusicCheckerService) {}

  ngOnInit(): void {


  }

  submitForm(): void {

    if (this.search_query.trim()) {
      this.musicService.getVids(this.search_query).subscribe((response: any) => {
        this.results = [];

        if (response.items && response.items.length > 0) {
          this.results = response.items.map((item: { snippet: { title: any; description: any; thumbnails: { high: { url: any; }; }; }; id: { videoId: any; }; }) => {
            const lis = this.musicService.getLicense(item.id.videoId).subscribe(data => console.log(data.data))
            return {
              title: item.snippet.title,
              description: item.snippet.description,
              thumbnail: item.snippet.thumbnails.high.url,
              videoId: item.id.videoId,
              liscence: lis

            };
          });


        }
      });
    }
  }
}
