import { Injectable } from '@angular/core';
import { NavData, DotsData } from '../models/navigation-data.models';
import { CarouselSlideDirective } from '../carousel/carousel.module';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  /**
   * Indicates whether the plugin is initialized or not.
   */
  protected _initialized = false;

  /**
   * The current paging indexes.
   */
  protected _pages: any[] = [];

  /**
   * Navigation elements of the user interface.
   */
  protected _navData: NavData = {
    disabled: false,
    prev: {
      disabled: false,
      htmlText: ''
    },
    next: {
      disabled: false,
      htmlText: ''
    },
  };

  /**
   * dot elements of the user interface.
   */
  protected _dotsData: DotsData = {
    disabled: false,
    dots: []
  };

  /**
   * Markup for an indicator.
   */
  protected _templates: string[] = [];

  /**
   * Overridden methods of the carousel.
   */
  // protected _overrides = {
  //   next: this._core.next,
  //   prev: this._core.prev,
  //   to: this._core.to
  // };

  constructor() { }

  /**
	 * Initializes the layout of the plugin and extends the carousel.
   * @param settings current settings of carousel
	 */
	initialize(settings: any): { navData: NavData, dotsData: DotsData} {
    this._navData.disabled = true;
    this._navData.prev.htmlText = settings.navText[0];
    this._navData.next.htmlText = settings.navText[1];

    this._dotsData.disabled = true;
    return {
      navData: this._navData,
      dotsData: this._dotsData
    }
  }

  /**
   * Updates the internal state.
   * @param pages array containing start and end of each page. Start and end are number of slides in this._items
   */
	update(pages: any[]) {
		if (pages.length) {
      this._pages = pages;
    }
  };

}
