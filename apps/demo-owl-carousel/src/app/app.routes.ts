import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/routes')
  },
  {
    path: 'present',
    loadComponent: () => import('./present/present.component').then(m => m.PresentComponent)
  },
  {
    path: 'doubled-carousel',
    loadComponent: () => import('./doubled-carousel/doubled-carousel.component').then(m => m.DoubledCarouselComponent)
  },
  {
    path: 'gallery-carousel',
    loadComponent: () => import('./gallery/gallery.component').then(m => m.GalleryComponent)
  },
  {
    path: 'link-comp',
    loadComponent: () => import('./link/link.component').then(m => m.LinkComponent)
  }
];
