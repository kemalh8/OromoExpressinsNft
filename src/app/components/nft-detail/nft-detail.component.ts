import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NftService } from '../../services/nft.service';
import { Nft } from '../../nft';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-nft-detail',
  templateUrl: './nft-detail.component.html',
  styleUrls: ['./nft-detail.component.css']
})
export class NftDetailComponent implements OnInit {
  id?: number;  
  nft?: Nft;
  isLoading?: boolean;

  updateMethod: 'PUT' | 'PATCH' = 'PUT'; 
  editMode: boolean = false; 




 constructor(private activatedRoute: ActivatedRoute,
            private nftService: NftService,
            private router: Router){}

    ngOnInit(): void{
      this.isLoading = true;
      this.id = parseInt(<string>this.activatedRoute.snapshot.paramMap.get("id"));

      this.nftService.getOne(this.id).subscribe(data =>{
        this.nft = data;
        this.isLoading = false;
        console.log(data);
      })
    }

   deleteNft(id?: number): void{
    this.isLoading = true;
    if(id){
      this.nftService.remove(id).subscribe(data =>{
        this.ngOnInit();
        this.router.navigate(['/nfts']);
        this.isLoading = false;

      })
    }
    
  }

  /*
  updateNft(): void {
    this.isLoading = true;
  
    if (this.id === undefined || this.nft === undefined) {
      // i have to Handle the case where id or nft is undefined
      console.error('ID or NFT is undefined');
      return;
    }
  
    const updateObservable = this.updateMethod === 'PUT'
      ? this.nftService.updatePut(this.id, this.nft)
      : this.nftService.updatePatch(this.id, this.nft);
  
    updateObservable.subscribe(updatedNft => {
      this.nft = updatedNft;
      this.isLoading = false;
      this.editMode = false; 
    });
  }
  
    */
}
