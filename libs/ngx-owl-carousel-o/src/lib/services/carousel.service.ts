import { Injectable } from '@angular/core';

import { CustomEventsService } from '../services/custom-events.service';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {
  /**
   * Invalidated parts within the update process.
   */
  protected _invalidated: any = {};

  constructor(private customEventsCreator: CustomEventsService) { }

  /**
   * Updates the view.
   */
  update(workers) {
    let i = 0;
    const n = workers.length,
      filter = item => this._invalidated[item],
      cache = {};

    while (i < n) {
      const filteredPipe = workers[i].filter.filter(filter);
      if (this._invalidated.all || filteredPipe.length > 0) {
        workers[i].run(cache);
      }
      i++;
    }

    this._invalidated = {};

    // if (!this.is('valid')) {
    //   this.enter('valid');
    // }
  }
}
