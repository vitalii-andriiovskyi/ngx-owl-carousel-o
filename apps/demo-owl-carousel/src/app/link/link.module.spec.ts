import { LinkModule } from './link.module';

describe('LinkModule', () => {
  let linkModule: LinkModule;

  beforeEach(() => {
    linkModule = new LinkModule();
  });

  it('should create an instance', () => {
    expect(linkModule).toBeTruthy();
  });
});
