import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkTheme = new BehaviorSubject<boolean>(false);
  isDarkTheme$ = this.isDarkTheme.asObservable();
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.initializeTheme();
    }
  }

  private initializeTheme(): void {
    if (!this.isBrowser) return;

    try {
      // Check if user has a theme preference in localStorage
      const savedTheme = localStorage.getItem('theme') as ThemeMode;
      if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
        this.isDarkTheme.next(savedTheme === 'dark');
        this.setTheme(savedTheme === 'dark');
      } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.isDarkTheme.next(prefersDark);
        this.setTheme(prefersDark);
      }
    } catch (error) {
      console.error('Error initializing theme:', error);
      // Fallback to light theme
      this.isDarkTheme.next(false);
      this.setTheme(false);
    }
  }

  toggleTheme(): void {
    if (!this.isBrowser) return;

    try {
      const newTheme = !this.isDarkTheme.value;
      this.isDarkTheme.next(newTheme);
      this.setTheme(newTheme);
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Error toggling theme:', error);
    }
  }

  private setTheme(isDark: boolean): void {
    if (!this.isBrowser) return;

    try {
      const body = document.body;
      if (isDark) {
        body.classList.add('dark-theme');
      } else {
        body.classList.remove('dark-theme');
      }
    } catch (error) {
      console.error('Error setting theme:', error);
    }
  }
}
