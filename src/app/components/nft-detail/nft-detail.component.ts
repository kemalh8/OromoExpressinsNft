import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NftService } from '../../services/nft.service';
import { Nft } from '../../nft';

@Component({
  selector: 'app-nft-detail',
  templateUrl: './nft-detail.component.html',
  styleUrls: ['./nft-detail.component.css']
})
export class NftDetailComponent implements OnInit {
  id?: number;  
  nft?: Nft;
  isLoading?: boolean;


 constructor(private activatedRoute: ActivatedRoute,
            private nftService: NftService){}

    ngOnInit(): void{
      this.isLoading = true;
      this.id = parseInt(<string>this.activatedRoute.snapshot.paramMap.get("id"));

      this.nftService.getOne(this.id).subscribe(data =>{
        this.nft = data;
        this.isLoading = false;
        console.log(data);
      })
    }
}
