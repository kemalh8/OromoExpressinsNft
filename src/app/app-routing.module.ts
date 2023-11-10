import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NftComponent } from './components/nft/nft.component';
import { NftDetailComponent } from './components/nft-detail/nft-detail.component';
import { NftAddComponent } from './components/nft-add/nft-add.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: 'register', component: RegistrationComponent},
  { path: 'login', component: LoginComponent },
  {path: 'nfts', component: NftComponent},
  {path: 'nfts/add', component: NftAddComponent},
  {path: 'nfts/:id', component: NftDetailComponent},
  { path: 'home', component: HomeComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
