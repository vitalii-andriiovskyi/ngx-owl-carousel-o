import { Directive, NgZone, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { CarouselService } from '../services/carousel.service';

@Directive({
  selector: '[owlDraggable]'
})
export class DraggableDirective {
  /**
   * Function wich will be returned after attaching listener to 'mousemove' event
   */
  listenerMouseMove: () => void;
  /**
   * Function wich will be returned after attaching listener to 'touchmove' event
   */
  listenerTouchMove: () => void;
  /**
   * Function wich will be returned after attaching listener to 'mousemove' event
   */
  listenerOneMouseMove: () => void;
  /**
   * Function wich will be returned after attaching listener to 'touchmove' event
   */
  listenerOneTouchMove: () => void;

  /**
   * Object with data needed for dragging
   */
  private _drag: any = {
    stage: {}
  };

  constructor(private zone: NgZone,
              private el: ElementRef,
              private renderer: Renderer2,
              private carouselService: CarouselService) { }

  @HostListener('mousedown', ['$event']) onMouseDown(event) {
    this._onDragStart(event);
    return false;
  }

  @HostListener('mouseup', ['$event']) onMouseUp(event) {
    return false;
  }

  @HostListener('touchstart', ['$event']) onTouchStart(event) {
    this._onDragStart(event);
    return false;
  }

  @HostListener('touchcancel', ['$event']) onTouchCancel(event) {
    return false;
  }

  @HostListener('touchend', ['$event']) onTouchEnd(event) {
    return false;
  }

  @HostListener('dragstart') onDragStart() {
    return false;
  }

  @HostListener('selectstart') onSelectStart() {
    return false;
  }

  /**
   * Passes this to _oneMouseTouchMove();
   */
  bindOneMouseTouchMove = (ev) => {
    this._oneMouseTouchMove(ev);
  }

  /**
   * Passes this to _onDragMove();
   */
  bindOnDragMove = (ev) => {
    this._onDragMove(ev);
  }

  /**
	 * Handles `touchstart` and `mousedown` events.
	 * @todo Horizontal swipe threshold as option
	 * @todo #261
	 * @param event - The event arguments.
	 */
	private _onDragStart(event): any {
		let stage = null;

		if (event.which === 3) {
			return;
		}


    // could be 5 commented lines below; However we have stage transform in stageData and in updates after each move of stage
    // stage = getComputedStyle(this.el.nativeElement).transform.replace(/.*\(|\)| /g, '').split(',');
    // stage = {
    //   x: stage[stage.length === 16 ? 12 : 4],
    //   y: stage[stage.length === 16 ? 13 : 5]
    // };

    stage = this.carouselService.stageData.transform.replace(/.*\(|\)| |[^,-\d]\w|\)/g, '').split(',');
    stage = {
      x: +stage[0],
      y: +stage[1]
    };

		if (this.carouselService.is('animating')) {
			this.carouselService.animate(stage.x);
			this.carouselService.invalidate('position');
    }

    if (event.type === 'mousedown') {
      this.carouselService.owlDOMData.isGrab = true;
    }

		this.carouselService.speed(0);

		this._drag.time = new Date().getTime();
		this._drag.target = event.target;
		this._drag.stage.start = stage;
		this._drag.stage.current = stage;
    this._drag.pointer = this.carouselService.pointer(event);

    this.zone.runOutsideAngular(() => {
      this.listenerOneMouseMove = this.renderer.listen(document, 'mousemove', this.bindOneMouseTouchMove);
      this.listenerOneTouchMove = this.renderer.listen(document, 'touchmove', this.bindOneMouseTouchMove);
    });

  }

  /**
   * Attaches listeners to `touchmove` and `mousemove` events; initiates updating carousel after starting dragging
   * @param event event objech of mouse or touch event
   */
  private _oneMouseTouchMove(event) {
    const delta = this.carouselService.difference(this._drag.pointer, this.carouselService.pointer(event));
    this.listenerMouseMove = this.renderer.listen(document, 'mousemove', this.bindOnDragMove);
    this.listenerTouchMove = this.renderer.listen(document, 'touchmove', this.bindOnDragMove);
    if (Math.abs(delta.x) < Math.abs(delta.y) && this.carouselService.is('valid')) {
      return;
    }

    event.preventDefault();

    this.carouselService.enter('dragging');
    // this.carouselService._trigger('drag');
    this.carouselService.sendChanges();
    this.listenerOneMouseMove();
    this.listenerOneTouchMove();
  }

  	/**
	 * Handles the `touchmove` and `mousemove` events.
	 * @todo #261
	 * @param event - The event arguments.
	 */
	private _onDragMove(event) {
		let minimum = null,
			maximum = null,
			pull = null;
		const	delta = this.carouselService.difference(this._drag.pointer, this.carouselService.pointer(event)),
			stage = this.carouselService.difference(this._drag.stage.start, delta);

		if (!this.carouselService.is('dragging')) {
			return;
		}

		event.preventDefault();

		if (this.carouselService.settings.loop) {
			minimum = this.carouselService.coordinates(this.carouselService.minimum());
			maximum = +this.carouselService.coordinates(this.carouselService.maximum() + 1) - minimum;
			stage.x = (((stage.x - minimum) % maximum + maximum) % maximum) + minimum;
		} else {
			minimum = this.carouselService.settings.rtl ? this.carouselService.coordinates(this.carouselService.maximum()) : this.carouselService.coordinates(this.carouselService.minimum());
			maximum = this.carouselService.settings.rtl ? this.carouselService.coordinates(this.carouselService.minimum()) : this.carouselService.coordinates(this.carouselService.maximum());
			pull = this.carouselService.settings.pullDrag ? -1 * delta.x / 5 : 0;
			stage.x = Math.max(Math.min(stage.x, minimum + pull), maximum + pull);
		}

		this._drag.stage.current = stage;
		this._animate(stage.x);
  };

  /**
   * Moves .owl-stage left-right
   * @param coordinate coordinate to be set to .owl-stage
   */
  private _animate(coordinate: number) {
    this.renderer.setStyle(this.el.nativeElement, 'transform', `translate3d(${coordinate}px,0px,0px`);
    this.renderer.setStyle(this.el.nativeElement, 'transition', '0s');
  }

}
