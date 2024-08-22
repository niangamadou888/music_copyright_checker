import { Component, OnInit } from '@angular/core';
import { MusicCheckerService } from '../../services/music-checker.service';

@Component({
  selector: 'app-music-gallery',
  templateUrl: './music-gallery.component.html',
  styleUrl: './music-gallery.component.css'
})
export class MusicGalleryComponent implements OnInit {
  constructor(private musicService: MusicCheckerService) {}

  ngOnInit(): void {
    this.getMusics();
    console.log(this.musicItems);

  }


  activeTab: string = 'noCopyrightMusic';
  categories: string[] = ['Background', 'Rap', 'Hip Pop', 'Sport', 'EMD', 'EDM', 'Rock', 'Indie', 'Punk', 'Metal', 'Gaming'];
  selectedCategory: string | null = null;
  musicItems: any[] = [];
  likedMusicItems: any[] = new Array(8).fill({}); // Simulate 12 liked music items
  pages: number[] = [1, 2, 3, 4, 5];
  currentPage: number = 1;
  limit = 8;

  getMusics(): void {
    this.musicService.getMusics(this.limit, this.currentPage).subscribe((response: any) => {
      this.musicItems = response; 
    });
  }

  selectTab(tab: string) {
    this.activeTab = tab;
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    // Implement filtering logic here
  }

  selectPage(page: number) {
    this.currentPage = page;
    this.getMusics();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getMusics();
    }
  }

  nextPage() {
    if (this.currentPage < this.pages.length) {
      this.currentPage++;
      this.getMusics();
    }
  }
}
