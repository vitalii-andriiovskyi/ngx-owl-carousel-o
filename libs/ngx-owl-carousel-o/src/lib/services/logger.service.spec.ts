import { ErrorHandler } from '@angular/core';
import { OwlLogger } from './logger.service';
import { inject, TestBed } from '@angular/core/testing';


describe('Logger Service', () => {
  let logSpy;
  let warnSpy;
  beforeEach(() => {
    logSpy = spyOn(console, 'log');
    warnSpy = spyOn(console, 'warn');
    TestBed.configureTestingModule({
      providers: [
        OwlLogger,
        { provide: ErrorHandler, useClass: MockErrorHandler }
      ]
    });
  });

  it('should be created', inject([OwlLogger], (service: OwlLogger) => {
    expect(service).toBeTruthy();
  }));

  describe('log', () => {
    it('should delegate to console.log', inject([OwlLogger], (logger: OwlLogger) => {
      logger.log('param1', 'param2', 'param3');
      expect(logSpy).toHaveBeenCalledWith('param1', 'param2', 'param3');
    }));
  });

  describe('warn', () => {
    it('should delegate to console.warn', inject([OwlLogger], (logger: OwlLogger) => {
      logger.warn('param1', 'param2', 'param3');
      expect(warnSpy).toHaveBeenCalledWith('param1', 'param2', 'param3');
    }));
  });

  describe('error', () => {
    it('should delegate to ErrorHandler', inject([OwlLogger, ErrorHandler], (logger: OwlLogger, errorHandler: ErrorHandler) => {
      const err = new Error('some error message');
      logger.error(err);
      expect(errorHandler.handleError).toHaveBeenCalledWith(err);
    }));
  });

});



class MockErrorHandler implements ErrorHandler {
  handleError = jasmine.createSpy('handleError');
}
