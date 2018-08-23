# Owl Carousel

**ngx-owl-carousel-o** is built for Angular 6. It doesn't use jQuery. 

- [Options](#options).
- [Events](#events).
- [Tips](#tips).

## Getting started

1. Run `yarn add ngx-owl-carousel-o` or `npm install ngx-owl-carousel-o`.
2. Add styles (one of this variants).
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
3. Import `RoutingModule` and `Routes` into `AppModule` unless they are imported.
4. Import `CarouselModule` into module which declares component intended to have carousel.
    ```typescript
    import { CarouselModule } from 'ngx-owl-carousel-o';
    @NgModule({
      imports: [ CarouselModule ],
      declarations: [ CarouselHolderComponent ]
    })
    export class SomeModule { }
    ```
5. Add to needed component `customOptions` with options for carousel:
    ```typescript
    @Component({
      selector: '....',
      templateUrl: 'carousel-holder.component.html'
    })
    export class CarouselHolderComponent {
      customOption: any = {
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
6. Add html-markup to template of component (in this case to `carousel-holder.component.html`):
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

**NOTE**: Each slide has `id`. If it isn't supplied like in example it generates automaticly and become exposed when event `translated` fires. Info about this event is below. Follow link [event `translated`](#translated)

**NOTE**: For using **ngx-owl-carousel-o** with options `animateOut` and `animateIn` it's required to add `animate.css`. Steps are the following:
1. `yarn add animate.css` or `npm install animate.css --save`.
2. Add styles to `angular.json`:
    ```json
    "styles": [
        "node_modules/animate.css/animate.min.css"
      ],
    ```

## Options

**ngx-owl-carousel-o** uses the same options as Owl Carousel. Explanations of meanings and usage of options are [here](https://owlcarousel2.github.io/OwlCarousel2/docs/api-options.html).

**NOTE**: **ngx-owl-carousel-o** has different usage some of them. Mostly this is about options which require setting to DOM-elements `data-`, which set names of classes and tags in HTML-markup. Usage of them is explained below. 

Options with required `data-`:
- [merge](#merge);
- [dotsData](#dotsData);
- [URLhashListener](#URLhashListener).


### merge
Original Owl Carousel requires setting `data-merge` to each slide besides setting `merge=true`. In this lib `data-merge` is changed to `dataMerge` , wich is `@Input` property of `<ng-template[carouselSlide]>` directive. In order to set it write:
```html
<ng-template carouselSlide [dataMerge]="number">Slide text or html markup</ng-template>
```
  `number` must be 1, 2, 3 and any other integer number. If `dataMerge` isn't provided, its value will be 1 (this is default value).


### autoWidth  
Option `autoWidth=true` is working if user sets `@Input` prop `width` to `<ng-template[carouselSlide]>` directive. Example:
```html
<ng-template carouselSlide [width]="number">Slide text or html markup</ng-template>
```
In case when `width` isn't provided for certain slide and is provided for other slides, firstly it will be 0 (this is default value). At the end it will be calculated as (width of carousel)/(items) (e.g. `carouselWidth=1200`, and `items=4`, width of slide will be `1200/4=300`).

In other words the width of slide will be set according to how much space in visible carousel window the slide must take. E.g. if there must be 2 visible slides, the width of item will be half of carousel window.

### responsiveBaseElement
Option `responsiveBaseElement` doesn't work. In original Owl Carousel all responsive breakpoints are corresponding to window width. Here they are corresponding to width of element `<div class="owl-carousel">` which takes 100% of its parent element width.

### fallbackEasing
Option `fallbackEasing` doesn't work because it's being used by `$.animate()`. There's no such function in Angular.

### info
Option `info` doesn't work.

### navElement, navContainer, navContainerClass, navClass, dotContainer, dotClass and dotsClass
These options don't work.

| Option                                | Explanation                                                                              |
| -------------------------------       | -----------------------------------------------------------------------------------------|
| navElement: 'div'                     | this tag is set explicitly in View of CarouselComponent                                  |
| navContainer: false   	              | is removed                                                                               |
| navContainerClass: 'owl-nav'          | this css-class is set explicitly in View of CarouselComponent                            |
| navClass: [ 'owl-prev', 'owl-next' ]  | this css-class is set explicitly in View of CarouselComponent                            |
| dotClass: 'owl-dot'                   | this css-class is set explicitly in View of CarouselComponent                            |
| dotsClass: 'owl-dots'                 | this css-class is set explicitly in View of CarouselComponent                            |
| dotsContainer: false  	              | is removed                                                                               |

### nestedItemSelector
Prop `nestedItemSelector` isn't working.

### itemElement, itemClass, stageElement, stageOuterClass, stageClass, refreshClass, loadedClass, loadingClass, rtlClass, responsiveClass, dragClass and grabClass
These options don't work.

| Option                            | Explanation                                                                                  |
| -------------------------------   | ---------------------------------------------------------------------------------------------|
| itemElement: 'div'                | this tag is set explicitly in View                                                           |
| itemClass: 'owl-item' 	          | this css-class is set explicitly in View                                                     |
| stageElement: 'div'               | this tag is set explicitly in View                                                           |
| stageClass: 'owl-stage'           | this css-class is set explicitly in View                                                     |
| stageOuterClass: 'owl-stage-outer'| this css-class is set explicitly in View                                                     |
|                                   |                                                                                              |
| refreshClass: 'owl-refresh'       | this css-class is removed. Class 'owl-refreshed' is used instead. It's set explicitly in                                                 View and reflected by OwlDOMData.isRefreshed                                                 |
| loadedClass: 'owl-loaded'         | this css-class is set explicitly in View and reflected by OwlDOMData.isLoaded                |
| loadingClass: 'owl-loading'       | this css-class is set explicitly in View and reflected by OwlDOMData.isLoading               |
| rtlClass: 'owl-rtl'               | this css-class is set explicitly in View and reflected by OwlDOMData.rtl                     |
| responsiveClass: 'owl-responsive' | this css-class is set explicitly in View and reflected by OwlDOMData.isResponsive            |
| dragClass: 'owl-drag'             | this css-class is set explicitly in View and reflected by OwlDOMData.isDragable              |
| grabClass: 'owl-grab'             | this css-class is set explicitly in View and reflected by OwlDOMData.isGrab                  |

### navText
**NOTE**: Setting options in html-template in the form like
```html
<owl-carousel-o [options]="{navText: [ '<i class="fa-chevron-left"></i>', '<i class="fa-chevron-right></i>"' ]}">
  <ng-template carouselSlide>Slide</ng-template>
</owl-carousel-o>
```
will cause template parse error because of double quote put arround classes names _fa-chevron-left_ and _fa-chevron-right_. Creation property e.g. `customOptions` in `component.ts` and writing `[options]="customOptions"` will eliminate this problem. 

```typescript
customOptions: any = {
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
It's needed to set it to `true` and to set content in dot for every slide using `@Input` property `dotContent`:
```html
<ng-template carouselSlide [dotContent]="content">Slide 1</ng-template>
```
- in case when `content` is prop of component.

```html
<ng-template carouselSlide dotContent="content">Slide 1</ng-template>
```
- in case when `content` is simple text.


Content can be simple text or html-markup. Dots with this option work as tabs. Options `items` should be set to 1, otherwise scrolling of slides will occur by pages (1 page equals the number of visible slides).
If `dotContent` isn't provided in `<ng-template [carouselSlide]>`, its values will be '' (this is default value).

### slideBy
When option `slideBy='page'` disabled prev or next buttons will rewind carousel to the begin or end accordingly. 
When number of pages (dots) is 2 and option  `loop=false` changing pages could cause thougths something is wrong (when carousel is on first page, click on prev button makes carousel show second page which is the ending of carousel at the same time; in this case next and prev button do the same job). In order to avoid this behaviour the number pages must be 3 and more or to set `loop=true`. 

Number of pages depends on number of all slides and option `items` (e.g. if number of slides is `10` and `items=3`, the number of pages will be `4` (10/3=3.3; 3.3 is rounded to 4)).


### rewind
option `rewind`. Officall documentaion says the default value of this option is set to `true`, but the code defines it as `false`. In **ngx-owl-carousel-o** its default value set to `false`. 

**WARNING**: options `rewind` and `loop` shouldn't be enabled in one carousel. They do similar job in different ways.

### freeDrag
Option `freeDrag` doesn't have realization. Thus settting it to `true` will give nothing. This option doesn't work even in Owl Carousel written by means of jQuery.

### autoplayTimeout and autoplaySpeed
Option `autoplayTimeout` must always be bigger than option `autoplaySpeed`. Otherwise autoplay won't work.

### URLhashListener
When option  `URLhashListener=true`, it's required to define the `@Input` prop `dataHash` in `<ng-template carouselSlide>`: 
```html
<ng-template carouselSlide id="owl-slide-1" dataHash="one"><div>Slide 1</div></ng-template>
<ng-template carouselSlide id="owl-slide-2" dataHash="two"><div>Slide 2</div></ng-template>
```
&nbsp;or

```html
<ng-template carouselSlide id="owl-slide-1" [dataHash]="hashObj.one"><div>Slide 1</div></ng-template>
<ng-template carouselSlide id="owl-slide-2" [dataHash]="hashObj.two"><div>Slide 2</div></ng-template>
```
where `hashObj` is object with hashes (fragments) of url. `hashObj` could be array. Defining the kind of data store is up to you. 

**NOTE**: `HashService` which enables navigation by hashes (fragments) uses services `ActivatedRoute` and `Router`. The `CarouselModule` imports `RouterModule.forChild()`. And if `RouterModule.forRoot(routes)` isn't imported in main module of application, the problem will appear. `HashService` **won't work**. Thus it's needed to import `RouterModule.forRoot(routes)` in main module of application even though you wonna create simple app for testing the work of library.

## Events
There's only one event `translated`.

### translated
It fires after carousel finishes translating and expose object of type `SlidesOutputData`.
```typecript
class SlidesOutputData {
  startPosition?: number;
  slides?: SlideModel[];
};
```
`startPosition` is the position of first slide with class `.active`
`slides` is array with data of each active slide. Data of each active slide are:
```typescript
{
  id: string; // id of slide
  width: number; // width of slide
  marginL: number; // margin-left of slide
  marginR: number; // margin-right of slide
  center: boolean; // whether slide is centered (has .center)
} 
```

Code for subscribing to this event:
`CarouselHolderComponent`
```typescript
import { SlidesOutputData } from 'ngx-owl-carousel-o';
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
      customOption: any = {
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

      activeSlide: SlidesOutputData;

      slidesStore: any[];
      constructor() {}

      getPassedData(data: SlidesOutputData) {
        this.activeSlides = data;
        console.log(this.activeSlides);
      }
    }
```
`(translated)="getPassedData($event)"` is subscribing or attaching to event;

`getPassedData(data: SlidesOutputData)` is method which takes data about active slides.

`activeSlide` is property of `CarouselHolderComponent`, which stores data about active slides


## Tips