import { Component, inject, Inject, signal } from '@angular/core';
import { Divider } from "primeng/divider";
import { Button } from "primeng/button";
import { Dialog } from "primeng/dialog";
import { FormsModule } from '@angular/forms';
import { HttpSvcService } from '../../../Service/http-svc.service';
import { CommonModule } from '@angular/common';
import { Message } from "primeng/message";

@Component({
  selector: 'app-product-category-manage',
  imports: [Divider, Button, Dialog, FormsModule, CommonModule, Message],
  templateUrl: './product-category-manage.component.html',
  styleUrl: './product-category-manage.component.css'
})
export class ProductCategoryManageComponent {
visible: boolean = false;
isAddProductError: boolean = false;
  thumbnailPreview: string | null = null;
  selectedThumbnailFile: File | null = null;

  httpSvc = inject(HttpSvcService);
  

 newCategory = {
    name: '',
    description: ''
  };
 
 
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
    formData.append('Name', this.newCategory.name);
    formData.append('Description', this.newCategory.description);
    formData.append('ThumbnailImage', this.selectedThumbnailFile);

    // Send to API
    this.httpSvc.httpPost('your-api-endpoint', formData).subscribe({
      next: (res) => {
        console.log('Category added successfully:', res);
        this.isAddProductError = false;
        // Reset form
        this.newCategory = { name: '', description: '' };
        this.thumbnailPreview = null;
        this.selectedThumbnailFile = null;
      },
      error: (err) => {
        console.error('Error adding category:', err);
      }
    });
  }

 

}
