import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layouts/main-layout/header/header.component';
import { FooterComponent } from './layouts/main-layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="app-container">
      <!-- Sticky Header -->
      <app-header></app-header>
      
      <!-- Main Content with proper spacing -->
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      
      <!-- Footer -->
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    
    .main-content {
      flex: 1;
      background: #f5f5f5;
      position: relative;
      z-index: 1;
      
      // Ensure content starts below the sticky header
      margin-top: 0;
      padding-top: 0;
    }
    
    // Smooth transitions
    * {
      box-sizing: border-box;
    }
  `]
})
export class AppComponent {
  title = 'canto';
}