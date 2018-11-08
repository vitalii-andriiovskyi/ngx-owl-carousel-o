# Contributing

The [issue tracker](https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o/issues) is the preferred channel for bug reports, feature requests, and submitting pull requests.

## Bug reports

A bug is a **demonstrable, reproducible problem** that is caused by the code in the repository. Good bug reports are extremely helpful, so thanks!

Guidelines for bug reports:

  1. Use the GitHub issue search — check if the issue has already been reported.

  2. Check if the issue has been fixed — try to reproduce it using the latest `develop` branch in the repository.

  3. Isolate the problem - you NEED to provide a live example — ideally also create a reduced test case. This [StackBlitz](https://stackblitz.com/) is helpful template you can fork or clone.
  
Example:

> Short and descriptive example bug report title
>
> A summary of the issue and the browser/OS environment in which it occurs. If suitable, include the steps required to reproduce the bug.
>
>   1. This is the first step
>   2. This is the second step
>   3. Further steps, etc.
>
> `<url>` - a link to the reduced test case
>
> Any other information you want to share that is relevant to the issue being reported. This might include the lines of code that you have identified as causing the bug, and potential solutions (and your opinions on their merits).

## Adding new features
This library is built by means of [NRWL](https://nrwl.io/nx/guide-getting-started). Some information about NRWL is on page [NxExamples](https://github.com/nrwl/nx-examples/blob/master/README.md).

It's recommended to follow these steps for adding new features:
1. Reading section [**Structure of lib**](#structure-of-lib).

2. Forking project (detail info is on page [GitHub - Contributing to a Project](https://git-scm.com/book/en/v2/GitHub-Contributing-to-a-Project); also this [link](https://github.com/OwlCarousel2/OwlCarousel2/blob/develop/CONTRIBUTING.md#pull-requests) can help). Creating new branches must be from `develop` branch.

3. Pulling requests and making changes.

4. Launching existing tests and writing new tests (this step can't be avoided). To launch tests run `ng test ngx-owl-carousel-o`. There'll be an issue on this step. The way of avoiding it is below. __It's gone with Angular 7__.

5. When everything is done and tests are passing, push your topic branch up to your fork and open a Pull Request.

### Issue with testing 
This corresponds to lib of version `<1.0.0` as it relies on Angular `^6.0.1`. `ngx-owl-carousel-o >=1.0.0` relies on Angular `^7.0.0` which uses Typescript 3.1.6.

I used `Touch` object for testing touch-events. `triggerTouchEvent()` function creates this object. 
```typescript
function triggerTouchEvent(element: HTMLElement, eventType: string, evtObj: any) {
  const evtSet = {
    identifier: Date.now(),
    target: element,
    radiusX: 2.5,
    radiusY: 2.5,
    rotationAngle: 10,
    force: 0.5,
  };

  const touchObj = new Touch({...evtSet, ...evtObj});

  const touchEvent = new TouchEvent(eventType, {
    cancelable: true,
    bubbles: true,
    touches: [touchObj],
    targetTouches: [],
    changedTouches: [touchObj],
    shiftKey: true,
  });

  element.dispatchEvent(touchEvent);
}
```

Logic in code `const touchObj = new Touch({...evtSet, ...evtObj});` is accomplished according to documentation about touch-events. But creators of typescript had defined the creating of `Touch` object without arguments. This is about `typescript 2.7.2`. Such version is used by Angular compiler (`>= 2.7.2 && <2.8.0`). And the last one throws `error TS2554: Expected 0 arguments, but got 1`. 
After that Chrome can't get opened and tests don't start. 

**WORKAROUND**: I make small change in any testing file after seeing the mistake in `cmd` and tests start again making everything fine. However warning about mistake appears constantly.

Updating `typescript` to version `3.0.1` solves issue, but Angular compiler throws error saying the version is too new. It requires version `>= 2.7.2 && <2.8.0`. It seems future version of framework will use newer version of typescript. Hope it will be soon.

## Structure of lib

Library **ngx-owl-carousel-o** has such a structure (simplified version):

![ngx-owl-carousel-o schema](http://coder.cc.ua/img/owl-carousel-o-schema.png "Schema of ngx-owl-carousel-o")

Presented above schema is simplified version of library. There are several more services, but they just supply `document` and `window` objects. 

The core service is `CarouselService`. Its content could by classified in such a way:
1. Properties which contain data about different states of carousel, custom options and settings. Mostly they are private.
2. Methods for evaluating, changing and exposing states of carousel, defining settings according to users and defaults options. Some of these methods are available to all services and components of this library.
3. Properties which contain data for representing View. They are public and could be changed by any service.
4. Properties which contain `Subject<T>` intended for notifying about special change.
5. Methods which make properties holding `Subject<T>` become `Observable`. 

This service is being used by any service and component of library. It contains main data, changes them, builds on their base new data for Views and passes the last one to `CarouselComponent` and `StageComponent`. All other services and even components use its methods for reading some data and making some job.  

All services are provided in `CarouselComponent`. This allows to use  `CarouselService` as closed data store for one carousel. If the user wants to create a lot of carousels, they will have their own data store. Thus every carousel will work independently. 

Also it's worth to say, `CarouselComponent` injects every service even though it doesn't uses any of methods of some services. This is required for initializing services. 

### Notification system
It's based on `Subject<T>`. All `Subject<T>` are in `CarouselService` and are exposed through special methods as observable (one of this methods is `getInitializedState()`).
```typescript
getInitializedState(): Observable<string> {
		return this._initializedCarousel$.asObservable()
  }
```
Method `next()` of every `Subject<T>` is called in method `_trigger(name: string, data?: any, namespace?: string, state?: string, enter?: boolean)`.
Example of calling `_trigger`:
```typescript
  this._trigger('translated');
```

Every service and component subscribes to needed `Subject<T>` exposed as Observable in method `spyDataStreams()`.

Mostly services get notified by type of message (event) and some conditions and after that they react accordingly to type of message (event) and condition. Reaction consist in calling some methods which read data in `CarouselService` and change data which represent View and are being held in `CarouselService`. Notifications system doesn't pass data mostly. 
When job of a certain service is finished it notifies about it by calling method `this.carouselService.sendChanges()`. This method passes data for representing View to components.

### Schema of working library
1. `CarouselComponent` gets created.
2. `CarouselComponent` reads options and included directives `CarouselSlideDirective` which are slides.
3. `CarouselComponent` call methods `this.carouselService.setup(args)` and `this.carouselService.initialize(args)`.
4. `CarouselService` sets options comparing defaults and user's options.
5. `CarouselService` defines current settings.
6. `CarouselService` evaluates all data for defining current states of carousel.
7. `CarouselService` runs methods locating in prop `_pipe`. They update data for View.
8. Method `sendChanges()` is being called.
9. `CarouselComponent` and `StageComponent` see changes and update Views.

Navigation and any other changes caused by users actions initiate calling method from corresponding service. Then steps 6-8 are repeating. 

### Data models
The most important data models are `OwlOptions` and `SlideModel`. 

`OwlOptions` is model of all options which can be set by developer. 

`OwlCarouselOConfig` is class with defaults values of options. 

`OwlOptionsMockedTypes` is copy of OwlOptions but its all properties have `string` value showing certain type. It's used for validation options defined by developers and reset values for those options which have wrong type. If resetting of option happens, console shows notification. 

Method `_validateOptions()` validates options defined by developer.

Method `setOptions()` rewrites defaults options into users options.

`SlideModel` is model of every slide. This model is being using as type of `slidesData` which manage the View of slides.

Method `_defineSlidesData()` makes initial defining of `slidesData`. Changing this method is recommended when `CarouselSlideDirective` gets expanded by new prop and it must be reflected in View. 
If new prop of `SlideModel` and accordingly `slideData` is evaluated by new service it could be set and populated by value in that service.  


**By submitting a patch, you agree to allow the project owner to license your work under the terms of the [MIT License](LICENSE).**