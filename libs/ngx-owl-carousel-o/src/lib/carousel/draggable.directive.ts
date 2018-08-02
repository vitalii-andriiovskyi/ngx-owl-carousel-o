import { Directive, NgZone, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { CarouselService } from '../services/carousel.service';

@Directive({
  selector: '[owlDraggable]'
})
export class DraggableDirective {
  listenerMouseMove: () => void;
  listenerTouchMove: () => void;
  listenerOneMouseMove: () => void;
  listenerOneTouchMove: () => void;

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

    this.listenerOneMouseMove = this.renderer.listen(document, 'mousemove', (evt) => this._oneMouseTouchMove(evt));
    this.listenerOneTouchMove = this.renderer.listen(document, 'touchmove', (evt) => this._oneMouseTouchMove(evt));

  }

  private _oneMouseTouchMove(event) {
    const delta = this.carouselService.difference(this._drag.pointer, this.carouselService.pointer(event));
    // this.listenerMouseMove = this.renderer.listen(document, 'mousemove', (evt) => this.onDragMove(evt));
    // this.listenerTouchMove = this.renderer.listen(document, 'touchmove', (evt) => this.onDragMove(evt));

    if (Math.abs(delta.x) < Math.abs(delta.y) && this.carouselService.is('valid')) {
      return;
    }

    event.preventDefault();

    this.carouselService.enter('dragging');
    // this.carouselService._trigger('drag');
    this.listenerOneMouseMove();
    this.listenerOneTouchMove();
  }

}
