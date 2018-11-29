# ngx-owl-carousel-o

**ngx-owl-carousel-o** is built for Angular >=6.0.0. It doesn't use jQuery. 

The version `1.x.x` relies on Angular 7. If it's needed to use the library for Angular 6, install the v0.1.0 by running the command `yarn add ngx-owl-carousel@0.1.0` or `npm i ngx-owl-carousel-o@0.1.0`.

The version `v1.0.2` adds the automatic disabling of logging in production mode and re-rendering of the carousel if the array with slides data changes.

The version `v1.0.1` has the following changes:
1. Added checking for the number of slides. If there are no slides to show, the carousel won't get rendered. 
2. Correction of logging in cases when the option `items` is bigger than the number of slides or is equal to it:
    - if it's bigger, the console will show the notification  `The option 'items' in your options is bigger than the number of slides. This option is updated to the current number of slides and the navigation got disabled`;
    - if it equals the number of slides and the developer enabled navigation buttons or dots, the console will show the message: `Option 'items' in your options is equal to the number of slides. So the navigation got disabled`.

##### Table of Contents
- [Get started](#get-started)
- [Options](#options)
- [Tag `<a>` in the slide. Directive `owlRouterLink`](#owlRouterLink)
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

**NOTE**:Each slide has an `id`. If it isn't supplied like in the example, the code generates it automatically and expose one when the event `translated` fires. Info about this event is below. Follow the link [event `translated`](#translated)

**NOTE**: Using **ngx-owl-carousel-o** with options `animateOut` and `animateIn` requires adding `animate.css`. Steps are the following:
1. `yarn add animate.css` or `npm install animate.css`.
2. Add styles to `angular.json`:
    ```json
    "styles": [
        "node_modules/animate.css/animate.min.css"
      ],
    ```

## Options

**ngx-owl-carousel-o** uses the same options as Owl Carousel. Explanations of meanings and the usage of options are in [Owl Carousel Documentation](https://owlcarousel2.github.io/OwlCarousel2/docs/api-options.html).

**NOTE**: **ngx-owl-carousel-o** has the different usage of some of them. Mostly this is about options which require setting `data-` attributes to DOM-elements and which set names of classes and tags in the HTML-markup. The usage of these options is explained below.

Options which require setting `data-` attributes are:
* [merge](#merge)
* [dotsData](#dotsdata)
* [URLhashListener](#urlhashlistener)
* [lazyLoad](#lazyload)


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
Option `info` doesn't work.

### navElement, navContainer, navContainerClass, navClass, dotContainer, dotClass and dotsClass
These options don't work.

| Option                                | Explanation                                                                              |
| -------------------------------       | -----------------------------------------------------------------------------------------|
| navElement: 'div'                     | this tag is set explicitly in the View of CarouselComponent                                  |
| navContainer: false   	              | is removed                                                                               |
| navContainerClass: 'owl-nav'          | this css-class is set explicitly in the View of CarouselComponent                            |
| navClass: [ 'owl-prev', 'owl-next' ]  | this css-class is set explicitly in the View of CarouselComponent                            |
| dotClass: 'owl-dot'                   | this css-class is set explicitly in the View of CarouselComponent                            |
| dotsClass: 'owl-dots'                 | this css-class is set explicitly in the View of CarouselComponent                            |
| dotsContainer: false  	              | is removed                                                                               |


### nestedItemSelector
The option `nestedItemSelector` doesn't work.

### itemElement, itemClass, stageElement, stageOuterClass, stageClass, refreshClass, loadedClass, loadingClass, rtlClass, responsiveClass, dragClass and grabClass
These options don't work.

| Option                            | Explanation                                                                                  |
| -------------------------------   | ---------------------------------------------------------------------------------------------|
| itemElement: 'div'                | this tag is set explicitly in the View                                                           |
| itemClass: 'owl-item' 	          | this css-class is set explicitly in the View                                                     |
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

### URLhashListener
When the option  `URLhashListener=true`, it's required to define the `@Input` prop `dataHash` in `<ng-template carouselSlide>`: 
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

**NOTE**: `HashService` uses services `ActivatedRoute` and `Router` for making it possible to navigate by hashes (fragments). The `CarouselModule` imports `RouterModule.forChild()`. And if `RouterModule.forRoot(routes)` isn't imported in the main module of an application, the problem will appear. `HashService` **won't work**. Thus it's needed to import `RouterModule.forRoot(routes)` in the main module of an application even in case the of creating the simple app for testing the work of the library.

### lazyLoad
There's no need to set to `<img>` attributes `data-src` and  `data-src-retina` because Angular has its own realization for `<img>`. In Angular it's better to write `<img [src]="someURL">`. `src` is the data-binding, which means Angular will set the value to the native attribute `src` of `<img>` after loading its core code. Original Owl Carousel reads `data-src` and sets the native attribute `src` at needed moment. Of course, **ngx-owl-carousel-o** has additional tricks for lazy loading images (better to say the content of slides) put into slides.

## owlRouterLink

The directive `owlRouterLink` is introduced for making impossible the navigating between components while the carousel is dragging. 

This directive has the same features as the native `routerLink` directive. One exception is the property `stopLink`. It prevents the navigating to another component. 

This directive is included into `CarouselModule`, which must be imported into a needed module before using the `ngx-owl-carousel-o`. So, to use this directive, you just need to write it inside the needed slide.

Example of usage this directive:
```html
  <owl-carousel-o [options]="customOptions" (dragging)="isDragging = $event">
        
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
When the dragging of the carousel starts, the  `dragging` event notifies about it by passing value `true` which is assigned to the `isDraggable` property. Then this property is passed into  `owlRouterLink` through `stopLink`. Directive gets aware of dragging the carousel and prevents any navigations. 

When the dragging of the carousel is finished, `dragging` passes `false`. `isDraggable` gets updated, which causes the change of `stopLink`. Now its value is `false`. This enables navigating during the next simple click on `<a>` locating in the slide unless new dragging starts. 

So, to use `<a>` in any slide, it's recommended to:
- use `dragging` event and property `isDragging` (or named differently);
- use `owlRouterLink` directive;
- use `stopLink` property of `owlRouterLink`. It's needed to pass to this prop `isDragging`. Using of `stopLink` is required. 

The real example is [here](./apps/demo-owl-carousel/src/app/link/link.component.html).

The `<a href="someUrl">` has the automatic preventing navigation during dragging. 

## Events
There are two events `translated` and `dragging`.

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
`(translated)="getPassedData($event)"` is the subscription or attaching to the event;

`getPassedData(data: SlidesOutputData)` is the method which takes data about active slides.

`activeSlides` is the property of `CarouselHolderComponent`, which stores data about active slides

### dragging
The event `dragging` fires after that the user starts dragging the carousel. The value exposed by this event is `true`. When the dragging of the carousel is finished and the event `translated` is fired `dragging` fires again but its payload has value `false`. This event is needed for the cases when slide should contain the tag `<a>` with the `routerLink` directive.

    Example of using this event:
    ```html
      <owl-carousel-o [options]="customOptions" (dragging)="isDragging = $event">
            
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
    `(dragging)="isDragging = $event"` This expression is using the `dragging` event and has the property `isDragging` which should be created in the component hosting the `<ngx-owl-carousel-o>`.

    `$event` is the payload of the event. It can be `true` or `false`.
    The real example is [here](./apps/demo-owl-carousel/src/app/link/link.component.html).

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
- The carousel with `autoWidth=true`. [Typescript part](./apps/demo-owl-carousel/src/app/home/home.component.ts) and [HTML part](./apps/demo-owl-carousel/src/app/home/home.component.html)
- The carousel with `autoHeight=true`, `URLhashListener=true` and `startPosition='URLHash'`. [Typescript part](./apps/demo-owl-carousel/src/app/home/subhome/subhome.component.ts) and [HTML part](./apps/demo-owl-carousel/src/app/home/subhome/subhome.component.html)
- The carousel with `autoplay=true`. [Typescript part](./apps/demo-owl-carousel/src/app/present/present.component.ts) and [HTML part](./apps/demo-owl-carousel/src/app/present/present.component.html)

**NOTE**:  **demo-owl-carousel** could be downloaded and started on own PC. Steps for achieving that are:
- `git clone https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o.git`;
- `yarn` or `npm install`;
- `ng serve` or `ng serve --project=demo-owl-carousel`.


### Tests to help
Also, lots of variants of using carousel are in files [carousel.component.spec.ts](./libs/ngx-owl-carousel-o/src/lib/carousel/carousel.component.spec.ts) and [stage.component.spec.ts](./libs/ngx-owl-carousel-o/src/lib/carousel/stage/stage.component.spec.ts).

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
It's possible to move the carousel left/right and to needed slide from different places of the html-page. The real example is provided in [home.component.html](./apps/demo-owl-carousel/src/app/home/home.component.html)

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
2. Using it in handlers for events. In the code above, we see `(click)="owlCar.prev()"`, `(click)="owlCar.next()"` and `(click)="owlCar.to('slide-3')"`. `#owlCar` could be passed as an argument of the hanlder: `(click)="handler(owlCar)`.
   - `owlCar.prev()` shows the previous slide.
   - `owlCar.next()` shows the next slide.
   - `owlCar.to('slide-3')` moves the carousel to the slide with needed `id`. In this case `slide-3` is the needed slide. **NOTE**: it's needed to supply own ids to slides. The code above has `[id]="item.id"`. This is the way of supplying `ids`.

## License
This project is licensed under the terms of the [MIT License](./LICENSE).