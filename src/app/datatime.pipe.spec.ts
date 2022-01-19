import { months } from 'moment';
import { DatatimePipe } from './datatime.pipe';

describe('DatatimePipe', () => {
  it('create an instance', () => {
    const pipe = new DatatimePipe();
    expect(pipe).toBeDefined()
  });
  it('create an transform',()=>
  {
    const pipe =new DatatimePipe()
    expect(pipe.transform(new Date)).not.toEqual('null(new date)');
    expect(pipe.transform(null)).toBeDefined();
  });
  // it('create an return',()=>
  // {
  //   const pipe =new DatatimePipe()
  //   expect(pipe.transform(null)).toEqual('null');
  // })
});
