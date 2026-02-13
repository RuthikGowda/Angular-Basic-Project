import { Component, inject, Inject, signal } from '@angular/core';
import { Divider } from "primeng/divider";
import { Button } from "primeng/button";
import { Dialog } from "primeng/dialog";
import { FormsModule } from '@angular/forms';
import { HttpSvcService } from '../../../Service/http-svc.service';
import { CommonModule } from '@angular/common';
import { Message } from "primeng/message";
import { environment } from '../../../../environments/environment.production';
import { AdminService } from '../../../Service/admin.service';
import { catchError, EMPTY, map, tap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Image } from "primeng/image";
import { ProgressSpinner } from "primeng/progressspinner";
import { SpeedDial } from "primeng/speeddial";
import { ProductCategoryItem } from '../../../Model/admin';

@Component({
  selector: 'app-product-category-manage',
  imports: [Divider, Button, Dialog, FormsModule, CommonModule, Message, Image, ProgressSpinner, SpeedDial],
  templateUrl: './product-category-manage.component.html',
  providers: [MessageService],
  styleUrl: './product-category-manage.component.css'
})
export class ProductCategoryManageComponent {
getMenuItems(_t96: ProductCategoryItem): import("primeng/api").MenuItem[]|null {
throw new Error('Method not implemented.');
}
visible: boolean = false;
isAddProductError: boolean = false;
  thumbnailPreview: string | null = null;
  selectedThumbnailFile: File | null = null;
  ProgressBar: boolean = false;
  productCategories$: any;  

  httpSvc = inject(HttpSvcService);
  adminSvc = inject(AdminService);
  messageSvc = inject(MessageService);
  

 newCategory = {
    name: '',
    description: ''
  };
 
  oninit() {
     this.adminSvc.getProductCategory();
  }
 
 showAddCatDialog() {
    this.isAddProductError = true;
    this.thumbnailPreview = null;
    this.selectedThumbnailFile = null;
  }



  onThumbnailSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      // Validate file type
      if (file.type.startsWith('image/')) {
        this.selectedThumbnailFile = file;
        
        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
          this.thumbnailPreview = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select a valid image.');
        this.thumbnailPreview = null;
        this.selectedThumbnailFile = null;
      }
    }
  }

  AddProductCategory() {
    if (!this.selectedThumbnailFile) {
      alert('Please select a thumbnail image.');
      return; 
    }

    const formData = new FormData();
    formData.append('Title', this.newCategory.name);
    formData.append('Description', this.newCategory.description);
    formData.append('Image', this.selectedThumbnailFile);

    // Send to API
    this.httpSvc.httpPost(`${environment.ASPNET_API_URL + environment.AddCategory}`, formData).subscribe({
      next: (res) => {
        console.log('Category added successfully:', res);
        this.isAddProductError = false;
        // Reset form
        this.newCategory = { name: '', description: '' };
        this.thumbnailPreview = null;
        this.selectedThumbnailFile = null;
        console.log('Carousel added successfully:', res);
        this.messageSvc.add({ severity: 'success', summary: 'Success', detail: 'Category added successfully!' });
        
        this.adminSvc.getProductCategory();
        this.visible = false; // Close the dialog after submission
      },
      error: (err) => {
        console.error('Error adding category:', err);
      }
    });
  }


  CategoryUiData$ = this.adminSvc.getProductCategory$.pipe(
    map((res) => res.data),
    catchError((e) => {
      return  EMPTY; // Always return an array
    }),
    tap((data) => {
      console.log('Carousel data loaded:', data);
    //  this.ProgressBar = false; // Hide progress bar after data is loaded
    }),
   )
 
   

}
