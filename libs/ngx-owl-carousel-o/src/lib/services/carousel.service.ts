import { Injectable } from '@angular/core';

import { CustomEventsService } from '../services/custom-events.service';

export class States {
  current: {};
  tags: {
    [key: string]: string[];
  };
}
@Injectable({
  providedIn: 'root'
})
export class CarouselService {
  /**
   * Invalidated parts within the update process.
   */
  protected _invalidated: any = {};

  // is needed for tests
  get invalidated() {
    return this._invalidated;
  }
  /**
   * Current state information and their tags.
   * @type ff {Object}
   */
  protected _states: States = {
    current: {},
    tags: {
      initializing: ['busy'],
      animating: ['busy'],
      dragging: ['interacting']
    }
  };

  // is needed for tests
  get states() {
    return this._states;
  }

  constructor(private customEventsCreator: CustomEventsService) { }

  /**
	 * Invalidates the given part of the update routine.
	 * @param [part] - The part to invalidate.
	 * @returns - The invalidated parts.
	 */
  invalidate(part: string): string[] {
		if (typeof part === 'string') {
			this._invalidated[part] = true;
			if(this.is('valid')) { this.leave('valid'); }
		}
		return Object.keys(this._invalidated);
  };

	/**
	 * Checks whether the carousel is in a specific state or not.
	 * @param state - The state to check.
	 * @return} - The flag which indicates if the carousel is busy.
	 */
  is(state: string): boolean {
		return this._states.current[state] && this._states.current[state] > 0;
  };

	/**
	 * Enters a state.
	 * @param name - The state name.
	 */
  enter(name: string) {
    [ name ].concat(this._states.tags[name] || []).forEach((stateName) => {
      if (this._states.current[stateName] === undefined) {
				this._states.current[stateName] = 0;
			}

			this._states.current[stateName]++;
    });
  };

  /**
	 * Leaves a state.
	 * @param name - The state name.
	 */
	leave(name: string) {
    [ name ].concat(this._states.tags[name] || []).forEach((stateName) => {
      if (this._states.current[stateName] === 0 || !!this._states.current[stateName]) {
        this._states.current[stateName]--;
      }
    })
  };

  /**
   * Updates the view.
   * @param workers - list of functions: workers
   */
  update(workers: any[]) {
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

    if (!this.is('valid')) {
      this.enter('valid');
    }
  }

}
