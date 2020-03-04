import { LastCreatedPipe } from './last-created.pipe';

describe('LastCreatedPipe', () => {
  it('create an instance', () => {
    const pipe = new LastCreatedPipe();
    expect(pipe).toBeTruthy();
  });
});
