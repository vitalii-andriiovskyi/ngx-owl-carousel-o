import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { CarouselService } from './carousel.service';

@Injectable({
  providedIn: 'root'
})
export class AutoplayService {
  /**
   * Subscrioption to merge Observables from CarouselService
   */
  autoplaySubscription: Subscription;

  /**
   * The autoplay timeout.
   */
  private _timeout: number = null;

  /**
   * Indicates whenever the autoplay is paused.
   */
  private _paused = false;

  constructor(private carouselService: CarouselService) { }
}
