import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core'; // Import ElementRef
import { Router } from '@angular/router';
import { Nft } from 'src/app/nft';
import { NftService } from 'src/app/services/nft.service';

@Component({
  selector: 'app-nft-add',
  templateUrl: './nft-add.component.html',
  styleUrls: ['./nft-add.component.css']
})
export class NftAddComponent implements OnInit, AfterViewInit {
  nft: Nft = new Nft();
  isLoading = false;
  showValidationError: boolean = false;
  
  @ViewChild('form', { static: false }) form!: NgForm;
  @ViewChild('imageUrlInput', { static: false }) imageUrlInput!: ElementRef<HTMLInputElement>;

  constructor(
    private nftService: NftService,
    private router: Router,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    // Adding console.log to check the initial state of the form and variables
    console.log('Initial form value:', this.form.value);
    console.log('Initial nft:', this.nft);
  }
  
  
  ngAfterViewInit(): void {
    // Checking if the 'imageUrlInput' is available after the view has been initialized
    if (!this.imageUrlInput) {
      console.error('Image input element not found.');
      return;
    }
  }

  submitForm(): void {
    this.isLoading = true;
  
    // To check if the form is valid
    if (!this.form || !this.form.valid) {
      // Handling form validation error
      console.error('Form validation failed.');
      this.isLoading = false;
      this.showValidationError = true;
      return;
    }
  
    // Log the 'imageUrl' just before creating formData
    console.log('nft.imageUrl:', this.nft.imageUrl);
  
    // Create a FormData object to handle file uploads
    const formData = new FormData();
  
    // Append other form fields if they are defined
    if (this.nft.name !== undefined) {
      formData.append('name', this.nft.name);
    }
  
    if (this.nft.description !== undefined) {
      formData.append('description', this.nft.description);
    }
  
    if (this.nft.creationDate !== undefined) {
      formData.append('creationDate', this.nft.creationDate.toString());
    }
  
    // Access the file input element and its selected file
    const selectedFile = this.imageUrlInput?.nativeElement?.files?.[0];
  
    // Check if a file is selected
    if (!selectedFile) {
      console.error('No file selected.');
      this.isLoading = false;
      return;
    }
  
    formData.append('imageUrl', selectedFile);
  
    // Use HttpClient to make the POST request with FormData
    this.nftService.add(this.nft, formData).subscribe({
      next: (data: Nft) => {
        // Handle the response here, if needed
        this.router.navigate(['/nfts']);
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error:', error);
        this.isLoading = false;
      },
    });
  }
}
