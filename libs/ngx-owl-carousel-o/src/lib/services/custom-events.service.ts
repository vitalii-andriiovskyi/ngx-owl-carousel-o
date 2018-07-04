import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

export class EventData {
  /**
   * contains Subject - emiter of new values
   */
  evtEngine: Subject;
  /**
   * array of handlers
   */
  handlers: any[];
  /**
   * Subscriprion for Subject contained by prop 'evtEngine'
   */
  subscription?: Subscription;
}

@Injectable({
  providedIn: 'root'
})
export class CustomEventsService {
  /**
   * contains Subjects for every event and array of functions for each event
   */
  subjects: {[key: string]: EventData} = {};

  /**
   * hasOwnProperty of Object
   */
  hasOwnProp = {}.hasOwnProperty;

  constructor() {
    // const handler1: any = function (data) {
    //   console.log('data: ' + data);
    // }
    // const handler2: any = function (data) {
    //   console.log('data2: ' + data);
    // }

    // this.listen('data', handler1);
    // this.listen('data', handler2);
    // this.emit('data', 'foo');
    // // => data: foo
    // console.log(this.subjects);
    // // Destroy the subscription
    // // this.unsubscribeAll();
    // this.emit('data', 'foo');
    // this.off('data', handler1);

    // console.log(this.subjects);
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
      this.subjects[fnName] = { evtEngine: new Subject() };
    }
    this.subjects[fnName].evtEngine.next(data);
  }

  /**
   * creates custom event and attaches handler to it
   * @param name name of event
   * @param handler handler
   */
  listen(name: string, handler: any) {
    const fnName = this.createName(name);

    if (!this.subjects[fnName]) {
      this.subjects[fnName] = { evtEngine: new Subject() };
    }

    if (!this.subjects[fnName].subscription) {
      this.subjects[fnName].subscription = this.subjects[fnName].evtEngine.subscribe(
        data => {
          this.subjects[fnName].handlers.forEach(element => {
            element(data);
          });
        }
      );
    }

    if (!this.subjects[fnName].handlers) {
      this.subjects[fnName].handlers = [handler];
    } else {
      this.subjects[fnName].handlers.push(handler);
    }
  }

  /**
   * delete handler from array of handlers of certain event.
   * it can just identify function by its name (more precisely by link on it);Maybe it can create difficulties in the future
   */
  off(name: string, handler: any) {
    const fnName = this.createName(name);
    this.subjects[fnName].handlers = this.subjects[fnName].handlers
    .filter(item => {
      const result = item !== handler;
      return result;
    });
    if (this.subjects[fnName].handlers.length === 0) {
      this.subjects[fnName].subscription.unsubscribe();
      this.subjects[fnName].subscription = null;
    }
  }

  /**
   * unsubsribes and destroys all events
   */
  unsubscribeAll() {
    const subjects = this.subjects;
    for (const prop in subjects) {
      if (this.hasOwnProp.call(subjects, prop)) {
        subjects[prop].subscription.unsubscribe();
      }
    }

    this.subjects = {};
  }
}
