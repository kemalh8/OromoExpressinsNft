import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nft } from 'src/app/nft';
import { NftService } from 'src/app/services/nft.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-nft-add',
  templateUrl: './nft-add.component.html',
  styleUrls: ['./nft-add.component.css']
})
export class NftAddComponent implements OnInit {
  nftForm: FormGroup;
  isLoading = false;
  showValidationError: boolean = false;
  selectedImage: File | null = null;

  constructor(
    private nftService: NftService,
    private router: Router,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.nftForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
      price: ['', Validators.required],
      createdAt: [null, [Validators.required, this.validateDate]] // Add creationDate control
    });
  }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
    
    // Remove the 'required' error from the imageUrl control
    this.nftForm.get('imageUrl')?.setErrors(null);
  }
  




  submitForm(): void {
    this.isLoading = true;
  
    if (!this.selectedImage) {
      // Handle the case when no image is selected
      this.nftForm.get('imageUrl')?.setErrors({ required: true });
      this.isLoading = false;
      return;
    }
  
    if (this.nftForm.valid) {
      const formData = new FormData();
  
      formData.append('name', this.nftForm.get('name')?.value);
      formData.append('description', this.nftForm.get('description')?.value);
  
      // Format the creationDate as an ISO 8601 string
      const createdAt = new Date(this.nftForm.get('createdAt')?.value).toISOString();
      formData.append('createdAt', createdAt);
  
      formData.append('price', this.nftForm.get('price')?.value.toString());
      formData.append('imageUrl', this.selectedImage, this.selectedImage.name);
  
      // Send the data to the API
      this.nftService.add(formData).subscribe({
        next: (data: Nft) => {
          this.router.navigate(['/nfts']);
          this.isLoading = false;
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error adding NFT:', error);
          if (error instanceof HttpErrorResponse) {
            console.error('HTTP Error Status:', error.status);
            console.error('HTTP Error Message:', error.message);
            console.error('HTTP Error Response:', error.error);
          }
          this.isLoading = false;
        },
      });
    }
  }
  
  

  /////////
  ////////
  ////////
  //////
  /////
  // Helper function to format a Date object as a string
  private formatDate(date: Date): string {
    if (date instanceof Date && !isNaN(date.getTime())) {
      const isoString = date.toISOString();
      return isoString.slice(0, isoString.length - 1);
    } else {
      console.error('Invalid Date object');
      return '';
    }
  }

  // Custom validator for creationDate
  private validateDate(control: AbstractControl): { [key: string]: any } | null {
    const inputDate = new Date(control.value);
    const currentDate = new Date();
    if (inputDate > currentDate) {
      return { futureDate: true };
    }
    return null;
  }
}
