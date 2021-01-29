"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var test = function test() {
  var a = new _promise.default();
  var array = [1, 2, 3, 4];
  (0, _includes.default)(array).call(array, function (item) {
    return item > 2;
  });
};

var Person = function Person() {
  (0, _classCallCheck2.default)(this, Person);
};

function testFunc() {
  return _testFunc.apply(this, arguments);
}

function _testFunc() {
  _testFunc = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return test();

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _testFunc.apply(this, arguments);
}
