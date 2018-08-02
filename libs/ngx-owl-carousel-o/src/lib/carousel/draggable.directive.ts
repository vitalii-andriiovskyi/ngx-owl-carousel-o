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

  constructor(private zone: NgZone,
              private el: ElementRef,
              private renderer: Renderer2,
              private carouselService: CarouselService) { }

  @HostListener('mousedown', ['$event']) onMouseDown(event) {
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


}
