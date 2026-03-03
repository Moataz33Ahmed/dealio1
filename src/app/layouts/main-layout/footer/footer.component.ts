import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Angular Material Imports
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatTooltipModule
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentYear = new Date().getFullYear();
  
  footerLinks = {
    company: [
      { label: 'About Us', route: '/about' },
      { label: 'Press', route: '/press' },
      { label: 'News', route: '/news' }
    ],
    support: [
      { label: 'Help Center', route: '/help' },
      { label: 'Contact Us', route: '/contact' }
    ],
    business: [
      { label: 'Sell on Dealio', route: '/become-seller' },
      { label: 'Advertise', route: '/advertise' },
      { label: 'Business Solutions', route: '/business' }
    ]
  };

  socialLinks = [
    { icon: 'facebook', url: 'https://facebook.com/canto', label: 'Facebook' },
    { icon: 'linkedin', url: 'https://linkedin.com/company/canto', label: 'LinkedIn' }
  ];

  ngOnInit(): void {}

  onSocialClick(url: string): void {
    window.open(url, '_blank');
  }

  onNewsletterSubmit(): void {
    console.log('Newsletter subscription');
  }
}