import { PresentModule } from './present.module';

describe('PresentModule', () => {
  let presentModule: PresentModule;

  beforeEach(() => {
    presentModule = new PresentModule();
  });

  it('should create an instance', () => {
    expect(presentModule).toBeTruthy();
  });
});
