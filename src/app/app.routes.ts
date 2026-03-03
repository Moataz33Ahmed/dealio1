import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MarketplaceComponent } from './pages/marketplace/marketplace.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { SellProductComponent } from './pages/sell-product/sell-product.component';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ListedProductsComponent } from './pages/listed-products/listed-products.component';
import { UserInformationComponent } from './pages/user-information/user-information.component';
import { BuyerPaymentComponent } from './pages/payment/buyer-payment.component';
import { RatingComponent } from './pages/Rating/rating.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'marketplace', component: MarketplaceComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'sell', component: SellProductComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'listed-products', component: ListedProductsComponent },
  { path: 'user-information', component: UserInformationComponent },
  { path: 'buyer-payment', component: BuyerPaymentComponent, canActivate: [AuthGuard] },
  { path: 'rating', component: RatingComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard] }, 
  { path: '**', redirectTo: 'home' }, 
];