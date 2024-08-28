import { Component, OnInit } from '@angular/core';
import { MusicCheckerService } from '../../services/music-checker.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { MusicDialogComponent } from '../music-dialog/music-dialog.component'; 
import { SignupService } from '../../services/signup.service';

@Component({
  selector: 'app-music-gallery',
  templateUrl: './music-gallery.component.html',
  styleUrls: ['./music-gallery.component.css']
})
export class MusicGalleryComponent implements OnInit {
  constructor(private musicService: MusicCheckerService, private sanitizer: DomSanitizer, private dialog: MatDialog, private userService: SignupService) {} 

  ngOnInit(): void {
    this.isAuth();
    this.getMusics();
    this.getMusicsByUser();
  }

  activeTab: string = 'noCopyrightMusic';
  categories: string[] = ['Background', 'Rap', 'Hip Pop', 'Gym', 'EMD', 'EDM', 'Rock', 'Indie', 'Punk', 'No copyright', 'Free Music'];
  selectedCategory: string | null = null;
  musicItems: any[] = [];
  likedMusicItems: any[] = [];
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

    const isLogged = this.userService.isAuth();
    if (isLogged) {
      this.isLogged = true;
      return true;
    }
    return false;
  }

  getMusicsByUser(): void {
    if (this.isLogged) {
      this.musicService.getMusicsByUser(this.limit, this.currentPage).subscribe((response: any) => {
        this.likedMusicItems = response;
      });
    }
  }

  playSong(url: string) {
    const embedUrl = this.getEmbedUrl(url);
    const dialogRef = this.dialog.open(MusicDialogComponent, {
      data: { url: embedUrl },
      width: '50%',
      height: '55%'

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  private getEmbedUrl(url: string): SafeResourceUrl {
    const videoId = url.split('v=')[1];
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
}
