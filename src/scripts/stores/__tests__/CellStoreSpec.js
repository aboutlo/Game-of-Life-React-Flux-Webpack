jest.dontMock('../CellStore');
//jest.dontMock('object-assign');

describe('CellStore', () =>{

  var AppDispatcher;
  var subject;

  beforeEach(()=>{
    AppDispatcher = require ('../../dispatcher/AppDispatcher');
    subject = require ('../CellStore');
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('register a callback with a register', ()=>{
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

});
