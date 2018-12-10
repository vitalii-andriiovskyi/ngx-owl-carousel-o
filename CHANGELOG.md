# Versions Changes

* [v1.0.4](#v1.0.4)
* [v1.0.3](#v1.0.3)
* [v1.0.2](#v1.0.2)
* [v1.0.1](#v1.0.1)
* [v1.0.0](#v1.0.0)
* [v0.1.2](#v0.1.2)
* [v0.1.1](#v0.1.1)
* [v0.1.0](#v0.1.0)
* [v0.0.5](#v0.0.5)

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
    - if it's bigger, the console will show the notification  `The option 'items' in your options is bigger than the number of slides. This option is updated to the current number of slides and the navigation got disabled`;
    - if it equals the number of slides and the developer enabled navigation buttons or dots, the console will show the message: `Option 'items' in your options is equal to the number of slides. So the navigation got disabled`.

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
    - if it's bigger, the console will show the notification  `The option 'items' in your options is bigger than the number of slides. This option is updated to the current number of slides and the navigation got disabled`;
    - if it equals the number of slides and the developer enabled navigation buttons or dots, the console will show the message: `Option 'items' in your options is equal to the number of slides. So the navigation got disabled`. 
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
    - use `dragging` event and property `isDragging` (or named differently);
    - use `owlRouterLink` directive;
    - use `stopLink` property of `owlRouterLink`. It's needed to pass to this prop `isDragging`. Using of `stopLink` is required. 

    The real example is [here](https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o/blob/develop/apps/demo-owl-carousel/src/app/link/link.component.html).
3. Automatic preventing navigation during dragging and pressing the `<a href="someUrl">` at the same time. 

## v0.0.5
The version `0.0.5` solves the issue [BrowserModule has already been loaded](https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o/issues/1)

The main change is removing `BrowserAnimationsModule` from imports array of `@NgModule` of `CarouselModule`.
So it's needed to import this module in the root module (mostly `AppModule`) of your app.