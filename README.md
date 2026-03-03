# Dealio Marketplace 

> A secure platform for buying and selling **used products** between sellers and buyers.

---

## Overview

This application facilitates **safe transactions** by allowing sellers to list used products and buyers to purchase them online. The process is secured with **OTP verification** at both pickup and delivery stages, ensuring that products are handed over safely. Payments are only released to the seller after the buyer confirms successful delivery.

---

## Key Features

- 🛒 **Product Listings:** Sellers can add and manage used products for sale.  
- 💳 **Online Payments:** Buyers pay securely through the platform.  
- 🚚 **Delivery Management:** Delivery agents pick up and deliver orders with OTP confirmation.  
- 🔐 **OTP Verification:** One-Time Passwords verify product handoff between seller, delivery agent, and buyer.  
- 📦 **Order Tracking:** Real-time updates on order status from placement to delivery.  
- ⚖️ **Commission System:** The platform automatically deducts commission from seller payments after delivery confirmation.

---

## Roles

- **Admin:** Full system control and management.  
- **Seller:** Lists and manages products.  
- **Buyer:** Browses, orders, and pays for products.  
- **Delivery Agent:** Handles pickup and delivery with OTP validation.

---

## Technology Stack

- **Backend:** ASP.NET Core Web API  
- **Frontend:** Angular (fully responsive)  
- **Database:** SQL Server  
- **Authentication:** ASP.NET Identity  

---

## How It Works

1. Buyer browses and places an order.  
2. OTP codes are sent to buyer and seller.  
3. Delivery agent picks up the product using the seller’s OTP.  
4. Product is delivered and verified with buyer’s OTP.  
5. Payment is released to the seller after commission deduction.

---

*This project aims to create a trustworthy environment for buying and selling used products, combining security with ease of use.*  
