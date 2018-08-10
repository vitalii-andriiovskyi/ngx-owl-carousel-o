import { Injectable } from '@angular/core';
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
    'initialized.owl.carousel': e => {
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

  constructor() {
    // set default options
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
    this._interval = setInterval(
      this.refresh,
      this.core.settings.autoRefreshInterval
    );
  }

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
  }

}
