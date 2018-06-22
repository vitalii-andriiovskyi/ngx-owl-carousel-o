import { Injectable } from '@angular/core';
import { CustomEventsService } from './custom-events.service';
// import { CarouselComponent } from '../carousel/carousel.module';

export class Defaults {
  autoRefresh?: boolean;
  autoRefreshInterval?: number;
}
/**
	 * Creates the auto refresh plugin.
	 * @class The Auto Refresh Plugin
	 */
@Injectable({
  providedIn: 'root'
})
export class AutorefresherService {
  /**
   * Reference to the core.
   */
  protected _core: any;

  get core() {
    return this._core;
  }
  set core(param: any) {
    this._core = param;
  }

  /**
   * Refresh interval.
   */
	protected _interval: number | null = null;

  /**
   * Whether the element is currently visible or not.
   */
  protected _visible: boolean | null = null;

  /**
   * All event handlers.
   */
  protected _handlers: {} = {
    'initialized.owl.carousel': (e) => {
      if (e.namespace && this.core.settings.autoRefresh) {
        this.watch();
      }
    }
  };

  /**
	 * Default options.
	 */
	defaults: Defaults = {
		autoRefresh: true,
		autoRefreshInterval: 500
	};

  constructor(private customEventsCreator: CustomEventsService) {
    // set default options
    this.core.options = Object.assign({}, this.defaults, this.core.options);

    // register event handlers
    for (const key in this._handlers) {
      if (this._handlers.hasOwnProperty(key)) {
        const eventsList = key.split(' ');
        eventsList.forEach((item) => {
          this.customEventsCreator.listen(item, this._handlers[key]);
        });
      }
    }
  }

  /**
	 * Watches the element.
	 */
	watch() {
		if (this._interval) {
			return;
		}
    
    // ???????????????????????????
		this._visible = this._core.owlVisible;
		this._interval = setInterval(this.refresh, this.core.settings.autoRefreshInterval);
	};

	/**
	 * Refreshes the element.
	 */
	refresh() {
		if (this._core.owlVisible === this._visible) {
			return;
		}

    this._visible = !this._visible;
    // ???????????????????????????
    this._core.owlVisible = false;

    if (this._visible) {
      if (this._core.invalidate('width')) {
        this._core.refresh();
      }
    }
	};

	/**
	 * Destroys the plugin.
	 */
	destroy() {
		let handler;

		clearInterval(this._interval);

    for (handler in this._handlers) {
      if (this._handlers.hasOwnProperty(handler)) {
        const eventsList = handler.split(' ');
        eventsList.forEach((item) => {
          this.customEventsCreator.off(handler, this._handlers[handler]);
        });
      }
    }
		// for (property in Object.getOwnPropertyNames(this)) {
		// 	typeof this[property] != 'function' && (this[property] = null);
		// }
  };

}

