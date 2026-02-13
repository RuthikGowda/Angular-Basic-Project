export interface CarouselItem {
  id: number;
  imageUrl: string;
  title: string;
  description: string; 
  isActive: boolean;
  createdDate: Date; 
}

export interface CarouselUpload{
  title: string;
  description: string;
  image: File | null;
}

export interface ProductCategoryItem{
  id: number;
  title :  string;
  description : string;
  ImageUrl : string;
}