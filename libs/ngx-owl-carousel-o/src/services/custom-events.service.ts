import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomEventsService {
  /**
   * contains Subjects for every event and array of functions for each event
   */
  subjects: any = {}
  /**
   * contains link of subscriptions for every created event's Subject()
   */
  eventSubscriptions: any = {};
  // subscription: Subscription;
  /**
   * hasOwnProperty of Object
   */
  hasOwnProp = {}.hasOwnProperty;

  constructor() {
  //   this.listen('data', function (data) {
  //     console.log('data: ' + data);
  //   });
  //   this.listen('data', function (data) {
  //       console.log('data2: ' + data);
  //     });

  //   this.emit('data', 'foo');
  // // => data: foo

  // // Destroy the subscription
  // // this.unsubscribeAll();
  // this.eventSubscriptions['data'].unsubscribe();
  // console.log(this.eventSubscriptions);
  // this.emit('data', 'foo');

  }

  /**
   * create name of events Subject in the property this.subjects
   * @param name
   */
  createName(name: string) {
    return '$' + name;
  }

  /**
   * emits event
   * @param name name of event
   * @param data event object or any data which should be consumed by event handler
   */
  emit(name: string, data: any) {
    const fnName = this.createName(name);
    if (!this.subjects[fnName]) {
      this.subjects[fnName] = new Subject();
    }
    this.subjects[fnName].next(data);
  };

  /**
   * creates custom event and attaches handler to it
   * @param name name of event
   * @param handler handler
   */
  listen(name: string, handler: any) {
    const fnName = this.createName(name);

    if (!this.subjects[fnName]) {
      this.subjects[fnName] = new Subject();
    }

    if (!this.eventSubscriptions[fnName]) {
      this.eventSubscriptions[fnName] = this.subjects[fnName].subscribe((data) => {
        this.subjects[`${fnName}.handlers`].forEach(element => {
          element(data);
        });
      });
    }

    if (!this.subjects[`${fnName}.handlers`]) {
      this.subjects[`${fnName}.handlers`] = [handler];
    } else {
      this.subjects[`${fnName}.handlers`].push(handler);
    }

  };

  /**
   * delete handler from array of handlers of certain event.
   * it can just identify function by its name (more precisely by link on it);Maybe it can create difficulties in the future
   */
  off(name: string, handler: any) {
    const fnName = this.createName(name);
    this.subjects[`${fnName}.handlers`] = this.subjects[`${fnName}.handlers`].filter(item => {
      const result = item !== handler;
      return result;
    });
    if (this.subjects[`${fnName}.handlers`].length === 0) {
      this.eventSubscriptions[fnName].unsubscribe();
      this.eventSubscriptions[fnName] = null;
    }
  }

  /**
   * unsubsribes and destroys all events
   */
  unsubscribeAll() {
    const subjects = this.subjects;
    for (const prop in subjects) {
      if (this.hasOwnProp.call(subjects, prop)) {
        subjects[prop].unsubscribe();
      }
    }

    this.subjects = {};
    this.eventSubscriptions = {};
  };
}
