if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('required with all', function() {
  it('should fail', function() {
    var validator = new Validator({
      desert: {
        first: 'icecream',
        second: 'icecream'
      },
      flavour: ''
    }, {
      flavour: 'required_with_all:desert.first,desert.second'
    });
    expect(validator.fails()).to.be.true;
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first('flavour')).to.equal('The flavour field is required when desert.first, desert.second are not empty.');
  });

  it('should pass', function() {
    var validator = new Validator({
      desert: {
        first: 'icecream',
        second: 'icecream'
      },
      flavour: 'chocolate'
    }, {
      flavour: 'required_with_all:desert.first,desert.second'
    });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

  it('should pass (not all required field are set)', function() {
    var validator = new Validator({
      desert: {
        first: 'icecream',
      },
      flavour: ''
    }, {
      flavour: 'required_with_all:desert.first,desert.second'
    });
    expect(validator.passes()).to.be.true;
    expect(validator.fails()).to.be.false;
  });

});
