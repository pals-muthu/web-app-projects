"use strict";

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('uuid'),
    generateId = _require.v4;

var express = require('express');

var app = express();

var fs = require('fs').promises;

var path = require('path');

var filePath = path.join(process.cwd(), 'db.json');

var writeToFile = function writeToFile(incomingObject) {
  var text = JSON.stringify(incomingObject, null, 2);
  return fs.writeFile(filePath, text, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log('File written successfully');
    }
  });
};

var readFile = function readFile() {
  return fs.readFile(filePath, 'utf8', function (err, contents) {
    if (err) {
      console.error(err);
      return;
    }

    try {
      var jsonString = JSON.parse(contents);
      return jsonString;
    } catch (jsonError) {
      console.error('Error parsing JSON');
    }
  });
};

app.get('/:id', function _callee(req, res) {
  var data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(readFile());

        case 2:
          data = _context.sent;

          if (req.params.id && data[req.params.id]) {
            res.status(200).send({
              status: 'success',
              data: data[req.params.id]
            });
          }

          res.status(404).send({
            status: 'not found',
            data: data[req.params.id]
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.put('/:id', function _callee2(req, res) {
  var data;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(readFile());

        case 2:
          data = _context2.sent;

          if (!(req.params.id && data[req.params.id])) {
            _context2.next = 8;
            break;
          }

          data[req.params.id] = _objectSpread({
            id: req.params.id
          }, req.body);
          _context2.next = 7;
          return regeneratorRuntime.awrap(writeToFile(data));

        case 7:
          res.status(200).send({
            status: 'success',
            data: data[req.params.id]
          });

        case 8:
          res.status(404).send({
            status: 'not found',
            data: data[req.params.id]
          });

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app["delete"]('/:id', function _callee3(req, res) {
  var data;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(readFile());

        case 2:
          data = _context3.sent;

          if (!(req.params.id && data[req.params.id])) {
            _context3.next = 8;
            break;
          }

          delete data[req.params.id];
          _context3.next = 7;
          return regeneratorRuntime.awrap(writeToFile(data));

        case 7:
          res.status(200).send({
            status: 'success',
            data: data[req.params.id]
          });

        case 8:
          res.status(404).send({
            status: 'not found',
            data: data[req.params.id]
          });

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.get('/', function _callee4(req, res) {
  var data;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(readFile());

        case 2:
          data = _context4.sent;
          res.status(200).send({
            status: 'success',
            data: data
          });

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
});
app.post('/', function _callee5(req, res) {
  var data, id;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(readFile());

        case 2:
          data = _context5.sent;

          if (data = (_readOnlyError("data"), '')) {
            data = (_readOnlyError("data"), {});
          }

          ;
          id = generateId();
          data[id] = _objectSpread({
            id: id
          }, req.body);
          _context5.next = 9;
          return regeneratorRuntime.awrap(writeToFile(data));

        case 9:
          res.status(200).send({
            status: 'success',
            data: data[id]
          });

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  });
});
app["delete"]('/', function _callee6(req, res) {
  var data;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          data = '';
          _context6.next = 3;
          return regeneratorRuntime.awrap(writeToFile(data));

        case 3:
          res.status(200).send({
            status: 'success'
          });

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
});
app.listen(4110, function () {
  console.log('listening on port 4110');
});