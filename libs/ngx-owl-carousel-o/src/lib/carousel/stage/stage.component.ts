import { Component, NgZone, ElementRef, HostListener, Renderer2, OnInit, OnDestroy, Input } from '@angular/core';
import { CarouselService, Coords } from '../../services/carousel.service';
import { Subject, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { StageData } from '../../models/stage-data.model';
import { SlideModel } from '../../models/slide.model';
import { AnimateService } from '../../services/animate.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
@Component({
  selector: 'owl-stage',
  template: `
    <div>
      <div class="owl-stage" [ngStyle]="{'width': stageData.width + 'px',
                                        'transform': stageData.transform,
                                        'transition': stageData.transition,
                                        'padding-left': stageData.paddingL ? stageData.paddingL + 'px' : '',
                                        'padding-right': stageData.paddingR ? stageData.paddingR + 'px' : '' }"
          (transitionend)="onTransitionEnd()">
        <ng-container *ngFor="let slide of slidesData; let i = index">
          <div class="owl-item" [ngClass]="slide.classes"
                                [ngStyle]="{'width': slide.width + 'px',
                                            'margin-left': slide.marginL ? slide.marginL + 'px' : '',
                                            'margin-right': slide.marginR ? slide.marginR + 'px' : '',
                                            'left': slide.left}"
                                (animationend)="clear(slide.id)"
                                [@autoHeight]="slide.heightState">
            <ng-template *ngIf="slide.load" [ngTemplateOutlet]="slide.tplRef" [ngTemplateOutletContext]="{ $implicit: preparePublicSlide(slide), index: i }"></ng-template>
          </div><!-- /.owl-item -->
        </ng-container>
      </div><!-- /.owl-stage -->
    </div>
  `,
  animations: [
    trigger('autoHeight', [
      state('nulled', style({height: 0})),
      state('full', style({height: '*'})),
      transition('full => nulled', [
        // style({height: '*'}),
        animate('700ms 350ms')
      ]),
      transition('nulled => full', [
        // style({height: 0}),
        animate(350)
      ]),
    ])
  ]
})
export class StageComponent implements OnInit, OnDestroy {
  /**
   * Object with settings which make carousel draggable by touch or mouse
   */
  @Input() owlDraggable: {
    isMouseDragable: boolean,
    isTouchDragable: boolean
  };

  /**
   * Data of owl-stage
   */
  @Input() stageData: StageData;

	/**
	 *  Data of every slide
	 */
  @Input() slidesData: SlideModel[];

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
   * Function wich will be returned after attaching listener to 'mouseup' event
   */
  listenerMouseUp: () => void;
  /**
   * Function wich will be returned after attaching listener to 'touchend' event
   */
  listenerTouchEnd: () => void;

  /**
   * Function wich will be returned after attaching listener to 'click' event
   */
  listenerOneClick: () => void;

  listenerATag: () => void;

  /**
   * Object with data needed for dragging
   */
  private _drag: any = {
    time: null,
    target: null,
    pointer: null,
    stage: {
      start: null,
      current: null
    },
    direction: null,
    active: false,
    moving: false
  };

  /**
   * Subject for notification when the carousel's rebuilding caused by resize event starts
   */
  private _oneDragMove$ = new Subject<any>();

  /**
   * Subsctiption to _oneDragMove$ Subject
   */
  private _oneMoveSubsription: Subscription;

  preparePublicSlide = (slide: SlideModel): SlideModel => {
    const newSlide = { ...slide };
    delete newSlide.tplRef;
    return newSlide;
  }

  constructor(private zone: NgZone,
              private el: ElementRef,
              private renderer: Renderer2,
              private carouselService: CarouselService,
              private animateService: AnimateService) { }

  @HostListener('mousedown', ['$event']) onMouseDown(event) {
    if (this.owlDraggable.isMouseDragable) {
      this._onDragStart(event);
    }
  }

  @HostListener('touchstart', ['$event']) onTouchStart(event) {
    if (event.targetTouches.length >= 2) {
      return false;
    }
    if (this.owlDraggable.isTouchDragable) {
      this._onDragStart(event);
    }
  }

  @HostListener('touchcancel', ['$event']) onTouchCancel(event) {
    this._onDragEnd(event);
  }

  @HostListener('dragstart') onDragStart() {
    if (this.owlDraggable.isMouseDragable) {
      return false;
    }
  }

  @HostListener('selectstart') onSelectStart() {
    if (this.owlDraggable.isMouseDragable) {
      return false;
    }
  }

  ngOnInit() {
    this._oneMoveSubsription = this._oneDragMove$
      .pipe(first())
      .subscribe(() => {
        this._sendChanges();
      });
  }

  ngOnDestroy() {
    this._oneMoveSubsription.unsubscribe();
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
   * Passes this to _onDragMove();
   */
  bindOnDragEnd = (ev) => {
    // this.zone.run(() => {
      this._onDragEnd(ev);
    // });
  }

  /**
	 * Handles `touchstart` and `mousedown` events.
	 * @todo Horizontal swipe threshold as option
	 * @todo #261
	 * @param event - The event arguments.
	 */
	private _onDragStart(event): any {
		let stage: Coords = null;

		if (event.which === 3) {
			return;
    }

    stage = this._prepareDragging(event);

		this._drag.time = new Date().getTime();
		this._drag.target = event.target;
		this._drag.stage.start = stage;
		this._drag.stage.current = stage;
    this._drag.pointer = this._pointer(event);

    this.listenerMouseUp = this.renderer.listen(document, 'mouseup', this.bindOnDragEnd);
    this.listenerTouchEnd = this.renderer.listen(document, 'touchend', this.bindOnDragEnd);

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
    const delta = this._difference(this._drag.pointer, this._pointer(event));
    if (this.listenerATag) {
      this.listenerATag();
    }
    if ( Math.abs(delta.x) < 3 && Math.abs(delta.y) < 3 && this._is('valid')) {
      return;
    }

    if ((Math.abs(delta.x) < 3 && Math.abs(delta.x) < Math.abs(delta.y)) && this._is('valid')) {
      return;
    }
    this.listenerOneMouseMove();
    this.listenerOneTouchMove();
    this._drag.moving = true;

    this.blockClickAnchorInDragging(event);

    this.listenerMouseMove = this.renderer.listen(document, 'mousemove', this.bindOnDragMove);
    this.listenerTouchMove = this.renderer.listen(document, 'touchmove', this.bindOnDragMove);

    event.preventDefault();

    this._enterDragging();
    this._oneDragMove$.next(event);
    // this._sendChanges();
  }

  /**
   * Attaches handler to HTMLAnchorElement for preventing click while carousel is being dragged
   * @param event event object
   */
  private blockClickAnchorInDragging(event: any) {
    let target: HTMLElement | null = event.target;
    while (target && !(target instanceof HTMLAnchorElement)) {
      target = target.parentElement;
    }
    if (target instanceof HTMLAnchorElement) {
      this.listenerATag = this.renderer.listen(target, 'click', () => false);
    }
  }

  	/**
	 * Handles the `touchmove` and `mousemove` events.
	 * @todo #261
	 * @param event - The event arguments.
	 */
	private _onDragMove(event) {
    let stage: Coords;
    const stageOrExit: boolean | Coords = this.carouselService.defineNewCoordsDrag(event, this._drag);

    if (stageOrExit === false) {
      return;
    }
    stage = stageOrExit as Coords;

		event.preventDefault();

    this._drag.stage.current = stage;
		this._animate(stage.x - this._drag.stage.start.x);
  };

  /**
   * Moves .owl-stage left-right
   * @param coordinate coordinate to be set to .owl-stage
   */
  private _animate(coordinate: number) {
    this.renderer.setStyle(this.el.nativeElement.children[0], 'transform', `translate3d(${coordinate}px,0px,0px`);
    this.renderer.setStyle(this.el.nativeElement.children[0], 'transition', '0s');
  }

  /**
	 * Handles the `touchend` and `mouseup` events.
	 * @todo #261
	 * @todo Threshold for click event
	 * @param event - The event arguments.
	 */
	private _onDragEnd(event) {
    this.carouselService.owlDOMData.isGrab = false;
    this.listenerOneMouseMove();
    this.listenerOneTouchMove();

    if (this._drag.moving) {
      this.renderer.setStyle(this.el.nativeElement.children[0], 'transform', ``);
      this.renderer.setStyle(this.el.nativeElement.children[0], 'transition', this.carouselService.speed(+this.carouselService.settings.dragEndSpeed || this.carouselService.settings.smartSpeed)/1000 +'s');

      this._finishDragging(event);
      this.listenerMouseMove();
      this.listenerTouchMove();
    }

    this._drag = {
      time: null,
      target: null,
      pointer: null,
      stage: {
        start: null,
        current: null
      },
      direction: null,
      active: false,
      moving: false
    };

    // this.carouselService.trigger('dragged');
    this.listenerMouseUp();
    this.listenerTouchEnd();
  };

  /**
	 * Prepares data for dragging carousel. It starts after firing `touchstart` and `mousedown` events.
	 * @param event - The event arguments.
	 * @returns stage - object with 'x' and 'y' coordinates of .owl-stage
	 */
  private _prepareDragging(event: any): Coords {
    return this.carouselService.prepareDragging(event);
  }

  /**
   * Attaches handler for 'click' event on any element in .owl-stage in order to prevent dragging when moving of cursor is less than 3px
   */
  private _oneClickHandler = () => {
    this.listenerOneClick = this.renderer.listen(this._drag.target, 'click', () => false)
    this.listenerOneClick();
  }

  /**
   * Finishes dragging
   * @param event object event of 'mouseUp' of 'touchend' events
   */
  private _finishDragging(event: any) {
    this.carouselService.finishDragging(event, this._drag, this._oneClickHandler);
  }

  /**
	 * Gets unified pointer coordinates from event.
	 * @param event The `mousedown` or `touchstart` event.
	 * @returns Contains `x` and `y` coordinates of current pointer position.
	 */
  private _pointer(event: any): any {
    return this.carouselService.pointer(event);
  }

  /**
	 * Gets the difference of two vectors.
	 * @param first The first vector.
	 * @param second The second vector.
	 * @returns The difference.
	 */
  private _difference(first: Coords | null, second: Coords | null): any {
    if (null === first || null === second) {
      return {
        x: 0,
        y: 0,
      };
    }

    return this.carouselService.difference(first, second);
  }

  /**
	 * Checks whether the carousel is in a specific state or not.
	 * @param specificState The state to check.
	 * @returns The flag which indicates if the carousel is busy.
	 */
  private _is(specificState: string): boolean {
    return this.carouselService.is(specificState);
  }

  /**
  * Enters a state.
  * @param name The state name.
  */
  private _enter(name: string) {
    this.carouselService.enter(name);
  }

  /**
	 * Sends all data needed for View.
	 */
  private _sendChanges() {
    this.carouselService.sendChanges();
  }

  /**
   * Handler for transitioend event
   */
  onTransitionEnd() {
    this.carouselService.onTransitionEnd();
  }

  /**
	 * Enters into a 'dragging' state
	 */
  private _enterDragging() {
    this.carouselService.enterDragging();
  }

  /**
   * Handles the end of 'animationend' event
   * @param id Id of slides
   */
  clear(id) {
    this.animateService.clear(id);
  }
}
