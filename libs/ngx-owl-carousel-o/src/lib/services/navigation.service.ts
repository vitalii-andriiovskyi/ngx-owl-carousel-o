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
	updateNavPages(pages: any[]) {
		if (pages.length) {
      this._pages = pages;
    }
  };

  /**
	 * Draws the user interface.
	 * @todo The option `dotsData` wont work.
   * @param settings current settings of carousel
   * @param items  all items; the result of calling method items() (it's created at CarouselService)
   * @param index the converted position; the result of calling carouselService.relative(carouselService.current())
   * @param minimum number of minimum position; the result of calling carouselService.mimimum(true)
   * @param maximum number of maximum position; the result of calling carouselService.maximum(true)
	 */
  draw(settings: any, items: CarouselSlideDirective[], index: any, minimum: number, maximum: number): { navData: NavData, dotsData: DotsData} {
		let difference;
		const	disabled = items.length <= settings.items,
			loop = settings.loop || settings.rewind;

		this._navData.disabled = !settings.nav || disabled;

		if (settings.nav) {
			this._navData.prev.disabled = !loop && index <= minimum;
			this._navData.next.disabled = !loop && index >= maximum;
		}

		this._dotsData.disabled = !settings.dots || disabled;

		if (settings.dots) {
			difference = this._pages.length - this._dotsData.dots.length;

			if (settings.dotsData && difference !== 0) {
        items.forEach(item => {
          this._dotsData.dots.push({
            active: false,
            id: `dot-${item.id}`,
            innerContent: item.dotContent
          });
        });
			} else if (difference > 0) {
        for (let i = 0; i < difference; i++) {
          this._dotsData.dots.push({
            active: false,
            id: `dot-${i}`,
          });
        }
			} else if (difference < 0) {
        this._dotsData.dots.splice(difference, Math.abs(difference))
			}
    }
    return {
      navData: this._navData,
      dotsData: this._dotsData
    }
  };

  /**
   * changes active dot if page becomes changed
   * @param curActiveSlide The absolute position of the current item; result of calling carouselServive.current();
   */
  updateDots(curActiveSlide: number): { dotsData: DotsData} {
    let curActiveDotI: number;
    this._dotsData.dots.forEach(item => {
      if (item.active === true) {
        item.active = false;
      }
    })
    curActiveDotI = this._pages.indexOf(curActiveSlide);
    this._dotsData.dots[curActiveDotI].active = true;
    return {
      dotsData: this._dotsData
    }
  }

}
