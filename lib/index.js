'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Workbook = exports.Sheet = exports.Column = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _fileSaver = require('file-saver');

var _xlsx = require('xlsx');

var _xlsx2 = _interopRequireDefault(_xlsx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i != s.length; ++i) {
    view[i] = s.charCodeAt(i) & 0xFF;
  }return buf;
}

function datenum(v, date1904) {
  if (date1904) v += 1462;
  var epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

function sheet_from_array_of_arrays(data) {
  var ws = {};
  var range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
  for (var R = 0; R != data.length; ++R) {
    for (var C = 0; C != data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      var cell = { v: data[R][C] };
      if (cell.v == null) continue;
      var cell_ref = _xlsx2.default.utils.encode_cell({ c: C, r: R });

      if (typeof cell.v === 'number') cell.t = 'n';else if (typeof cell.v === 'boolean') cell.t = 'b';else if (cell.v instanceof Date) {
        cell.t = 'n';cell.z = _xlsx2.default.SSF._table[14];
        cell.v = datenum(cell.v);
      } else cell.t = 's';

      ws[cell_ref] = cell;
    }
  }
  if (range.s.c < 10000000) ws['!ref'] = _xlsx2.default.utils.encode_range(range);
  return ws;
}

var Column = exports.Column = function (_Component) {
  _inherits(Column, _Component);

  function Column() {
    _classCallCheck(this, Column);

    return _possibleConstructorReturn(this, (Column.__proto__ || Object.getPrototypeOf(Column)).apply(this, arguments));
  }

  _createClass(Column, [{
    key: 'render',
    value: function render() {
      throw new Error('<Column/> is not meant to be rendered.');
    } // eslint-disable-line react/require-render-return

  }]);

  return Column;
}(_react.Component);

Column.propTypes = {
  label: _propTypes2.default.string.isRequired,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]).isRequired
};

var Sheet = exports.Sheet = function (_Component2) {
  _inherits(Sheet, _Component2);

  function Sheet() {
    _classCallCheck(this, Sheet);

    return _possibleConstructorReturn(this, (Sheet.__proto__ || Object.getPrototypeOf(Sheet)).apply(this, arguments));
  }

  _createClass(Sheet, [{
    key: 'render',
    value: function render() {
      throw new Error('<Sheet/> is not meant to be rendered.');
    } // eslint-disable-line react/require-render-return

  }]);

  return Sheet;
}(_react.Component);

Sheet.propTypes = {
  name: _propTypes2.default.string.isRequired,
  data: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.func]).isRequired,
  children: _propTypes2.default.arrayOf(function (propValue, key) {
    var type = propValue[key].type;
    if (type !== Column) {
      throw new Error('<Sheet> can only have <Column>\'s as children. ');
    }
  }).isRequired
};

var Workbook = exports.Workbook = function (_Component3) {
  _inherits(Workbook, _Component3);

  function Workbook(props) {
    _classCallCheck(this, Workbook);

    var _this3 = _possibleConstructorReturn(this, (Workbook.__proto__ || Object.getPrototypeOf(Workbook)).call(this, props));

    _this3.download = _this3.download.bind(_this3);
    _this3.createSheetData = _this3.createSheetData.bind(_this3);
    return _this3;
  }

  _createClass(Workbook, [{
    key: 'createSheetData',
    value: function createSheetData(sheet) {
      var columns = sheet.props.children;
      var sheetData = [_react2.default.Children.map(columns, function (column) {
        return column.props.label;
      })];
      var data = typeof sheet.props.data === 'function' ? sheet.props.data() : sheet.props.data;

      data.forEach(function (row) {
        var sheetRow = [];
        _react2.default.Children.forEach(columns, function (column) {
          var getValue = typeof column.props.value === 'function' ? column.props.value : function (row) {
            return row[column.props.value];
          };
          sheetRow.push(getValue(row) || '');
        });
        sheetData.push(sheetRow);
      });

      return sheetData;
    }
  }, {
    key: 'download',
    value: function download() {
      var _this4 = this;

      var wb = {
        SheetNames: _react2.default.Children.map(this.props.children, function (sheet) {
          return sheet.props.name;
        }),
        Sheets: {}
      };

      _react2.default.Children.forEach(this.props.children, function (sheet) {
        wb.Sheets[sheet.props.name] = sheet_from_array_of_arrays(_this4.createSheetData(sheet));
      });

      var wbout = _xlsx2.default.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
      (0, _fileSaver.saveAs)(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), this.props.filename || 'data.xlsx');
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'span',
        { onClick: this.download },
        this.props.element ? this.props.element : "Download"
      );
    }
  }]);

  return Workbook;
}(_react.Component);

Workbook.propTypes = {
  filename: _propTypes2.default.string,
  element: _propTypes2.default.any,
  children: function children(props, propName, componentName) {
    _react2.default.Children.forEach(props[propName], function (child) {
      if (child.type !== Sheet) {
        throw new Error('<Workbook> can only have <Sheet>\'s as children. ');
      }
    });
  }
};


Workbook.Column = Column;
Workbook.Sheet = Sheet;

exports.default = Workbook;