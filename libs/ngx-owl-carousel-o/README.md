# ngx-owl-carousel-o

**ngx-owl-carousel-o** is built for Angular >=6.0.0. It doesn't use jQuery.

## Compatibility

ngx-owl-carousel-o      | Angular
------------------------|--------
14.x.x                  | 14.x.x
7.x.x  (latest `7.0.4`) | 13.x.x
6.x.x  (latest `6.0.2`) | 12.x.x
5.x.x  (latest `5.1.1`) | 11.x.x
4.x.x  (latest `4.1.1`) | 10.x.x
3.x.x  (latest `3.1.1`) | 9.x.x
2.x.x  (latest `2.1.1`) | 8.x.x
1.x.x  (latest `1.2.1`) | 7.x.x
0.x.x  (latest `0.1.2`) | 6.x.x

[CHANGELOG](https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o/blob/develop/CHANGELOG.md)

## Table of Contents

- [Get started](#get-started)
- [Setting custom slides ids](#setting-custom-slides-ids)
- [Options](#options)
- [How to refresh the carousel if options change](#refreshing-the-carousel-if-options-change)
- [Tag `<a>` in the slide. Directive `owlRouterLink`](#owlRouterLink)
- [Events](#events)
- [Plugins](#plugins)
- [Tips](#tips)
- [ReferenceError: Event is not defined](#referenceError-event-is-not-defined)
- [Using `ngx-owl-carousel-o` slide data in custom code](#using-internal-slide-data)
- [Issue: `autoplay` doesnt stay paused when user opens `mat-menu`](#issue-autoplay-doesnt-stay-paused-when-user-opens-mat-menu)

## Get started

1. Run `yarn add ngx-owl-carousel-o` or `npm install ngx-owl-carousel-o` or `ng add ngx-owl-carousel-o`.
2. Add styles (one of these variants).

    -  `angular.json`:

        ```json
        "styles": [
            "node_modules/ngx-owl-carousel-o/lib/styles/prebuilt-themes/owl.carousel.min.css",
            "node_modules/ngx-owl-carousel-o/lib/styles/prebuilt-themes/owl.theme.default.min.css",
            "src/styles.sass" or "src/styles.css"
          ],
        ```

    - `src/styles.sass` or `src/styles.scss`:

        ```sass
        @import '~ngx-owl-carousel-o/lib/styles/scss/owl.carousel';
        @import '~ngx-owl-carousel-o/lib/styles/scss/owl.theme.default';
        ```

3. Import `RouterModule` and `Routes` into `AppModule` unless they are imported.
4. Import `BrowserAnimationsModule` into `AppModule`  unless it is imported.
5. Import `CarouselModule` into a module which declares a component intended to have a carousel.

    ```typescript
    import { CarouselModule } from 'ngx-owl-carousel-o';
    @NgModule({
      imports: [ CarouselModule ],
      declarations: [ CarouselHolderComponent ]
    })
    export class SomeModule { }
    ```

6. Add to needed component `customOptions` or named in different way object with options for the carousel:

    ```typescript
    import { OwlOptions } from 'ngx-owl-carousel-o';
    @Component({
      selector: '....',
      templateUrl: 'carousel-holder.component.html'
    })
    export class CarouselHolderComponent {
      customOptions: OwlOptions = {
        loop: true,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        dots: false,
        navSpeed: 700,
        navText: ['', ''],
        responsive: {
          0: {
            items: 1
          },
          400: {
            items: 2
          },
          740: {
            items: 3
          },
          940: {
            items: 4
          }
        },
        nav: true
      }
    }
    ```

7. Add html-markup to the template of the component (in this case, add it to `carousel-holder.component.html`):

    ```html
      <div>Some tags before</div>
      <owl-carousel-o [options]="customOptions">
        <ng-template carouselSlide>Slide 1</ng-template>  
        <ng-template carouselSlide>Slide 2</ng-template>  
        <ng-template carouselSlide>Slide 3</ng-template>  
      </owl-carousel-o>
      <div>Some tags after</div>
    ```

    or

    ```html
      <div>Some tags before</div>
      <owl-carousel-o [options]="customOptions">

        <ng-container *ngFor="let slide of slidesStore">
          <ng-template carouselSlide [id]="slide.id">
            <img [src]="slide.src" [alt]="slide.alt" [title]="slide.title">
          </ng-template>
        </ng-container>

      </owl-carousel-o>
      <div>Some tags after</div>
    ```

**NOTE**: Each slide has an `id`. If it isn't supplied like in the first example given to p. 7, the code generates it automatically and expose one when the event `translated` fires. Info about this event is below. Follow the link [event `translated`](#translated).

**NOTE**: Custom `id` must have the type `string`.

**NOTE**: Using **ngx-owl-carousel-o** with options `animateOut` and `animateIn` requires adding `animate.css`. Steps are the following:

1. `yarn add animate.css` or `npm install animate.css`.
2. Add styles to `angular.json`:

    ```json
    "styles": [
        "node_modules/animate.css/animate.min.css"
      ],
    ```

## Setting custom slides ids

It's possible to set own id to every slide.

> Every `id` must have the type `string`. Otherwise, slides won't get ids what will cause one problem, which appears when the developer uses the option `responsive`.  Slides won't be shown when the width of the screen changes and the carousel has to apply new settings according to the defined breakpoint. This is because the code uses ids of slides in order to assign new data to slides. So if you change the width of the screen and slides disappear, there could be the problem with setting `id`.  
> If `id`s aren't set explicitly, they will be created automatically.

The example of setting `id`s:

```html
  <div>Some tags before</div>
  <owl-carousel-o [options]="customOptions">

    <ng-container *ngFor="let slide of slidesStore">
      <ng-template carouselSlide [id]="slide.id">
        <img [src]="slide.src" [alt]="slide.alt" [title]="slide.title">
      </ng-template>
    </ng-container>

  </owl-carousel-o>
  <div>Some tags after</div>
```

## Options

**ngx-owl-carousel-o** uses the same options as Owl Carousel. Explanations of meanings and the usage of options are in [Owl Carousel Documentation](https://owlcarousel2.github.io/OwlCarousel2/docs/api-options.html).

**NOTE**: **ngx-owl-carousel-o** has the different usage of some of them. Mostly this is about options which require setting `data-` attributes to DOM-elements and which set names of classes and tags in the HTML-markup. The usage of these options is explained below.

Options which require setting `data-` attributes are:

- [merge](#merge)
- [dotsData](#dotsdata)
- [URLhashListener](#urlhashlistener)
- [lazyLoad](#lazyload)

### merge

The original Owl Carousel requires setting `data-merge` to each slide besides setting `merge=true`. In this lib `data-merge` is changed to `dataMerge` , which is the `@Input` property of the `<ng-template[carouselSlide]>` directive. The way of setting it is:

```html
<ng-template carouselSlide [dataMerge]="number">Slide text or HTML markup</ng-template>
```

  the `number` must be 1, 2, 3 or any other integer numbers. If `dataMerge` isn't provided, its value will be 1 (this is the default value).

### autoWidth  

The option `autoWidth=true` is working if user sets the `@Input` prop `width` to `<ng-template[carouselSlide]>` directive. The example:

```html
<ng-template carouselSlide [width]="number">Slide text or html markup</ng-template>
```

When the `width` isn't provided for a certain slide and is provided for other slides, firstly it will be 0 (this is the default value). At the end it will be calculated as (width of carousel)/(items) (e.g. `carouselWidth=1200` and `items=4`, the width of the slide will be `1200/4=300`).

In other words, the width of the slide with unprovided `width` will be set according to how much space in visible carousel window the slide must take. E.g. if there must be 2 visible slides, the width of the item will be half of the carousel window.

### responsiveBaseElement

The option `responsiveBaseElement` doesn't work. In the original Owl Carousel, all responsive breakpoints are corresponding to window width. Here they are corresponding to the width of the element `<div class="owl-carousel">` which takes 100% of its parent element width.

### fallbackEasing

The option `fallbackEasing` doesn't work because it's being used by `$.animate()` in  Owl Carousel created by means of jQuery. There's no such function in Angular.

### info

The option `info` doesn't work.

### navElement, navContainer, navContainerClass, navClass, dotContainer, dotClass and dotsClass

These options don't work.

| Option                                | Explanation                                                                              |
| -------------------------------       | -----------------------------------------------------------------------------------------|
| navElement: 'div'                     | this tag is set explicitly in the View of CarouselComponent                                  |
| navContainer: false                   | is removed                                                                               |
| navContainerClass: 'owl-nav'          | this css-class is set explicitly in the View of CarouselComponent                            |
| navClass: [ 'owl-prev', 'owl-next' ]  | this css-class is set explicitly in the View of CarouselComponent                            |
| dotClass: 'owl-dot'                   | this css-class is set explicitly in the View of CarouselComponent                            |
| dotsClass: 'owl-dots'                 | this css-class is set explicitly in the View of CarouselComponent                            |
| dotsContainer: false                  | is removed                                                                               |

### nestedItemSelector

The option `nestedItemSelector` doesn't work.

### itemElement, itemClass, stageElement, stageOuterClass, stageClass, refreshClass, loadedClass, loadingClass, rtlClass, responsiveClass, dragClass and grabClass

These options don't work.

| Option                            | Explanation                                                                                  |
| -------------------------------   | ---------------------------------------------------------------------------------------------|
| itemElement: 'div'                | this tag is set explicitly in the View                                                           |
| itemClass: 'owl-item'             | this css-class is set explicitly in the View                                                     |
| stageElement: 'div'               | this tag is set explicitly in the View                                                           |
| stageClass: 'owl-stage'           | this css-class is set explicitly in the View                                                     |
| stageOuterClass: 'owl-stage-outer'| this css-class is set explicitly in the View                                                     |
|                                   |                                                                                              |
| refreshClass: 'owl-refresh'       | this css-class is removed. Class 'owl-refreshed' is used instead. It's set explicitly in the                                                View and reflected by OwlDOMData.isRefreshed                                                 |
| loadedClass: 'owl-loaded'         | this css-class is set explicitly in the View and reflected by OwlDOMData.isLoaded                |
| loadingClass: 'owl-loading'       | this css-class is set explicitly in the View and reflected by OwlDOMData.isLoading               |
| rtlClass: 'owl-rtl'               | this css-class is set explicitly in the View and reflected by OwlDOMData.rtl                     |
| responsiveClass: 'owl-responsive' | this css-class is set explicitly in the View and reflected by OwlDOMData.isResponsive            |
| dragClass: 'owl-drag'             | this css-class is set explicitly in the View and reflected by OwlDOMData.isDragable              |
| grabClass: 'owl-grab'             | this css-class is set explicitly in the View and reflected by OwlDOMData.isGrab                  |

### navText

**NOTE**: Setting options in the HTML-template in the way like

```html
<owl-carousel-o [options]="{navText: [ '<i class="fa-chevron-left"></i>', '<i class="fa-chevron-right></i>"' ]}">
  <ng-template carouselSlide>Slide</ng-template>
</owl-carousel-o>
```

will cause the template parse error because of the double quote put around classes's names _fa-chevron-left_ and _fa-chevron-right_. The creation of the property e.g. `customOptions` in `component.ts` and writing `[options]="customOptions"` will eliminate this problem.

```typescript
customOptions: OwlOptions = {
 navText: [ '<i class="fa-chevron-left"></i>', '<i class="fa-chevron-right></i>"' ]
}
```

and

```html
<owl-carousel-o [options]="customOptions">
  <ng-template carouselSlide>Slide</ng-template>
</owl-carousel-o>
```

### dotsData

It's needed to set it to `true` and to set the content in the dot for every slide using the `@Input` property `dotContent`:

```html
<ng-template carouselSlide [dotContent]="content">Slide 1</ng-template>
```

- in the case when `content` is the prop of a component.

```html
<ng-template carouselSlide dotContent="content">Slide 1</ng-template>
```

- in the case when `content` is simple text.

The ontent can be simple text or the HTML-markup. Dots with this option work as tabs. The option `items` should be set to 1, otherwise, scrolling of slides will be done by pages (1 page equals the number of visible slides).
If the `dotContent` isn't provided in `<ng-template [carouselSlide]>`, its values will be '' (this is the default value).

### slideBy

When there's the option `slideBy='page'`, disabled __prev__ or __next__ buttons will rewind the carousel to the start or the end accordingly.
When the number of pages (dots) is 2 and there's the option  `loop=false`, changing pages could cause thoughts  something is wrong (when the carousel is on the first page, click on the __prev__ button makes the carousel show the second page which is the ending of the carousel at the same time; in this case the __next__ and __prev__ button do the same job). To avoid this behavior, the number of pages must be 3 and more or it's needed to set `loop=true`.

The number of pages depends on the number of all slides and the option `items` (e.g. if the quantity of slides is `10` and `items=3`, the number of pages will be `4` (10/3=3.3; 3.3 is rounded to 4)).

### rewind

The documentation of Owl Carousel says the default value of this option is set to `true`, but the code defines it as `false`. In **ngx-owl-carousel-o**, its default value is set to `false`.

**WARNING**: options `rewind` and `loop` shouldn't be enabled in one carousel. They do a similar job in different ways.

### freeDrag

The option `freeDrag` doesn't have the realization. Thus setting it to `true` will give nothing. This option doesn't work even in Owl Carousel written by means of jQuery.

### autoplayTimeout and autoplaySpeed

The option `autoplayTimeout` must always be bigger than the option `autoplaySpeed`. Otherwise, the autoplay won't work.

### autoplayMouseleaveTimeout

This options works just in the case `autoplayHoverPause` is enabled. `autoplayMouseleaveTimeout` sets the value of just the first timeout after firing the event `mouseleave`. Default meaning is `1`. Then the value of `autoplayTimeout` is applied.

### URLhashListener

When the option `URLhashListener=true`, it's required to define the `@Input` prop `dataHash` in `<ng-template carouselSlide>`:

```html
<ng-template carouselSlide id="owl-slide-1" dataHash="one"><div>Slide 1</div></ng-template>
<ng-template carouselSlide id="owl-slide-2" dataHash="two"><div>Slide 2</div></ng-template>
```

&nbsp;or

```html
<ng-template carouselSlide id="owl-slide-1" [dataHash]="hashObj.one"><div>Slide 1</div></ng-template>
<ng-template carouselSlide id="owl-slide-2" [dataHash]="hashObj.two"><div>Slide 2</div></ng-template>
```

where `hashObj` is the object with hashes (fragments) of url. `hashObj` could be an array. Defining the kind of data store is up to the developer.

**NOTE**: `HashService` uses services `ActivatedRoute` and `Router` for making it possible to navigate by hashes (fragments). And if `RouterModule.forRoot(routes)` isn't imported in the main module of an application, the problem will appear. `HashService` **won't work**. Therefore it's needed to import `RouterModule.forRoot(routes)` in the main module of an application even in the case of creating the simple app for testing the work of the library.

### lazyLoad

There's no need to set to `<img>` attributes `data-src` and  `data-src-retina` because Angular has its own realization for `<img>`. In Angular it's better to write `<img [src]="someURL">`. `src` is the data-binding, which means Angular will set the value to the native attribute `src` of `<img>` after loading its core code. Original Owl Carousel reads `data-src` and sets the native attribute `src` at needed moment. Of course, **ngx-owl-carousel-o** has additional tricks for lazy loading images (better to say the content of slides) put into slides.

### skip_validateItems

By default, this option is set to `false`. This option changes the number of visible slides in the case, when the number of slides is less than the value of the option `items`. For example, when the `items=4` and there're just 3 slides, the carousel will reassign the value of `items` to `3`.

When the option `skip_validateItems` is `true`, the carousel won't reassign the `items`. So, in the example above `items` will remain `4`. But there will be 3 slides and one empty place. This for the case when the option `loop=false`. When `loop=true`, the empty place will be populated by the copy of the first slide.

## Refreshing the carousel if options change

The code can detect different options and rerender the carousel. But the comparison of previous options and new options is shallow: `prevOptions === newOptions`. 

It means that mutating options object won't trigger the carousel refreshing:

```typescript
  // ...
  customOptions: OwlOptions = {
    autoWidth: true,
    loop: true,
    // ....
  }

  changeOptions() {
    this.customOptions.loop = false; // this won't refresh the carousel 
  }
```

It's needed to create a new options object. The object destructuring is helpful here: 

```typescript
  // ...
  customOptions: OwlOptions = {
    autoWidth: true,
    loop: true,
    // ....
  }

  changeOptions() {
    this.customOptions = { ...this.customOptions, loop: false } // this will make the carousel refresh
  }
```

## owlRouterLink

The directive `owlRouterLink` is introduced for making impossible the navigating between components while the carousel is dragging.

This directive has the same features as the native `routerLink` directive. One exception is the property `stopLink`. It prevents the navigating to another component.

This directive is included into `CarouselModule`, which must be imported into a needed module before using the `ngx-owl-carousel-o`. So, to use this directive, you just need to write it inside the needed slide.

Example of usage this directive:

```html
  <owl-carousel-o [options]="customOptions" (dragging)="isDragging = $event.dragging">

    <ng-container *ngFor="let item of carouselData">
      <ng-template carouselSlide>
        <div class="slider">
          <a [owlRouterLink]="['/present']" [stopLink]="isDragging">{{item.text}}</a>
          <a class="outer-link" href="https://www.google.com">
            <span>{{item.text}}</span>
          </a>

        </div>
      </ng-template>
    </ng-container>

  </owl-carousel-o>
```

`<a [owlRouterLink]="['/present']" [stopLink]="isDragging">{{item.text}}</a>` contains `owlRouterLink` directive and its _*@Input*_ property `stopLink`.

`<a owlRouterLink="'/present'" [stopLink]="isDragging">{{item.text}}</a>` is also possible way of using this directive.

In the example above, we see the usage of `dragging` event, `owlRouterLink`, and `stopLink`.
When the dragging of the carousel starts, the  `dragging` event notifies about it by passing object

``` typescript
{
  dragging: true,
  data: {}
}
```

The value of the prop `dragging` is assigned to the `isDraggable` property. Then this property is passed into  `owlRouterLink` through `stopLink`. Directive gets aware of dragging the carousel and prevents any navigations.

When the dragging of the carousel is finished, `dragging` passes object

``` typescript
{
  dragging: false,
  data: {}
}
```

 `isDraggable` gets updated, which causes the change of `stopLink`. Now its value is `false`. This enables navigating during the next simple click on `<a>` locating in the slide unless new dragging starts.

So, to use `<a>` in any slide, it's recommended to:

- use `dragging` event and property `isDragging` (or named differently);
- use `owlRouterLink` directive;
- use `stopLink` property of `owlRouterLink`. It's needed to pass to this prop `isDragging`. Using of `stopLink` is required.

The real example is [here](https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o/blob/develop/apps/demo-owl-carousel/src/app/link/link.component.html).

The `<a href="someUrl">` has the automatic preventing navigation during dragging.

## Events

- [translated](#translated).
- [dragging](#dragging).
- [change](#change).
- [changed](#changed).
- [initialized](#initialized).

### translated

It fires after the carousel finishes translating and exposes the object of the type `SlidesOutputData`.

```typecript
class SlidesOutputData {
  startPosition?: number;
  slides?: SlideModel[];
};
```

`startPosition` is the position of the first slide with the class `.active`

`slides` is the array with data of each active slide. Data of each active slide are:

```typescript
{
  id: string; // id of slide
  width: number; // width of slide
  marginL: number; // margin-left of slide
  marginR: number; // margin-right of slide
  center: boolean; // whether slide is centered (has .center)
}
```

The code for subscribing to this event is the following:

`CarouselHolderComponent`

```typescript
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';
@Component({
      selector: '....',
      template: `
      <owl-carousel-o [options]="customOptions" (translated)="getPassedData($event)">

        <ng-container *ngFor="let slide of slidesStore">
          <ng-template carouselSlide [id]="slide.id">
            <img [src]="slide.src" [alt]="slide.alt" [title]="slide.title">
          </ng-template>
        </ng-container>

      </owl-carousel-o>
    `
    })
    export class CarouselHolderComponent {
      customOptions: OwlOptions = {
        loop: true,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        dots: false,
        navSpeed: 700,
        navText: ['', ''],
        responsive: {
          0: {
            items: 1
          },
          400: {
            items: 2
          },
          740: {
            items: 3
          },
          940: {
            items: 4
          }
        },
        nav: true
      }

      activeSlides: SlidesOutputData;

      slidesStore: any[];
      constructor() {}

      getPassedData(data: SlidesOutputData) {
        this.activeSlides = data;
        console.log(this.activeSlides);
      }
    }
```

`(translated)="getPassedData($event)"` is the subscription or attaching to the event;

`getPassedData(data: SlidesOutputData)` is the method which takes data about active slides.

`activeSlides` is the property of `CarouselHolderComponent`, which stores data about active slides

### dragging

The event `dragging` fires after that the user starts dragging the carousel. It exposes the object

``` typescript
{
  dragging: boolean,
  data: SlidesOutputData
}

class SlidesOutputData {
  startPosition?: number;
  slides?: SlideModel[];
};
```

When the dragging of the carousel is started its paylod is:

``` typescript
{
  dragging: true,
  data: {
    startPosition: 0,
    slides: [ slide, slide, slide ];
  }
}
```

The prop `data` shows the situation which was at the moment of starting dragging. In other words, if before dragging the carousel the prop `startPosition` was `0`, the event `dragging` will emit this prop with the same value.

When the dragging of the carousel is finished and the event `translated` is fired `dragging` fires again but its payload has value

``` typescript
{
  dragging: false,
  data: {
    startPosition: 1,
    slides: [ slide, slide, slide ];
  }
}
```

This time, the prop `data` shows current `startPosition` and current active  `slides`.

This event is needed for the cases when slide should contain the tag `<a>` with the `routerLink` directive.

Example of using this event:

```html
  <owl-carousel-o [options]="customOptions" (dragging)="isDragging = $event.dragging">

    <ng-container *ngFor="let item of carouselData">
      <ng-template carouselSlide>

        <div class="slider">
          <a [owlRouterLink]="['/present']" [stopLink]="isDragging">{{item.text}}</a>
          <a class="outer-link" href="https://www.google.com">
            <span>{{item.text}}</span>
          </a>

        </div>
      </ng-template>
    </ng-container>

  </owl-carousel-o>
```

`(dragging)="isDragging = $event.dragging"` This expression uses the `dragging` event and has the property `isDragging` which should be created in the component hosting the `<ngx-owl-carousel-o>`.

`$event` is the payload of the event. Its prop `dragging` can be `true` or `false`.
The real example is [here](https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o/blob/develop/apps/demo-owl-carousel/src/app/link/link.component.html).

### initialized

It fires after the carousel gets initialized and exposes the object of the type `SlidesOutputData`.

```typecript
class SlidesOutputData {
  startPosition?: number;
  slides?: SlideModel[];
};
```

`startPosition` is the position of the first slide with the class `.active`

`slides` is the array with data of each active slide. Data of each active slide are:

```typescript
{
  id: string; // id of slide
  width: number; // width of slide
  marginL: number; // margin-left of slide
  marginR: number; // margin-right of slide
  center: boolean; // whether slide is centered (has .center)
}
```

The code for subscribing to this event is the following:

`CarouselHolderComponent`

```typescript
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';
@Component({
      selector: '....',
      template: `
      <owl-carousel-o [options]="customOptions" (initialized)="getData($event)">

        <ng-container *ngFor="let slide of slidesStore">
          <ng-template carouselSlide [id]="slide.id">
            <img [src]="slide.src" [alt]="slide.alt" [title]="slide.title">
          </ng-template>
        </ng-container>

      </owl-carousel-o>
    `
    })
    export class CarouselHolderComponent {
      customOptions: OwlOptions = {
        loop: true,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        dots: false,
        navSpeed: 700,
        navText: ['', ''],
        responsive: {
          0: {
            items: 1
          },
          400: {
            items: 2
          },
          740: {
            items: 3
          },
          940: {
            items: 4
          }
        },
        nav: true
      }

      activeSlides: SlidesOutputData;

      slidesStore: any[];
      constructor() {}

      getData(data: SlidesOutputData) {
        this.activeSlides = data;
        console.log(this.activeSlides);
      }
    }
```

`(initialized)="getData($event)"` is the subscription or attaching to the event;

`getData(data: SlidesOutputData)` is the method which takes data about active slides.

`activeSlides` is the property of `CarouselHolderComponent`, which stores data about active slides

### change

It fires after each change in the carousel (click on dots, nav buttons). However, while the user drags the carousel this event fires after dropping the carousel or after stopping dragging.
This event exposes the object of the type `SlidesOutputData`. It's populated by data defined before firing the event. This event just notifies about changes. New data (active slides, startPosition) gets available after the end of moving the carousel (event `translated`).

```typescript
class SlidesOutputData {
  startPosition?: number;
  slides?: SlideModel[];
};
```

`startPosition` is the position of the first slide with the class `.active`

`slides` is the array with data of each active slide. Data of each active slide are:

```typescript
{
  id: string; // id of slide
  width: number; // width of slide
  marginL: number; // margin-left of slide
  marginR: number; // margin-right of slide
  center: boolean; // whether slide is centered (has .center)
}
```

The code for subscribing to this event is the following:

`CarouselHolderComponent`

```typescript
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';
@Component({
      selector: '....',
      template: `
      <owl-carousel-o [options]="customOptions" (change)="getData($event)">

        <ng-container *ngFor="let slide of slidesStore">
          <ng-template carouselSlide [id]="slide.id">
            <img [src]="slide.src" [alt]="slide.alt" [title]="slide.title">
          </ng-template>
        </ng-container>

      </owl-carousel-o>
    `
    })
    export class CarouselHolderComponent {
      customOptions: OwlOptions = {
        loop: true,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        dots: false,
        navSpeed: 700,
        navText: ['', ''],
        responsive: {
          0: {
            items: 1
          },
          400: {
            items: 2
          },
          740: {
            items: 3
          },
          940: {
            items: 4
          }
        },
        nav: true
      }

      activeSlides: SlidesOutputData;

      slidesStore: any[];
      constructor() {}

      getData(data: SlidesOutputData) {
        this.activeSlides = data;
        console.log(this.activeSlides);
      }
    }
```

`(change)="getData($event)"` is the subscription or attaching to the event;

`getData(data: SlidesOutputData)` is the method which takes data about active slides.

`activeSlides` is the property of `CarouselHolderComponent`, which stores data about active slides

### changed

It fires when user clicks dots or nav buttons and new data about active slides becomes known. This event fires before the event `translated` gets fired. However, while the user drags the carousel this event fires after dropping the carousel or after stopping dragging.
This event exposes the object of the type `SlidesOutputData`:

```typescript
class SlidesOutputData {
  startPosition?: number;
  slides?: SlideModel[];
};
```

`startPosition` is the position of the first slide with the class `.active`

`slides` is the array with data of each active slide. Data of each active slide are:

```typescript
{
  id: string; // id of slide
  width: number; // width of slide
  marginL: number; // margin-left of slide
  marginR: number; // margin-right of slide
  center: boolean; // whether slide is centered (has .center)
}
```

The code for subscribing to this event is the following:

`CarouselHolderComponent`

```typescript
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';
@Component({
      selector: '....',
      template: `
      <owl-carousel-o [options]="customOptions" (changed)="getData($event)">

        <ng-container *ngFor="let slide of slidesStore">
          <ng-template carouselSlide [id]="slide.id">
            <img [src]="slide.src" [alt]="slide.alt" [title]="slide.title">
          </ng-template>
        </ng-container>

      </owl-carousel-o>
    `
    })
    export class CarouselHolderComponent {
      customOptions: OwlOptions = {
        loop: true,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        dots: false,
        navSpeed: 700,
        navText: ['', ''],
        responsive: {
          0: {
            items: 1
          },
          400: {
            items: 2
          },
          740: {
            items: 3
          },
          940: {
            items: 4
          }
        },
        nav: true
      }

      activeSlides: SlidesOutputData;

      slidesStore: any[];
      constructor() {}

      getData(data: SlidesOutputData) {
        this.activeSlides = data;
        console.log(this.activeSlides);
      }
    }
```

`(changed)="getData($event)"` is the subscription or attaching to the event;

`getData(data: SlidesOutputData)` is the method which takes data about active slides.

`activeSlides` is the property of `CarouselHolderComponent`, which stores data about active slides

## Plugins

**ngx-owl-carousel-o** has almost all plugins written on the page [Owl Carousel Plugin API](https://owlcarousel2.github.io/OwlCarousel2/docs/dev-plugin-api.html) except the **VideoPlugin**.

### VideoPlugin

This plugin isn't realized. In order to play the video, use special packages (e.g. [`ngx-embed-video`](https://www.npmjs.com/package/ngx-embed-video); [`ngx-youtube-player`](https://www.npmjs.com/package/ngx-youtube-player) and so on).

It's better to create special component with the video and put it in `<ng-template carouselSlide>....</ng-template>`
The example:

```html
<ng-template carouselSlide [dotContent]="content">
    <custom-video [id]="videoId" [url]="someURL" (someEvent)="handlerOfSomeEvent"></custom-video>
</ng-template>
```

`id` and `url` are data-binding properties, defined in the component which contains `<owl-carousel-o>`.

## Tips

### Real examples to help

Some examples of using this lib are displayed in the app **demo-owl-carousel**:

- The carousel with `autoWidth=true`. [Typescript part](https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o/blob/develop/apps/demo-owl-carousel/src/app/home/home.component.ts) and [HTML part](https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o/blob/develop/apps/demo-owl-carousel/src/app/home/home.component.html)
- The carousel with `autoHeight=true`, `URLhashListener=true` and `startPosition='URLHash'`. [Typescript part](https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o/blob/develop/apps/demo-owl-carousel/src/app/home/subhome/subhome.component.ts) and [HTML part](https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o/blob/develop/apps/demo-owl-carousel/src/app/home/subhome/subhome.component.html)
- The carousel with `autoplay=true`. [Typescript part](https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o/blob/develop/apps/demo-owl-carousel/src/app/present/present.component.ts) and [HTML part](https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o/blob/develop/apps/demo-owl-carousel/src/app/present/present.component.html)

**NOTE**:  **demo-owl-carousel** could be downloaded and started on own PC. Steps for achieving that are:

- `git clone https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o.git`;
- `yarn` or `npm install`;
- `ng serve` or `ng serve --project=demo-owl-carousel`.

### Tests to help

Also, lots of variants of using carousel are in files [carousel.component.spec.ts](https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o/blob/develop/libs/ngx-owl-carousel-o/src/lib/carousel/carousel.component.spec.ts) and [stage.component.spec.ts](https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o/blob/develop/libs/ngx-owl-carousel-o/src/lib/carousel/stage/stage.component.spec.ts).

They contain tests of the library. These tests include many functions `it()`. The example:

```typescript
it('should change height of carousel [options]="{nav: true, autoHeight: true}"', fakeAsync(() => {
    discardPeriodicTasks();
    const html = `
      <div style="width: 920px; margin: auto">

        <owl-carousel-o [options]="{nav: true, autoHeight: true}">

          <ng-template carouselSlide id="owl-slide-1">
            <div style="height: 100px">Slide 1</div>
          </ng-template>

          <ng-template carouselSlide id="owl-slide-2">
            <div style="height: 40px">Slide 2</div>
          </ng-template>

          <ng-template carouselSlide id="owl-slide-3">
            <div style="height: 80px">Slide 3</div>
          </ng-template>

          <ng-template carouselSlide id="owl-slide-4">
            <div style="height: 130px">Slide 4</div>
          </ng-template>

          <ng-template carouselSlide id="owl-slide-5">
            <div style="height: 90px">Slide 5</div>
          </ng-template>

        </owl-carousel-o>

      </div>
    `;
    fixtureHost = createTestComponent(html);
    deCarouselComponent = fixtureHost.debugElement.query(By.css('owl-carousel-o'));
    tick();
    fixtureHost.detectChanges();
    // some code ...
  }));

```

The first argument of `it()` explains how the carousel should work with options written in `const html=...`. In this example the height of the carousel should change automatically: `should change height of carousel [options]="{nav: true, autoHeight: true}"`.

Variable `html` contains the HTML-markup of the carousel for `[options]="{nav: true, autoHeight: true}"`.

However, most of the HTML-markups set to `html` are simplified. There's no property `customOptions`, directive `*ngFor` and `<ng-container>` as it is in examples above.

### Managing the carousel from outside its markup

It's possible to move the carousel left/right and to needed slide from different places of the html-page. The real is provided in [home.component.html](https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o/blob/develop/apps/demo-owl-carousel/src/app/home/home.component.html)

```html
<owl-carousel-o [options]="customOptions" (translated)="getPassedData($event)" #owlCar>

  <ng-container *ngFor="let item of carouselData">
    <ng-template carouselSlide [id]="item.id" [width]="item.width">
      <div class="slider">
        <p>{{item.text}}</p>

      </div><!-- /.carousel-item team-member -->
    </ng-template>
  </ng-container>
  
</owl-carousel-o>

<p>
  <a class="btn btn-success" (click)="owlCar.prev()">prev</a> <==>
  <a class="btn btn-success" (click)="owlCar.next()">next</a>
</p>
<p><a class="btn btn-success" (click)="owlCar.to('slide-3')">move to 3th slide</a></p>
```

Key points are:

1. Defining in `<owl-carousel-o>` template reference variable `#owlCar`.
2. Using it in handlers for events. In the code above, we see `(click)="owlCar.prev()"`, `(click)="owlCar.next()"` and `(click)="owlCar.to('slide-3')"`. `#owlCar` could be passed as an argument of the hanlder: `(click)="handler(owlCar)`.
   - `owlCar.prev()` shows the previous slide.
   - `owlCar.next()` shows the next slide.
   - `owlCar.to('slide-3')` moves the carousel to the slide with needed `id`. In this case `slide-3` is the needed slide. **NOTE**: it's needed to supply own ids to slides. The code above has `[id]="item.id"`. This is the way of supplying `ids`.

## ReferenceError: Event is not defined

The details of the issue are following:

```text
$ yarn serve:ssr
yarn run v1.17.3
$ node dist/server
D:\WEB-learning\Angular\projects-libs\owl-carousel\owl-carousel-test-for-built-lib\test-project\owl-carousel-o-demo-ng8\dist\ser
ver\main.js:87252
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Event]),
                                                                                   ^

ReferenceError: Event is not defined
    at Module.KMir (D:\WEB-learning\Angular\projects-libs\owl-carousel\owl-carousel-test-for-built-lib\test-project\owl-carousel
-o-demo-ng8\dist\server\main.js:87252:84)
    at __webpack_require__ (D:\WEB-learning\Angular\projects-libs\owl-carousel\owl-carousel-test-for-built-lib\test-project\owl-
carousel-o-demo-ng8\dist\server\main.js:20:30)
    at Object.F+o+ (D:\WEB-learning\Angular\projects-libs\owl-carousel\owl-carousel-test-for-built-lib\test-project\owl-carousel
-o-demo-ng8\dist\server\main.js:79718:12)
    at __webpack_require__ (D:\WEB-learning\Angular\projects-libs\owl-carousel\owl-carousel-test-for-built-lib\test-project\owl-
carousel-o-demo-ng8\dist\server\main.js:20:30)
    at Object.V7fC (D:\WEB-learning\Angular\projects-libs\owl-carousel\owl-carousel-test-for-built-lib\test-project\owl-carousel
-o-demo-ng8\dist\server\main.js:99395:12)
    at __webpack_require__ (D:\WEB-learning\Angular\projects-libs\owl-carousel\owl-carousel-test-for-built-lib\test-project\owl-
carousel-o-demo-ng8\dist\server\main.js:20:30)
    at Object.K011 (D:\WEB-learning\Angular\projects-libs\owl-carousel\owl-carousel-test-for-built-lib\test-project\owl-carousel

demo-ng8\dist\server\main.js:92:18)    at __webpack_require__ (D:\WEB-learning\Angular\projects-libs\owl-carousel\owl-carousel-test-for-built-lib\test-project\owl-
carousel-o-demo-ng8\dist\server\main.js:20:30)

error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

The issue

```text
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Event]),
                                                                                   ^

ReferenceError: Event is not defined
```

is connected with decorator `@HostListener`. In the case of `ngx-owl-carousel-o`, it emerges just in Angular 8.

### The solution for the `express.js` (_pay attention to comments_)

`server.ts`:

``` typescript
import * as express from 'express';
import {join} from 'path';

// -----------------------------------------------------------------------------------
import { readFileSync } from 'fs'; // import readFileSync            (1)
const domino = require('domino');  // import the library `domino`    (2)
// -----------------------------------------------------------------------------------

const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');

// -----------------------------------------------------------------------------------
const template = readFileSync(join(DIST_FOLDER, 'index.html')).toString(); // use `index.html` as template (3)
const win = domino.createWindow(template); // create object Window                     (4)
global['Event'] = win.Event;               // assign the `win.Event` to prop `Event`   (5)
// -----------------------------------------------------------------------------------

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP, ngExpressEngine, provideModuleMap} = require('./dist/server/main');
```

This solution is taken from [https://github.com/hippee-lee/3940-v8-ssr/blob/master/server.ts#L29](https://github.com/hippee-lee/3940-v8-ssr/blob/master/server.ts#L29)

### The solution for the `NestJs` (_pay attention to comments_)

`server/app.module.ts`

```typescript
const BROWSER_DIR = join(process.cwd(), 'dist/browser');
applyDomino(global, join(BROWSER_DIR, 'index.html'));
global['Event'] = global['window']['Event'];           //  define the global property `Event`
```

## Using Internal Slide Data

It's possible to use internal slide data for own purposes. But this data is exposed in version  `5.1.0` and higher.

The slide data structure:

```typescript
class SlideModel {

  /**
   * Id of slide
   */
  id: string;

  /**
   * Active state of slide. If true slide gets css-class .active
   */
  isActive?: boolean;

  /**
   * Number of grid parts to be used
   */
  dataMerge?: number;

  /**
   * Width of slide
   */
  width?: number | string;

  /**
   * Css-rule 'margin-left'
   */
  marginL?: number | string;

  /**
   * Css-rule 'margin-right'
   */
  marginR?: number | string;

  /**
   * Make slide to be on center of the carousel
   */
  isCentered?: boolean;

  /**
   * Mark slide to be on center of the carousel (has .center)
   */
  center?: boolean;

  /**
   * Cloned slide. It's being used when 'loop'=true
   */
  isCloned?: boolean;

  /**
   * Indicates whether slide should be lazy loaded
   */
  load?: boolean;

  /**
   * Css-rule 'left'
   */
  left?: number | string;

  /**
   * Changeable classes of slide
   */
  classes?: {[key:string]: boolean};

  /**
   * Shows whether slide could be animated and could have css-class '.animated'
   */
  isAnimated?: boolean;

  /**
   * Shows whether slide could be animated-in and could have css-class '.owl-animated-in'
   */
  isDefAnimatedIn?: boolean;
  /**
   * Shows whether slide could be animated-out and could have css-class '.owl-animated-out'
   */
  isDefAnimatedOut?: boolean;
  /**
   * Shows whether slide could be animated-in and could have animation css-class defined by user
   */
  isCustomAnimatedIn?: boolean;
  /**
   * Shows whether slide could be animated-out and could have animation css-class defined by user
   */
  isCustomAnimatedOut?: boolean;

  /**
   * State for defining the height of slide.It's values could be 'full' and 'nulled'. 'Full' sets css-height to 'auto', 'nulled' sets height to '0'.
   */
  heightState?: string;

  /**
   * Hash (fragment) of url which corresponds to slide
   */
  hashFragment?: string;
}

```

To get this data, define the variable `let-owlItem` or `let-slideData` in your template (the name of a variable could be any):

```html
  <ng-template carouselSlide let-owlItem>
    <div class="slide">
      {{owlItem.isActive}}
      {{owlItem.isCentered}}
      <img [src]="image.src" [alt]="image.alt" [title]="image.title">
    </div>
  </ng-template>
```

An internal slide data could be very helpful to add cool Angular animations. Use properties `isActive` and `isCentered` to switch the state of animation. An example is below.

1. Define animation in `your.component.ts`:

    ```typescript
    @Component({
      selector: 'app-test',
      templateUrl: './test.component.html',

      // .....
      animations: [
        trigger('activeSlide', [
          state('active', style({
            transform: 'scale(1.4)',
            opacity: 1,
          })),
          state('inActive', style({
            transform: 'scale(0.7)',
            opacity: 0.8,
          })),
          transition('active => inActive', [
            animate('0.5s')
          ]),
          transition('inActive => active', [
            animate('0.5s')
          ])
        ])
      ]
    })
    export class TestComponent implements OnInit {
    // .....

      customOptions: OwlOptions = {
        loop: true,
        dots: false,
        navSpeed: 700,
        navText: ['<<', '>>'],
        center: true, // most important for this example
        responsive: {
          0: {
            items: 1
          },
          740: {
            items: 3
          }
        },
        nav: true
      }
    }
    ```

2. Use internal slide data in the template. This example uses `let-owlItem` and prop `isCentered` (`owlItem.isCentered`) to toggle animation state:

    `test.component.html`

    ```html
      <owl-carousel-o [options]="customOptions" #owlCat>
        <ng-container *ngFor="let image of imagesData">
          <ng-template carouselSlide let-owlItem> 
            <!--                                 \/          -->
            <div class="slide" [@activeSlide]="owlItem.isCentered ? 'active' : 'inActive'">
              <img [src]="image.src" [alt]="image.alt" [title]="image.title">
            </div>
          </ng-template>
        </ng-container>
      </owl-carousel-o>
    ```

## Issue: `autoplay` doesn't stay paused when user opens `mat-menu`

This issue appears even in the case when the option `autoplayHoverPause` is set to `true`. This is because the carousel listens to the events `mouseover` and `mouseleave`. When a user opens `mat-menu`, the code adds `overlay`, what triggers `mouseleave`. `ngx-owl-carousel-o` renews autoplaying after this event is fired.

The solution for this case is to manage autoplaying manually. You can do that using two methods of `CarouselComponent`: `stopAutoplay` and `startAutoplay`.

Example of usage in a template with `mat-menu`:

```html
  <owl-carousel-o [options]="customOptions" (translated)="getPassedData($event)" #owlCar>
          
    <ng-container *ngFor="let item of carouselData; let i=index">
      <ng-template carouselSlide [width]="item.width">
        <div class="slider">
          <p>{{item.text}}</p>
          <div *ngIf="i == 2">
            <button mat-raised-button color="accent" [matMenuTriggerFor]="menu" (menuOpened)="owlCar.stopAutoplay()">Menu</button>
            <mat-menu #menu="matMenu" (closed)="owlCar.startAutoplay()">
              <button mat-menu-item>Item 1</button>
              <button mat-menu-item>Item 2</button>
              <button mat-menu-item>Item 3</button>
              <button mat-menu-item>Item 4</button>
              <button mat-menu-item>Item 5</button>
            </mat-menu>
          </div>
            
        </div><!-- /.carousel-item team-member -->
      </ng-template>
    </ng-container>
    
  </owl-carousel-o>
```

When menu is opened, you call `stopAutoplay`: `(menuOpened)="owlCar.stopAutoplay()"`  
When menu is closed, you call `startAutoplay`: `(closed)="owlCar.startAutoplay()"`

## License

This project is licensed under the terms of the [MIT License](https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o/blob/develop/LICENSE)
