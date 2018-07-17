import { TestBed, inject } from '@angular/core/testing';

import { CarouselService } from './carousel.service';
import { CustomEventsService } from './custom-events.service';

describe('CarouselService', () => {
  let carouselService: CarouselService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarouselService, CustomEventsService]
    });
    carouselService = TestBed.get(CarouselService);
  });

  it('should be created', inject([CarouselService], (service: CarouselService) => {
    expect(service).toBeTruthy();
  }));

  it('should add new key to prop _invalidated; method invalidate()', () => {
    const result = carouselService.invalidate('move');
    expect(result[0]).toBe('move');
    expect(carouselService.invalidated.hasOwnProperty('move')).toBe(true);
  });

  it('should add new state to carouselService.states; call method enter()', () => {
    expect(carouselService.states.current.hasOwnProperty('move')).toBe(false, 'there\'s no state move');
    carouselService.enter('move');
    expect(carouselService.states.current.hasOwnProperty('move')).toBe(true, 'has state move');
    expect(carouselService.states.current['move']).toBe(1);
  });

  it('should add new state to carouselService.states and after calling leave() decrease value of current state', () => {
    carouselService.enter('move');
    expect(carouselService.states.current['move']).toBe(1);
    carouselService.leave('move');
    expect(carouselService.states.current['move']).toBe(0);
  });

  it('should the carousel be in a state "move"', () => {
    carouselService.enter('move');
    let state = carouselService.is('move');
    expect(state).toBe(true);

    carouselService.leave('move');
    state = carouselService.is('move');
    expect('' + state).toBe('0', 'state is 0 after leaving');

  });

});
