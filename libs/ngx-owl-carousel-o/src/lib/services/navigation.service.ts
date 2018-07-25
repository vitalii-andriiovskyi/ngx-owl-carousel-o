import { Injectable } from '@angular/core';
import { NavData, DotsData } from '../models/navigation-data.models';
import { CarouselSlideDirective } from '../carousel/carousel.module';
import { CarouselService } from './carousel.service';
import { Subscription } from '../../../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  /**
   * subscrioption to initSubject from CarouselService
   */
  initSubscription: Subscription;

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

  constructor(private carouselService: CarouselService) {
    this.catchInitialization();
  }

  catchInitialization() {
    this.initSubscription = this.carouselService.getInitSubject().subscribe(
      () => {
        this.initialize();
        this._updateNavPages();
        this.draw();
        this.updateDots();
        this.carouselService.sendChanges();
      }
    );
  }

  /**
	 * Initializes the layout of the plugin and extends the carousel.
	 */
	initialize() {
    this._navData.disabled = true;
    this._navData.prev.htmlText = this.carouselService.settings.navText[0];
    this._navData.next.htmlText = this.carouselService.settings.navText[1];

    this._dotsData.disabled = true;

    this.carouselService.navData = this._navData;
    this.carouselService.dotsData = this._dotsData;
  }

  /**
   * calculates the internal state and updates prop _pages
   */
	private _updateNavPages() {
		let i, j, k;
		const lower = this.carouselService.clones().length / 2,
      upper = lower + this.carouselService.items().length,
      maximum = this.carouselService.maximum(true),
      pages = [],
      settings = this.carouselService.settings,
      size = settings.center || settings.autoWidth || settings.dotsData
        ? 1 : settings.dotsEach || settings.items;

		if (settings.slideBy !== 'page') {
			settings.slideBy = Math.min(settings.slideBy, settings.items);
		}

		if (settings.dots || settings.slideBy === 'page') {

			for (i = lower, j = 0, k = 0; i < upper; i++) {
				if (j >= size || j === 0) {
					pages.push({
						start: Math.min(maximum, i - lower),
						end: i - lower + size - 1
					});
					if (Math.min(maximum, i - lower) === maximum) {
						break;
					}
					j = 0, ++k;
				}
				j += this.carouselService.mergers(this.carouselService.relative(i));
			}
		}
		this._pages = pages;
	}

  /**
	 * Draws the user interface.
	 * @todo The option `dotsData` wont work.
	 */
  draw() {
		let difference;
    const	settings = this.carouselService.settings,
      items = this.carouselService.items(),
      disabled = items.length <= settings.items,
      loop = settings.loop || settings.rewind,
      index = this.carouselService.relative(this.carouselService.current());

		this._navData.disabled = !settings.nav || disabled;

		if (settings.nav) {
			this._navData.prev.disabled = !loop && index <= this.carouselService.minimum(true);
			this._navData.next.disabled = !loop && index >= this.carouselService.maximum(true);
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

    this.carouselService.navData = this._navData;
    this.carouselService.dotsData = this._dotsData;
  };

  /**
   * changes active dot if page becomes changed
   */
  updateDots() {
    let curActiveDotI: number;
    this._dotsData.dots.forEach(item => {
      if (item.active === true) {
        item.active = false;
      }
    })

    curActiveDotI = this._current();
    this._dotsData.dots[curActiveDotI].active = true;
    this.carouselService.dotsData = this._dotsData;
  }

  /**
	 * Gets the current page position of the carousel.
	 * @returns the current page position of the carousel
	 */
	private _current(): any {
		const current = this.carouselService.relative(this.carouselService.current());
		return this._pages.findIndex(page => {
      return page.start <= current && page.end >= current;
    });
	};

}
