import { Routes } from '@angular/router';

import { PictureUploaderComponent }   from  "./picture/picture-uploader/picture-uploader.component";
import { PictureGalleryComponent }    from  "./picture/picture-gallery/picture-gallery.component";
import { HomeComponent }  from  "./picture/picture-home/picture-home.component";
import { LoginComponent } from  "./picture/picture-login/picture-login.component";


export const ROUTES: Routes = [
  { path: '', component: PictureUploaderComponent },
  { path: 'index', component: HomeComponent },
  { path: 'pictures/:userId', component: PictureUploaderComponent },
  { path: 'pictures', component: PictureUploaderComponent },
  { path: 'gallery/:userId', component: PictureGalleryComponent },
  { path: 'gallery', component: PictureGalleryComponent },
  { path: 'login', component: LoginComponent },
];
