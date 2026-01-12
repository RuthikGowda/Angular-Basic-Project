import { Component, OnInit, OnDestroy, signal, effect, computed, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { of, Subscription, interval, from } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../Service/admin.service';
import { CarouselItem } from '../../Model/admin';
 
@Component({
  selector: 'app-home',
  imports: [ FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent  {
  adminSvc = inject(AdminService);
carouselUiData$ = this.adminSvc.getCarouseldata$.pipe( 
  map((res: any) => (res.data as CarouselItem[])),//.filter((item: CarouselItem) => item.isActive === true)),
  catchError((error) => {
    console.error('Error fetching carousel data:', error);
    return of([
      {
        id: 0,
        title: 'Sample Title',
        description: 'Sample Description',
        imageUrl: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
        createdDate: new Date(),
        isActive: true
      }
    ]); // Always return an array
  }),
  tap((data) => { console.log('Carousel data loaded:', data); })
); 

categories = [
     {
      imageUrl :'https://www.ikea.com/in/en/images/products/pax-wardrobe-combination-white__1080341_pe857977_s5.jpg?f=xl',
      title: 'Wardrobe',
      description: 'Stylish and spacious wardrobe for your bedroom.',
      price: 15000
     },
      {
        imageUrl :'https://www.ikea.com/in/en/images/products/soederhamn-corner-sofa-6-seat-viarp-beige-brown__0802771_pe768584_s5.jpg?f=xl',
        title: 'Sofa',
        description: 'Comfortable and modern sofa for your living room.',
        price: 30000
      },
      {
        imageUrl :'https://www.fabvoguestudio.com/cdn/shop/files/pr-plnc-0-pl1810-110-red-colour-natural-crepe-plain-dyed-fabric-1.jpg?v=1687255613&width=1800https://www.fabvoguestudio.com/cdn/shop/files/pr-plnc-0-pl1810-110-red-colour-natural-crepe-plain-dyed-fabric-1.jpg?v=1687255613&width=1800',
        title: 'Dining Table',
        description: 'Elegant dining table for family gatherings.',
        price: 20000
      },
      {
        imageUrl :'https://www.fabvoguestudio.com/cdn/shop/files/pr-plnc-0-pl1810-110-red-colour-natural-crepe-plain-dyed-fabric-1.jpg?v=1687255613&width=1800https://www.fabvoguestudio.com/cdn/shop/files/pr-plnc-0-pl1810-110-red-colour-natural-crepe-plain-dyed-fabric-1.jpg?v=1687255613&width=1800',
        title: 'Coffee Table',
        description: 'Stylish coffee table for your living room.',
        price: 8000
      },
      {
        imageUrl :'https://www.fabvoguestudio.com/cdn/shop/files/pr-plnc-0-pl1810-110-red-colour-natural-crepe-plain-dyed-fabric-1.jpg?v=1687255613&width=1800https://www.fabvoguestudio.com/cdn/shop/files/pr-plnc-0-pl1810-110-red-colour-natural-crepe-plain-dyed-fabric-1.jpg?v=1687255613&width=1800',
        title: 'Bookshelf',
        description: 'Spacious bookshelf for your collection.',
        price: 12000
      }
      ,
      {
        imageUrl :'https://www.fabvoguestudio.com/cdn/shop/files/pr-plnc-0-pl1810-110-red-colour-natural-crepe-plain-dyed-fabric-1.jpg?v=1687255613&width=1800https://www.fabvoguestudio.com/cdn/shop/files/pr-plnc-0-pl1810-110-red-colour-natural-crepe-plain-dyed-fabric-1.jpg?v=1687255613&width=1800',
        title: 'Bed Frame',
        description: 'Sturdy bed frame for a good night\'s sleep.',
        price: 18000
      }
  ];
products =[
  {
    imageUrl: 'https://www.fabvoguestudio.com/cdn/shop/files/pr-plnc-0-pl1810-110-red-colour-natural-crepe-plain-dyed-fabric-1.jpg?v=1687255613&width=1800https://www.fabvoguestudio.com/cdn/shop/files/pr-plnc-0-pl1810-110-red-colour-natural-crepe-plain-dyed-fabric-1.jpg?v=1687255613&width=1800',
    name: 'Wardrobe',
    description: 'Stylish and spacious wardrobe for your bedroom.',
    price: 15000
  },
  {
    imageUrl: 'https://www.fabvoguestudio.com/cdn/shop/files/pr-plnc-0-pl1810-110-red-colour-natural-crepe-plain-dyed-fabric-1.jpg?v=1687255613&width=1800https://www.fabvoguestudio.com/cdn/shop/files/pr-plnc-0-pl1810-110-red-colour-natural-crepe-plain-dyed-fabric-1.jpg?v=1687255613&width=1800',
    name: 'Sofa',
    description: 'Comfortable and modern sofa for your living room.',
    price: 30000
  },
  {
    imageUrl: 'https://www.ikea.com/in/en/images/products/hemnes-wardrobe-with-3-doors-white__0732057_pe740679_s5.jpg?f=xl',
    name: 'Dining Table',
    description: 'Elegant dining table for family gatherings.',
    price: 20000
  }
]
   
}
