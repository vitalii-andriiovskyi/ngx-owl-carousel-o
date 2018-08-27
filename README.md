# ngx-owl-carousel-o

**ngx-owl-carousel-o** is built for Angular 6. It doesn't use jQuery. 

##### Table of Contents
- [Get started](#get-started)
- [Options](#options)
- [Events](#events)
- [Plugins](#plugins)
- [Tips](#tips)

## Get started

1. Run `yarn add ngx-owl-carousel-o` or `npm install ngx-owl-carousel-o`.
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
5. Add to needed component `customOptions` or named in different way object with options for carousel:
    ```typescript
    @Component({
      selector: '....',
      templateUrl: 'carousel-holder.component.html'
    })
    export class CarouselHolderComponent {
      customOptions: any = {
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

**NOTE**: Each slide has `id`. If it isn't supplied like in example code generates it automatically and expose one when event `translated` fires. Info about this event is below. Follow link [event `translated`](#translated)

**NOTE**: Using **ngx-owl-carousel-o** with options `animateOut` and `animateIn` requires adding `animate.css`. Steps are the following:
1. `yarn add animate.css` or `npm install animate.css`.
2. Add styles to `angular.json`:
    ```json
    "styles": [
        "node_modules/animate.css/animate.min.css"
      ],
    ```

## Options

**ngx-owl-carousel-o** uses the same options as Owl Carousel. Explanations of meanings and usage of options are [Owl Carousel Documentation](https://owlcarousel2.github.io/OwlCarousel2/docs/api-options.html).

**NOTE**: **ngx-owl-carousel-o** has different usage of some of them. Mostly this is about options which require setting `data-` attributes to DOM-elements and which set names of classes and tags in HTML-markup. Usage of such options is explained below.

Options which require setting `data-` attributes are:
* [merge](#merge)
* [dotsData](#dotsdata)
* [URLhashListener](#urlhashlistener)
* [lazyLoad](#lazyload)


### merge
Original Owl Carousel requires setting `data-merge` to each slide besides setting `merge=true`. In this lib `data-merge` is changed to `dataMerge` , wich is `@Input` property of `<ng-template[carouselSlide]>` directive. In order to set it write:
```html
<ng-template carouselSlide [dataMerge]="number">Slide text or html markup</ng-template>
```
  `number` must be 1, 2, 3 or any other integer number. If `dataMerge` isn't provided, its value will be 1 (this is default value).


### autoWidth  
Option `autoWidth=true` is working if user sets `@Input` prop `width` to `<ng-template[carouselSlide]>` directive. Example:
```html
<ng-template carouselSlide [width]="number">Slide text or html markup</ng-template>
```
When `width` isn't provided for certain slide and is provided for other slides, firstly it will be 0 (this is default value). At the end it will be calculated as (width of carousel)/(items) (e.g. `carouselWidth=1200` and `items=4`, width of slide will be `1200/4=300`).

In other words the width of slide with unprovided `width` will be set according to how much space in visible carousel window the slide must take. E.g. if there must be 2 visible slides, the width of item will be half of carousel window.

### responsiveBaseElement
Option `responsiveBaseElement` doesn't work. In original Owl Carousel all responsive breakpoints are corresponding to window width. Here they are corresponding to width of element `<div class="owl-carousel">` which takes 100% of its parent element width.

### fallbackEasing
Option `fallbackEasing` doesn't work because it's being used by `$.animate()` in  Owl Carousel created by means of jQuery. There's no such function in Angular.

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
Option `nestedItemSelector` doesn't work.

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
**NOTE**: Setting options in html-template in the way like
```html
<owl-carousel-o [options]="{navText: [ '<i class="fa-chevron-left"></i>', '<i class="fa-chevron-right></i>"' ]}">
  <ng-template carouselSlide>Slide</ng-template>
</owl-carousel-o>
```
will cause template parse error because of double quote put around classes's names _fa-chevron-left_ and _fa-chevron-right_. Creation property e.g. `customOptions` in `component.ts` and writing `[options]="customOptions"` will eliminate this problem. 

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
When there's option `slideBy='page'`, disabled prev or next buttons will rewind carousel to the start or end accordingly. 
When number of pages (dots) is 2 and there's option  `loop=false` changing pages could cause thoughts  something is wrong (when carousel is on first page, click on prev button makes carousel show second page which is the ending of carousel at the same time; in this case next and prev button do the same job). In order to avoid this behavior the number pages must be 3 and more or it's needed to set `loop=true`. 

Number of pages depends on number of all slides and option `items` (e.g. if number of slides is `10` and `items=3`, the number of pages will be `4` (10/3=3.3; 3.3 is rounded to 4)).


### rewind
Documentation of Owl Carousel says the default value of this option is set to `true`, but the code defines it as `false`. In **ngx-owl-carousel-o** its default value set to `false`. 

**WARNING**: options `rewind` and `loop` shouldn't be enabled in one carousel. They do similar job in different ways.

### freeDrag
Option `freeDrag` doesn't have realization. Thus setting it to `true` will give nothing. This option doesn't work even in Owl Carousel written by means of jQuery.

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
where `hashObj` is object with hashes (fragments) of url. `hashObj` could be array. Defining the kind of data store is up to developer. 

**NOTE**: `HashService` uses services `ActivatedRoute` and `Router` for making it possible to navigate by hashes (fragments). The `CarouselModule` imports `RouterModule.forChild()`. And if `RouterModule.forRoot(routes)` isn't imported in main module of application, the problem will appear. `HashService` **won't work**. Thus it's needed to import `RouterModule.forRoot(routes)` in main module of application even in case of creating simple app for testing the work of library.

### lazyLoad
There's no need to set to `<img>` attributes `data-src` and  `data-src-retina` because Angular has its ows realization for `<img>`. In Angular it's better to write `<img [src]="someURL">`. `src` is data-binding, which means Angular will set the value of native attribute `src` of `<img>` after loading its core code. Original Owl Carousel reads `data-src` and set native attribute `src` at needed moment. Of course **ngx-owl-carousel-o** has additional tricks for lazy loading images (better to say content of slides) put into slides. 

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
      customOptions: any = {
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
`(translated)="getPassedData($event)"` is subscribing or attaching to event;

`getPassedData(data: SlidesOutputData)` is method which takes data about active slides.

`activeSlides` is property of `CarouselHolderComponent`, which stores data about active slides


## Plugins
**ngx-owl-carousel-o** has almoast all plugins written on page [Owl Carousel Plugin API](https://owlcarousel2.github.io/OwlCarousel2/docs/dev-plugin-api.html) except **VideoPlugin**. 

### VideoPlugin
This plugin isn't realized. In order to play video use special packages (e.g. [`ngx-embed-video`](https://www.npmjs.com/package/ngx-embed-video); [`ngx-youtube-player`](https://www.npmjs.com/package/ngx-youtube-player) and so on).

It's better to create special component with video and put it in `<ng-template carouselSlide>....</ng-template>`
Example:
```html
<ng-template carouselSlide [dotContent]="content">
    <custom-video [id]="videoId" [url]="someURL" (someEvent)="handlerOfSomeEvent"></custom-video>
</ng-template>
```
`id` and `url` are data-binding properties, defined in component wich contains `<owl-carousel-o>`.

## Tips

### Real examples to help
Some examples of using this lib are displayed in app **demo-owl-carousel**:
- Carousel with `autoWidth=true`. [Typescript part](./apps/demo-owl-carousel/src/app/home/home.component.ts) and [html part](./apps/demo-owl-carousel/src/app/home/home.component.html)
- Carousel with `autoHeight=true`, `URLhashListener=true` and `startPosition='URLHash'`. [Typescript part](./apps/demo-owl-carousel/src/app/home/subhome/subhome.component.ts) and [html part](./apps/demo-owl-carousel/src/app/home/subhome/subhome.component.html)
- Carousel with `autoplay=true`. [Typescript part](./apps/demo-owl-carousel/src/app/present/present.component.ts) and [html part](./apps/demo-owl-carousel/src/app/present/present.component.html)

**NOTE**:  **demo-owl-carousel** could be downloaded and started on own PC. Steps for achieving that are:
- `git clone https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o.git`;
- `yarn` or `npm install`;
- `ng serve` or `ng serve --project=demo-owl-carousel`.


### Tests to help
Also lots of variants of using carousel are in files [carousel.component.spec.ts](./libs/ngx-owl-carousel-o/src/lib/carousel/carousel.component.spec.ts) and [stage.component.spec.ts](./libs/ngx-owl-carousel-o/src/lib/carousel/stage/stage.component.spec.ts).

They contain tests of library. These tests include many functions `it()`. Example: 
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

First argument of `it()` explains how carousel should work with options written in `const html=...`. In this example height of carousel should change automatically: `should change height of carousel [options]="{nav: true, autoHeight: true}"`.

Variable `html` contains html-markup of carousel for `[options]="{nav: true, autoHeight: true}"`. 

However most of html-markups set to `html` are simplified. There's no property `customOptions`, directive `*ngFor` and `<ng-container>` as it is in examples above.

### Managing by carousel from outside its markup
It's possible to move carousel left/right and to needed slide from different places of html-page. Real example is provided in [home.component.html](./apps/demo-owl-carousel/src/app/home/home.component.html)

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
1. Defining in `<owl-carousel-o>` template reference variable `#owlCar`
2. Using it in handlers for events. In code above we see `(click)="owlCar.prev()"`, `(click)="owlCar.next()"` and `(click)="owlCar.to('slide-3')"`. `#owlCar` could be passed as argument of hanlder: `(click)="handler(owlCar)`.
   - `owlCar.prev()` shows previous slide.
   - `owlCar.next()` shows next slide.
   - `owlCar.to('slide-3')` moves carousel to slide with needed `id`. In this case `slide-3` is needed slide. **NOTE**: it's needed to supply own ids to slides. Code above has `[id]="item.id"`. This is the way of supplying `ids`.

## License
This project is licensed under the terms of the [MIT License](./LICENSE).