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

Following steps are recommended:
1. Reading section [**Structure of lib**](#structure-of-lib).

2. Forking project (detail info is on page [GitHub - Contributing to a Project](https://git-scm.com/book/en/v2/GitHub-Contributing-to-a-Project); also this [link](https://github.com/OwlCarousel2/OwlCarousel2/blob/develop/CONTRIBUTING.md#pull-requests) can help).

3. Pulling requests and making changes.

4. Launching existing tests and writing new tests (this step can't be avoided). To launch tests run `ng test ngx-owl-carousel-o`. There'll be an issue on this step. The way of avoiding it is below.
  
5. When everything is good and tests are passing, push your topic branch up to your fork and open a Pull Request.

### Issue with testing. 
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

It uses `new` operator and passes special object as argument. These logic is acomplished according to documentation about touch-event. But creators of typescript had defined the creating of 'Touch' object without arguments. This is about `typescript 2.7.2`. Such version is used by Angular compiler (`>= 2.7.2 && <2.8.0`). And the last one throws `error TS2554: Expected 0 arguments, but got 1`. 
After that Chrome can't get opened and tests don't start. 

**WORKAROUND**: I make small change in any testing file after seeing the mistake in `cmd` and test start again making everything fine. However warning about mistake appears constantly.

Updating `typescript` to version `3.0.1` solves issue, but Angular compiler throws error saying the version is too new. It requires version `>= 2.7.2 && <2.8.0`. It seems future version of framework will use newer version of typescript. Hope it will be soon.

## Structure of lib

**By submitting a patch, you agree to allow the project owner to license your work under the terms of the [MIT License](LICENSE).**