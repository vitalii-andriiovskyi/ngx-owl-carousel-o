# Versions Changes

* [v4.0.0](#v400)
* [v3.1.0](#v310)
* [v3.0.1](#v301)
* [v3.0.0](#v300)
* [v2.1.1](#v211)
* [v2.1.0](#v210)
* [v2.0.3](#v203)
* [v2.0.2](#v202)
* [v2.0.1](#v201)
* [v2.0.0](#v200)
* [v1.2.1](#v121)
* [v1.2.0](#v120)
* [v1.1.7](#v117)
* [v1.1.6](#v116)
* [v1.1.6](#v116)
* [v1.1.5](#v115)
* [v1.1.4](#v114)
* [v1.1.3](#v113)
* [v1.1.2](#v112)
* [v1.1.1](#v111)
* [v1.1.0](#v110)
* [v1.0.11](#v1011)
* [v1.0.10](#v1010)
* [v1.0.9](#v109)
* [v1.0.8](#v108)
* [v1.0.7](#v107)
* [v1.0.6](#v106)
* [v1.0.5](#v105)
* [v1.0.4](#v104)
* [v1.0.3](#v103)
* [v1.0.2](#v102)
* [v1.0.1](#v101)
* [v1.0.0](#v100)
* [v0.1.2](#v012)
* [v0.1.1](#v011)
* [v0.1.0](#v010)
* [v0.0.5](#v005)

## v4.0.0

The version `v4.0.0` is generated for Angular 10.

## v3.1.0

The version `v3.1.0` adds feature `autoplayMouseleaveTimeout` to set custom first timeout when the event `mouseleave` fires. It solves the issue [`#88`](https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o/issues/88)

## v3.0.1

The version `v3.0.1` fixes the issue [`#86`](https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o/issues/86)

## v3.0.0

The version `v2.1.1` fixes the issue [`#86`](https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o/issues/86)

## v2.1.1

The version `v2.1.1` fixes the issue [`#86`](https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o/issues/86)

## v2.1.0

The version `v2.1.0` changes typings `Event` into `any` in order to avoid the error `ReferenceError: Event is not defined`.
Also it adds new option `skip_validateItems`.

## v2.0.3

The version `v2.0.3` fixes the bug with `ChangeDetectionStrategy.OnPush`.

## v2.0.2

The version `v2.0.2` adds the option `slideTransition`.

## v2.0.1

The version `v2.0.1` solves the issue [`#38`](https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o/issues/38).

## v2.0.0

The version `v2.0.0` is generated for Angular 8. It's the same as `v1.1.6` but it's compiled by Angular 8.

## v1.2.1

The version `v1.2.1` fixes the issue [`#86`](https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o/issues/86)

## v1.2.0

The version `v1.2.0` changes typings `Event` into `any` in order to avoid the error `ReferenceError: Event is not defined`.
Also it adds new option `skip_validateItems`.

## v1.1.7

The version `v1.1.7` solves the issue [`#38`](https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o/issues/38).

## v1.1.5

The version `v1.1.5` adds the export of `ResponsiveSettings` and `BreakpointOptions` from `public_api.ts`.

## v1.1.4

The version `v1.1.4` adds the export of `OwlOptions` from `public_api.ts`.

## v1.1.3

The version `v1.1.3` fixes the problem with the incorrect job of the option `loop`. Sometimes this option doesn't work and the carousel rewinds itself to the first or the last slide completely without loop effect. The fix is adding delay to the method `to()` of the `CarouselService`. This delay equals 30ms. Details are in the [commit 21f1da8](https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o/commit/21f1da8f1f7a456f48efadc52d8c14ec7413525b)

## v1.1.2

The version `v1.1.2` fixes the issue [`#28`](https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o/issues/28)

## v1.1.1

The version `v1.1.1` fixes the additional problem to issue [`#23`](https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o/issues/23). This is the problem connected with starting the autoplay the carousel after the user switched back to the page with the carousel from another browser tab and the option `autoplay=true`.

## v1.1.0

The version `v1.1.0` adds new event `changed`. This event is the same as `change` except that the payload has data about new `startPosition` and new active slides.

## v1.0.11

The version `v1.0.11` solves issues [`#19`](https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o/issues/19) and [`#20`](https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o/issues/20).

### Changes implemented to solve issue `#19`

Dragging starts when the user moves the cursor on more than 3px. Then the event `dragging` fires. The payload is

```typescript
{
  dragging: true,
  data: SlidesOutputData
}
```

Dragging of the carousel can finish by changing active slides (the carousel scrolls in this case) or by remaining the carousel in the state which was before dragging. The second variant is possible when the user drags the carousel to the left-hand side on less than 30px.
In any case, the event `dragging` fires passing the payload:

```typescript
{
  dragging: false,
  data: SlidesOutputData
}
```

### Issue `#20`

`Router` and `ActivatedRoute` are injected using the decorator `@Optional`. Also, it's added the additional checking for the case of setting `null` to `this.router` and `this.route`.
The `RouterModule` is removed from imports of `CarouselModule`.

## v1.0.10

The version `v1.0.10` fixes the wrong dependencies in `package.json` of `v1.0.9`. The version `v1.0.9` accidentally got  `"@angular/common": "^6.0.0-rc.0 || ^6.0.0",`, not the `"@angular/common": "^7.0.0-rc.0 || ^7.0.0"` and so on.

## v1.0.9

The version `v1.0.9` extends the list of options, which can be configured in the option `responsive` for needed viewports. Earlier, it was possible to configure just the option `items`. This list of options consists of:

* `loop`
* `center`
* `pullDrag`
* `margin`
* `stagePadding`
* `autoHeight`
* `nav`
* `navRewind`
* `slideBy`
* `dots`
* `dotsEach`
* `autoplay`
* `autoplayTimeout`
* `smartSpeed`
* `fluidSpeed`
* `autoplaySpeed`
* `navSpeed`
* `dotsSpeed`
* `dragEndSpeed`
* `responsiveRefreshRate`
* `animateOut`
* `animateIn`
* `mouseDrag`
* `touchDrag`
* `mergeFit`

The option `autoWidth` requires using data-binding property `width`, which is more important to this scenario. It's impossible to manipulate by predefined widths of slides using the option `responsive`. If it's needed to, it must be done by watching the media query object or width of the carousel wrapper and changing the value set in the `width`. The option `responsive` is just helpful for turning off the `autoWidth` for certain viewports.
The same refers to the option `merge`.

## v1.0.8

The version `v1.0.8` fixes the problem with renewing the autoplay of the carousel while switching to a new browser tab and coming back.

>There's one snag. The browser __Edge__ can't renew the autoplay in the case when the user sets the cursor of the mouse over the carousel, switches to another browser tab using a keyboard, and comes back to the tab holding a carousel.

Also, this version unblocks the methods `prev()` and `next()` in the case of disabling the option `nav=false`.

## v1.0.7

The version `v1.0.7` fixes the additional problem to the issue [`#15`](https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o/issues/15). This problem is that when the user leaves the carousel before it gets translated (scrolled), the autoplay doesn't renew.

## v1.0.6

The version `v1.0.6` fixes the issue [`#15`](https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o/issues/15).

## v1.0.5

The version `v1.0.5` refactors the object return by `windowFactory()` and the object return by `documentFactory()`. These two object are for non-browser platform.

## v1.0.4

The version `v1.0.4` refactors the method `to(id)` of `CarouselComponent` removing the forbiddance to scroll the carousel when `nav` or `dots` gets disabled.

## v1.0.3

The version `v1.0.3` adds events `initialized` and `change`, modifies the payload of event `dragging`.
The previous `dragging` payload was `$event = true/false`. Now payload is:

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

## v1.0.2

The version `v1.0.2` adds the automatic disabling of logging in production mode and re-rendering of the carousel if the array with slides data changes.

## v1.0.1

Changes are the following:

1. Added checking for the number of slides. If there are no slides to show, the carousel won't get rendered.
2. Correction of logging in cases when the option `items` is bigger than the number of slides or is equal to it:

    * if it's bigger, the console will show the notification  `The option 'items' in your options is bigger than the number of slides. This option is updated to the current number of slides and the navigation got disabled`;
    * if it equals the number of slides and the developer enabled navigation buttons or dots, the console will show the message: `Option 'items' in your options is equal to the number of slides. So the navigation got disabled`.

## v1.0.0

The version `1.x.x` relies on Angular 7.

## v0.1.2

The version `v1.0.3` adds events `initialized` and `change`, modifies the payload of event `dragging`.
The previous `dragging` payload was `$event = true/false`. Now payload is:

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

## v0.1.1

The version `v0.1.1` has the following changes:

1. Added checking for the number of slides. If there are no slides to show, the carousel won't get rendered.
2. Correction of logging in cases when the option `items` is bigger than the number of slides or is equal to it:
    * if it's bigger, the console will show the notification  `The option 'items' in your options is bigger than the number of slides. This option is updated to the current number of slides and the navigation got disabled`;
    * if it equals the number of slides and the developer enabled navigation buttons or dots, the console will show the message: `Option 'items' in your options is equal to the number of slides. So the navigation got disabled`.
3. The automatic disabling of logging in production mode.
4. Re-rendering of the carousel if the array with slides data changes.

## v0.1.0

The version v0.1.0 has the following changes:

1. New event `dragging`. It fires after that the user starts dragging the carousel. The value exposed by this event is `true`. When the dragging of the carousel is finished and the event `translated` is fired `dragging` fires again but its payload has value `false`. This event is needed for the cases when slide should contain the tag `<a>` with the `routerLink` directive.

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
    The real example is [here](https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o/blob/develop/apps/demo-owl-carousel/src/app/link/link.component.html).

2. The directive `owlRouterLink`. This directive has the same features as the native `routerLink` directive. One exception is `stopLink`. It prevents the navigating to another component. Mainly, it's introduced for making impossible the navigating between components while the carousel is dragging.

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
    * use `dragging` event and property `isDragging` (or named differently);
    * use `owlRouterLink` directive;
    * use `stopLink` property of `owlRouterLink`. It's needed to pass to this prop `isDragging`. Using of `stopLink` is required.

    The real example is [here](https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o/blob/develop/apps/demo-owl-carousel/src/app/link/link.component.html).
3. Automatic preventing navigation during dragging and pressing the `<a href="someUrl">` at the same time.

## v0.0.5

The version `0.0.5` solves the issue [BrowserModule has already been loaded](https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o/issues/1)

The main change is removing `BrowserAnimationsModule` from imports array of `@NgModule` of `CarouselModule`.
So it's needed to import this module in the root module (mostly `AppModule`) of your app.
