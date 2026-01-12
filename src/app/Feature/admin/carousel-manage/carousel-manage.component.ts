import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpSvcService } from '../../../Service/http-svc.service';
import { environment } from '../../../../environments/environment.production';
import { CarouselItem } from '../../../Model/admin';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { Image } from 'primeng/image'; 
import { AdminService } from '../../../Service/admin.service';
import { catchError, finalize, map, of, tap } from 'rxjs';
import { Dialog } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from "primeng/message";
import { MenuItem, MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ProgressSpinner } from 'primeng/progressspinner';
import { SpeedDial } from 'primeng/speeddial';

@Component({
  selector: 'app-carousel-manage',
  imports: [ReactiveFormsModule, CommonModule, CardModule, ButtonModule, DividerModule, Image,
    Dialog, InputTextModule, AvatarModule, ProgressSpinner, SpeedDial,
    AsyncPipe, DatePipe, MessageModule, Toast],
  providers: [MessageService],
  templateUrl: './carousel-manage.component.html',
  styleUrl: './carousel-manage.component.css'
})

export class CarouselManageComponent implements OnInit {
  //     }
  //   })
  //   this.httpsvc.httpPost<any, FormData>(`${environment.ASPNET_API_URL + environment.addcarousel}`, formData).subscribe({
  //     next: (res) => {
  //       console.log('Carousel updated successfully:', res);
  //       alert('Carousel updated successfully!');
  //       this.carouselForm.reset();
  //     }
  //   });
  // }
  onToggleChange(_t29: CarouselItem) {
    throw new Error('Method not implemented.');
  }


  messageSvc = inject(MessageService);
  fb = inject(FormBuilder);
  httpsvc = inject(HttpSvcService);
  adminSvc = inject(AdminService);
  visible: boolean = false;
  ProgressBar: boolean = false;
  menuItems: MenuItem[] | null = null;

  ngOnInit(): void {
    this.ProgressBar = true;
    this.adminSvc.getCarouseldat();
  }

  getMenuItems(item: CarouselItem): MenuItem[] {
    return [
      {
        icon: 'pi pi-pencil',
        command: () => this.openEditDialog(item)

      },

      {
        icon: 'pi pi-trash',
        command: () => {
          this.deleteCarousel(item.id);
          this.messageSvc.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
        }
      },
      {
        icon: 'pi pi-upload',
        routerLink: ['/fileupload']
      }

    ];

  }

  openEditDialog(item: CarouselItem): void {
    this.visible = true;
    this.addForm.patchValue(item);
  }

  deleteCarousel(id: Number): void {
    console.log('Delete Carousel Item with ID:', id);

  }




  onSubmit() {

    if (this.addForm.valid) {
      const formData = new FormData();
      // Ensure field names match backend expectations (usually camelCase)
      formData.append('Id', this.addForm.controls.id.value.toString());
      formData.append('Title', this.addForm.controls.title.value);
      formData.append('Description', this.addForm.controls.description.value);
      if (this.addForm.controls.image.value instanceof File) {
        formData.append('Image', this.addForm.controls.image.value);
      } else {
        // If image is not a File, do not append or handle accordingly
        alert('Please select a valid image file.');
        return;
      }
      this.httpsvc.httpPost<any, FormData>(`${environment.ASPNET_API_URL + environment.addcarousel}`, formData).subscribe({
        next: (res) => {
          console.log('Carousel added successfully:', res);
          this.messageSvc.add({ severity: 'success', summary: 'Success', detail: 'Carousel added successfully!' });
          this.addForm.reset();
          this.visible = false; // Close the dialog after submission
        },
        error: (err) => {
          console.error('Error adding carousel:', err);
          this.messageSvc.add({ severity: 'error', summary: 'Error', detail: 'Failed to add carousel. Please check all fields and try again.' });
        }
      });
    } else {
      this.messageSvc.add({ severity: 'warn', summary: 'Warning', detail: 'Please fill in all required fields.' });
    }
  }

  onFileSelected($event: Event) {
    const input = $event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file && file.type.startsWith('image/')) {
        this.addForm.patchValue({ image: file });
      } else {
        alert('Please select a valid image file.');
        this.addForm.patchValue({ image: null });
      }
    }
  }

  editCarousel(_data: CarouselItem) {
    console.log('Editing Carousel Item:', _data);
    this.addForm.patchValue(_data);
    this.visible = true; // Open the dialog for editing

  }




  // ...existing code...
  carouselUiData$ = this.adminSvc.getCarouseldata$.pipe(
    map((res) => res.data),
    catchError((error) => {
      return of([
        {
          id: 0,
          title: 'Sample Title',
          description: 'Sample Description',
          imageUrl: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
          createdDate: new Date(),
          isActive: true
        }
      ] as CarouselItem[]); // Always return an array
    }),
    tap((data) => {
      console.log('Carousel data loaded:', data);
      this.ProgressBar = false; // Hide progress bar after data is loaded
    }),

  );

  showDialog() {
    this.visible = true;
  }
  carouselItems: CarouselItem[] = [];

  bannerform = this.fb.nonNullable.group({
    id: [],
    title: ['', Validators.required],
    subtitle: ['', Validators.required],
    image: [null as File | null, Validators.required]
  });

  addForm = this.fb.nonNullable.group({
    id: [0],
    title: ['', Validators.required],
    description: ['', Validators.required],
    image: [null as File | null, Validators.required]
  });


  // carouselForm = this.fb.nonNullable.group({
  //   slide: this.fb.nonNullable.array([this.createBanner()
  //   ])
  // });

  // createBanner() {
  //   return this.fb.group({
  //     id: [],
  //     title: ['', Validators.required],
  //     subtitle: ['', Validators.required],
  //     image: [null as File | null]
  //   })
  // }

  // add() {
  //   this.carouselForm.controls.slide.push(this.createBanner());
  // }

  // onFileSelected($event: any, idx: number) {
  //   const file = $event.target.files[0];
  //   console.log(file);
  //   // check file extention and return if not an image and unselect the image
  //   if (file && !file.type.startsWith('image/')) {
  //     alert('Please select a valid image file.');
  //     return;
  //   }
  //   console.log(file);
  //   if (file) {
  //     this.carouselForm.controls.slide.at(idx).patchValue({ image: file });
  //   }
  // }

  // onSubmit() {
  //   console.log(this.carouselForm.controls.slide.value);
  //   const formData = new FormData();
  //   this.carouselForm.controls.slide.value.forEach((item: any, idx: number) => {
  //     formData.append(`carousel[${idx}][title]`, item.title);
  //     formData.append(`carousel[${idx}][subtitle]`, item.subtitle);
  //     if (item.image instanceof File) {
  //       formData.append(`carousel[${idx}][image]`, item.image);
  //     }
  //     // If you have an id for updates:
  //     if (item.id) {
  //       formData.append(`carousel[${idx}][id]`, item.id);
  //     }
  //   })

  //   this.httpsvc.httpPost<any, FormData>(`${environment.ASPNET_API_URL + environment.addcarousel}`, formData).subscribe({
  //     next: (res) => {
  //       console.log('Carousel updated successfully:', res);
  //       alert('Carousel updated successfully!');
  //       this.carouselForm.reset();
  //     }
  //   });
  // }

}

