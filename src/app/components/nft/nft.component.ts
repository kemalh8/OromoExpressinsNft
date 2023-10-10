import { Component, OnInit } from '@angular/core';
import { Nft } from '../../nft';
import { NftService } from 'src/app/services/nft.service';

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.css']
})
export class NftComponent implements OnInit {
  nfts: Nft[] = []; 
  isLoading: boolean = false;

  constructor(private nftService: NftService) {}

  // quand la page est chargé, je vais lui demander d'aller chercher mes données
  ngOnInit(): void {
     this.isLoading = true;
     this.nftService.getAll().subscribe(data => {
       console.log(data);
     this.nfts = data;
       console.log(this.nfts);
     this.isLoading = false;
    }) 
  }
}
