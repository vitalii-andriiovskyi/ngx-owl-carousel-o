import { Injectable } from '@angular/core';

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
   * All DOM elements of the user interface.
   */
  protected _controls: any = {};

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
}
