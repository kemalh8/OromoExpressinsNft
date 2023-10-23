import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NftComponent } from './components/nft/nft.component';
import { HttpClientModule } from "@angular/common/http";
import { NftDetailComponent } from './components/nft-detail/nft-detail.component';
import { NftAddComponent } from './components/nft-add/nft-add.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';



@NgModule({
  declarations: [
    AppComponent,
    NftComponent,
    NftDetailComponent,
    NftAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
