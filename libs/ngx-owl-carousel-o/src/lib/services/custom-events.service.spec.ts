import { TestBed, inject } from '@angular/core/testing';
import { Subject, Subscription } from 'rxjs';

import { CustomEventsService, EventData } from './custom-events.service';

describe('CustomEventsService', () => {
  let serviceEvents: CustomEventsService;

  let counter = 0;
  const handler1: any = function() {
      counter++;
    }
  const handler2: any = function() {
    counter++;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomEventsService]
    });

    serviceEvents = new CustomEventsService();
  });

  it(
    'should be created',
    inject([CustomEventsService], (service: CustomEventsService) => {
      expect(service).toBeTruthy();
    })
  );

  it('should create right name of event', () => {
    const name = serviceEvents.createName('burn.event');
    expect(name).toBe('$burn.event', 'right name of event');
    expect(name).not.toBe('burn.event', 'shouldn\'t be wrong name of event');
  });

  it('should add 2 events', () => {
    serviceEvents.listen('burn.event', handler1);
    serviceEvents.listen('shine', handler2);
    expect(serviceEvents.subjects.hasOwnProperty('$burn.event')).toBe(true, '$burn.event exists');
    expect(serviceEvents.subjects.hasOwnProperty('$shine')).toBe(true, '$shine event exists');

    expect(serviceEvents.subjects['$burn.event'].handlers.length).toBe(1, '$burn.event has 1 handler');

    const hasSubscription = serviceEvents.subjects['$burn.event'].subscription instanceof Subscription;
    expect(hasSubscription).toBe(true, '$burn.event has subscription');

    serviceEvents.listen('burn.event', handler2);
    expect(serviceEvents.subjects['$burn.event'].handlers.length).toBe(2, '$burn.event has 2 handlers');

  });

  it('should call 2 handlers on $burn.event', () => {
    serviceEvents.listen('burn.event', handler1);
    serviceEvents.listen('burn.event', handler2);
    serviceEvents.emit('burn.event', {});
    expect(counter).toBe(2);
  });

  it('should detach handler (function with reference) from event', () => {
    serviceEvents.listen('burn.event', handler1);
    serviceEvents.listen('burn.event', handler2);
    expect(serviceEvents.subjects['$burn.event'].handlers.length).toBe(2, '$burn.event has 2 handlers');

    serviceEvents.off('burn.event', handler2);
    expect(serviceEvents.subjects['$burn.event'].handlers.length).toBe(1, '$burn.event has 1 handler');
  });

  it('!!!!!!Warning!!!!! shouldn\'t detach handler (function predicate) from event. See explanation given in file "custom-events.service.ts" before method off()', () => {
    serviceEvents.listen('burn.event', handler1);
    serviceEvents.listen('burn.event', () => {console.log('oops...')});
    expect(serviceEvents.subjects['$burn.event'].handlers.length).toBe(2, '$burn.event has 2 handlers');

    serviceEvents.off('burn.event', () => {console.log('oops...')});
    expect(serviceEvents.subjects['$burn.event'].handlers.length).toBe(2, '$burn.event has 2 handler');
  });

  it('should detach all handlers from all events', () => {
    serviceEvents.listen('burn.event', handler1);
    serviceEvents.listen('burn.event', handler2);
    serviceEvents.listen('shine', handler2);

    expect(serviceEvents.subjects.hasOwnProperty('$burn.event')).toBe(true, '$burn.event exists');
    expect(serviceEvents.subjects.hasOwnProperty('$shine')).toBe(true, '$shine event exists');

    serviceEvents.unsubscribeAll();
    expect(serviceEvents.subjects.hasOwnProperty('$burn.event')).toBe(false, '$burn.event doesn\'t exist');
    expect(serviceEvents.subjects.hasOwnProperty('$shine')).toBe(false, '$shine doesn\'t exist');
  });
});
