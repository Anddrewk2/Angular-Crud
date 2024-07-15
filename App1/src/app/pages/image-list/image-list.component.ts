import { Component } from '@angular/core';
import { FormBuilder, FormGroup,  ReactiveFormsModule } from '@angular/forms';
import { ImageService } from '../../services/Image.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent {
  uploadForm: FormGroup;
  images: any[] = [];
  selectedImage: any = null;
  constructor(private fb: FormBuilder, private imageService: ImageService) {
    this.uploadForm = this.fb.group({
      image: [null]
    });
  }

  ngOnInit(): void {
    this.loadImages();
  }

  onPass(image: any): void {
    console.log('Passed:', image);
    // Implement your pass logic here
  }

  onFail(image: any): void {
    console.log('Failed:', image);
    // Implement your fail logic here
  }
  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.patchValue({
        image: file
      });
    }
  }
  openImageModal(image: any) {
    this.selectedImage = image;
  }

  closeImageModal() {
    this.selectedImage = null;
  }
  loadImages(): void {
    this.imageService.getImages().subscribe((b) => {
      this.images = b;
    });
  }
}
