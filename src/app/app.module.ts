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
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardGalleryComponent } from './components/dashboard-gallery/dashboard-gallery.component';



@NgModule({
  declarations: [
    AppComponent,
    NftComponent,
    NftDetailComponent,
    NftAddComponent,
    LoginComponent,
    HeaderComponent,
    RegistrationComponent,
    HomeComponent,
    DashboardGalleryComponent
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
