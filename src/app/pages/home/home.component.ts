import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { interval, Subscription } from 'rxjs';

// Angular Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  // Hero Slider Properties
  currentSlide = 0;
  slideInterval!: Subscription;
  
  // Hero Slides Data
  heroSlides = [
    {
      id: 1,
      title: 'Buy & Sell with Confidence',
      subtitle: 'Egypt\'s Most Trusted P2P Platform',
      description: 'Connect with verified sellers and buyers across Egypt. Safe transactions guaranteed.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop&q=80',
      buttonText: 'Start Trading',
      badge: 'TRUSTED'
    },
    {
      id: 2,
      title: 'Fast & Secure Delivery',
      subtitle: 'Nationwide Coverage',
      description: 'Professional delivery service to all Egyptian cities with full insurance coverage.',
      image: 'https://images.unsplash.com/photo-1566400789593-80851ee09de4?w=1200&h=600&fit=crop&q=80',
      buttonText: 'Learn More',
      badge: 'SECURE'
    },
    {
      id: 3,
      title: 'Verified Community',
      subtitle: 'Real People, Real Reviews',
      description: 'Join thousands of verified users trading safely every day.',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=600&fit=crop&q=80',
      buttonText: 'Join Now',
      badge: 'VERIFIED'
    }
  ];

  // Platform Statistics
  platformStats = [
    {
      icon: 'people',
      number: '50K+',
      label: 'Active Users',
      color: 'linear-gradient(135deg, #0f766e 0%, #0d9488 100%)'
    },
    {
      icon: 'inventory_2',
      number: '25K+',
      label: 'Products Listed',
      color: 'linear-gradient(135deg, #0891b2 0%, #0284c7 100%)'
    },
    {
      icon: 'local_shipping',
      number: '15K+',
      label: 'Delivered Orders',
      color: 'linear-gradient(135deg, #0369a1 0%, #0284c7 100%)'
    },
    {
      icon: 'star',
      number: '4.9',
      label: 'Average Rating',
      color: 'linear-gradient(135deg, #075985 0%, #0369a1 100%)'
    }
  ];

  // Featured Product Listings
  featuredListings = [
    {
      id: 1,
      title: 'iPhone 15 Pro Max - Like New',
      price: 45000,
      originalPrice: 50000,
      sellerName: 'Ahmed Hassan',
      sellerRating: 4.9,
      sellerReviews: 128,
      location: 'New Cairo, Cairo',
      timePosted: '2 hours ago',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop&q=80',
      isVerified: true,
      deliveryFee: 50,
      category: 'Electronics',
      condition: 'Like New',
      isAvailable: true,
      views: 245,
      likes: 18
    },
    {
      id: 2,
      title: 'MacBook Pro M3 - Sealed Box',
      price: 75000,
      originalPrice: null,
      sellerName: 'Sara Mohamed',
      sellerRating: 4.8,
      sellerReviews: 95,
      location: 'Alexandria',
      timePosted: '5 hours ago',
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop&q=80',
      isVerified: true,
      deliveryFee: 75,
      category: 'Electronics',
      condition: 'New',
      isAvailable: true,
      views: 189,
      likes: 24
    },
    {
      id: 3,
      title: 'Nike Air Jordan 1 Retro',
      price: 3500,
      originalPrice: 4200,
      sellerName: 'Omar Ali',
      sellerRating: 4.7,
      sellerReviews: 67,
      location: 'Giza',
      timePosted: '1 day ago',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop&q=80',
      isVerified: false,
      deliveryFee: 35,
      category: 'Fashion',
      condition: 'Very Good',
      isAvailable: true,
      views: 134,
      likes: 12
    },
    {
      id: 4,
      title: 'Gaming Setup Complete',
      price: 25000,
      originalPrice: 30000,
      sellerName: 'Mona Ahmed',
      sellerRating: 4.9,
      sellerReviews: 156,
      location: 'Maadi, Cairo',
      timePosted: '2 days ago',
      image: 'https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=400&h=300&fit=crop&q=80',
      isVerified: true,
      deliveryFee: 100,
      category: 'Electronics',
      condition: 'Excellent',
      isAvailable: true,
      views: 298,
      likes: 31
    },
    {
      id: 5,
      title: 'Samsung Galaxy S24 Ultra',
      price: 35000,
      originalPrice: 40000,
      sellerName: 'Khaled Mostafa',
      sellerRating: 4.8,
      sellerReviews: 89,
      location: 'Heliopolis',
      timePosted: '3 hours ago',
      image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop&q=80',
      isVerified: true,
      deliveryFee: 45,
      category: 'Electronics',
      condition: 'Excellent',
      isAvailable: true,
      views: 178,
      likes: 19
    },
    {
      id: 6,
      title: 'Adidas Ultraboost 22',
      price: 2800,
      originalPrice: 3500,
      sellerName: 'Yasmin Farid',
      sellerRating: 4.6,
      sellerReviews: 45,
      location: 'Zamalek',
      timePosted: '6 hours ago',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=300&fit=crop&q=80',
      isVerified: true,
      deliveryFee: 30,
      category: 'Fashion',
      condition: 'Good',
      isAvailable: true,
      views: 98,
      likes: 8
    }
  ];

  // Success Stories / Testimonials
  successStories = [
    {
      buyerName: 'Tarek Samy',
      sellerName: 'Layla Ibrahim',
      item: 'Vintage Camera',
      rating: 5,
      review: 'Amazing experience! Fast delivery and exactly as described. Highly recommend this platform!',
      avatar: 'https://ui-avatars.com/api/?name=Tarek+Samy&background=be185d&color=fff&size=64',
      transactionValue: 'EGP 8,500',
      date: '2 weeks ago'
    },
    {
      buyerName: 'Nour Hassan',
      sellerName: 'Karim Adel',
      item: 'Designer Handbag',
      rating: 5,
      review: 'Professional service and secure delivery. Will definitely use Canto again for future purchases.',
      avatar: 'https://ui-avatars.com/api/?name=Nour+Hassan&background=9f1239&color=fff&size=64',
      transactionValue: 'EGP 12,000',
      date: '1 week ago'
    }
  ];

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.startSlideTimer();
  }

  ngOnDestroy(): void {
    if (this.slideInterval) {
      this.slideInterval.unsubscribe();
    }
  }

  // Hero Slider Methods
  startSlideTimer(): void {
    this.slideInterval = interval(5000).subscribe(() => {
      this.nextSlide();
    });
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.heroSlides.length;
  }

  prevSlide(): void {
    this.currentSlide = this.currentSlide === 0 ? this.heroSlides.length - 1 : this.currentSlide - 1;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  // Product Interaction Methods
  onListingClick(listing: any): void {
    console.log('Viewing listing:', listing.title);
    // Navigate to product details page
    // this.router.navigate(['/product', listing.id]);
  }

  contactSeller(listing: any): void {
    console.log('Contacting seller for:', listing.title);
    this.showSnackBar(`Opening chat with ${listing.sellerName}...`, 'success');
    
    // Open seller contact modal or navigate to chat
    // this.chatService.openChat(listing.sellerId);
  }

  addToCart(listing: any): void {
    console.log('Adding to cart:', listing.title);
    
    if (listing.isAvailable) {
      // Add to cart logic
      // this.cartService.addItem(listing);
      
      this.showSnackBar(`${listing.title} added to cart!`, 'success');
      
      // Optional: Update listing views
      listing.views++;
    } else {
      this.showSnackBar('This item is currently unavailable', 'error');
    }
  }

  // Utility Methods
  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  }

  getDiscountPercentage(original: number, current: number): number {
    if (!original || original <= current) return 0;
    return Math.round(((original - current) / original) * 100);
  }

  formatNumber(num: number): string {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  // Helper method for showing notifications
  private showSnackBar(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    const config = {
      duration: 3000,
      horizontalPosition: 'center' as const,
      verticalPosition: 'bottom' as const,
      panelClass: [`${type}-snackbar`]
    };
    
    this.snackBar.open(message, 'Close', config);
  }

  // Navigation Methods (for future implementation)
  navigateToMarketplace(): void {
    console.log('Navigate to marketplace');
    // this.router.navigate(['/marketplace']);
  }

  navigateToCategories(): void {
    console.log('Navigate to categories');
    // this.router.navigate(['/categories']);
  }

  navigateToProfile(): void {
    console.log('Navigate to user profile');
    // this.router.navigate(['/profile']);
  }

  // Search functionality (for future implementation)
  onSearch(query: string): void {
    console.log('Search query:', query);
    // this.searchService.search(query);
  }

  // Filter methods (for future implementation)
  filterByCategory(category: string): void {
    console.log('Filter by category:', category);
    // this.filterService.filterByCategory(category);
  }

  filterByLocation(location: string): void {
    console.log('Filter by location:', location);
    // this.filterService.filterByLocation(location);
  }

  filterByPriceRange(min: number, max: number): void {
    console.log('Filter by price range:', min, max);
    // this.filterService.filterByPriceRange(min, max);
  }

  // Social features (for future implementation)
  likeProduct(listing: any): void {
    if (!listing.isLiked) {
      listing.likes++;
      listing.isLiked = true;
      this.showSnackBar('Added to favorites!', 'success');
    } else {
      listing.likes--;
      listing.isLiked = false;
      this.showSnackBar('Removed from favorites', 'info');
    }
  }

  shareProduct(listing: any): void {
    console.log('Sharing product:', listing.title);
    
    if (navigator.share) {
      navigator.share({
        title: listing.title,
        text: `Check out this ${listing.category.toLowerCase()} on Canto!`,
        url: window.location.href + `/product/${listing.id}`
      });
    } else {
      // Fallback to copy to clipboard
      const url = window.location.href + `/product/${listing.id}`;
      navigator.clipboard.writeText(url).then(() => {
        this.showSnackBar('Product link copied to clipboard!', 'success');
      });
    }
  }

  // Analytics tracking (for future implementation)
  trackProductView(listing: any): void {
    // Analytics service to track product views
    // this.analyticsService.trackEvent('product_view', {
    //   product_id: listing.id,
    //   product_title: listing.title,
    //   category: listing.category,
    //   price: listing.price
    // });
  }

  trackUserAction(action: string, data?: any): void {
    // Analytics service to track user actions
    // this.analyticsService.trackEvent(action, data);
  }
}