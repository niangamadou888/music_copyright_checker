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
    this.isAuth();
    this.getMusics();
    this.getMusicsByUser();
    console.log(this.likedMusicItems);
    console.log(this.isLogged);

  }


  activeTab: string = 'noCopyrightMusic';
  categories: string[] = ['Background', 'Rap', 'Hip Pop', 'Gym', 'EMD', 'EDM', 'Rock', 'Indie', 'Punk', 'No copyright', 'Free Music'];
  selectedCategory: string | null = null;
  musicItems: any[] = [];
  likedMusicItems: any[] = []
  pages: number[] = [1, 2, 3, 4, 5];
  currentPage: number = 1;
  limit = 4;
  filteredMusicItems: any[] = [];
  isLogged: boolean = false;

  getMusics(): void {
    this.musicService.getMusics(this.limit, this.currentPage).subscribe((response: any) => {
      this.musicItems = response; 
      this.filterMusicItems();
    });
  }


  filterMusicItems() {
    if (this.selectedCategory) {
      this.filteredMusicItems = this.musicItems.filter(item =>
        item.tags.includes(this.selectedCategory)
      );
    } else {
      this.filteredMusicItems = this.musicItems;
    }
  }

  selectTab(tab: string) {
    this.activeTab = tab;
  }

  selectCategory(category: string | null) {
    this.selectedCategory = category;
    this.filterMusicItems();
  }

  selectPage(page: number) {
    this.currentPage = page;
    this.getMusics();
    this.getMusicsByUser();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getMusics();
      this.getMusicsByUser();
    }
  }

  nextPage() {
    if (this.currentPage < this.pages.length) {
      this.currentPage++;
      this.getMusics();
      this.getMusicsByUser();
    }
  }

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

  getMusicsByUser(): void {
    if(this.isLogged) {
      this.musicService.getMusicsByUser(this.limit, this.currentPage).subscribe((response: any) => {
        this.likedMusicItems = response
      });
    }
  }
}
