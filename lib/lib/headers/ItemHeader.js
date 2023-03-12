'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TimelineStateContext = require('../timeline/TimelineStateContext');

var _CustomHeader = require('./CustomHeader');

var _CustomHeader2 = _interopRequireDefault(_CustomHeader);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _calendar = require('../utility/calendar');

var _generic = require('../utility/generic');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var passThroughPropTypes = {
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  props: _propTypes2.default.object,
  items: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
  itemHeight: _propTypes2.default.number,
  stackItems: _propTypes2.default.bool,
  itemRenderer: _propTypes2.default.func
};

var ItemHeader = function (_React$PureComponent) {
  _inherits(ItemHeader, _React$PureComponent);

  function ItemHeader() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ItemHeader);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ItemHeader.__proto__ || Object.getPrototypeOf(ItemHeader)).call.apply(_ref, [this].concat(args))), _this), _this.getStateAndHelpers = function (props, item, itemDimensions) {
      var timelineWidth = props.canvasWidth,
          visibleTimeStart = props.visibleTimeStart,
          visibleTimeEnd = props.visibleTimeEnd,
          canvasTimeStart = props.canvasTimeStart,
          canvasTimeEnd = props.canvasTimeEnd,
          itemHeight = props.itemHeight;

      return {
        timelineContext: {
          timelineWidth: timelineWidth,
          visibleTimeStart: visibleTimeStart,
          visibleTimeEnd: visibleTimeEnd,
          canvasTimeStart: canvasTimeStart,
          canvasTimeEnd: canvasTimeEnd
        },
        item: item,
        itemContext: {
          dimensions: itemDimensions,
          width: itemDimensions.width
        },
        itemHeight: itemHeight
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ItemHeader, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          keys = _props.keys,
          items = _props.items,
          itemHeight = _props.itemHeight,
          itemRenderer = _props.itemRenderer,
          canvasTimeStart = _props.canvasTimeStart,
          canvasTimeEnd = _props.canvasTimeEnd,
          canvasWidth = _props.canvasWidth,
          stackItems = _props.stackItems;

      var itemDimensions = items.map(function (item) {
        return (0, _calendar.getItemDimensions)({
          item: item,
          keys: keys,
          canvasTimeStart: canvasTimeStart,
          canvasTimeEnd: canvasTimeEnd,
          canvasWidth: canvasWidth,
          groupOrders: {},
          lineHeight: itemHeight,
          itemHeightRatio: 1
        });
      });

      var _stackGroup = (0, _calendar.stackGroup)(itemDimensions, stackItems, itemHeight, 0),
          groupHeight = _stackGroup.groupHeight;

      var height = Math.max(itemHeight, groupHeight);

      return _react2.default.createElement(
        _CustomHeader2.default,
        null,
        function (_ref2) {
          var getRootProps = _ref2.getRootProps;

          return _react2.default.createElement(
            'div',
            _extends({
              className: _this2.props.className
            }, getRootProps({ style: _this2.getRootStyles(height) })),
            items.map(function (item) {
              var itemId = (0, _generic._get)(item, keys.itemIdKey);
              var dimensions = itemDimensions.find(function (itemDimension) {
                return itemDimension.id === itemId;
              }).dimensions;
              return _react2.default.createElement(Item, _extends({
                key: itemId,
                itemRenderer: itemRenderer,
                props: _this2.props.props
              }, _this2.getStateAndHelpers(_this2.props, item, dimensions)));
            })
          );
        }
      );
    }
  }, {
    key: 'getRootStyles',
    value: function getRootStyles(height) {
      return _extends({}, this.props.style, {
        height: height
      });
    }
  }]);

  return ItemHeader;
}(_react2.default.PureComponent);

ItemHeader.propTypes = _extends({
  visibleTimeStart: _propTypes2.default.number.isRequired,
  visibleTimeEnd: _propTypes2.default.number.isRequired,
  canvasTimeStart: _propTypes2.default.number.isRequired,
  canvasTimeEnd: _propTypes2.default.number.isRequired,
  canvasWidth: _propTypes2.default.number.isRequired,
  keys: _propTypes2.default.object.isRequired
}, passThroughPropTypes);
ItemHeader.defaultProps = {
  itemHeight: 30,
  stackItems: false,
  itemRenderer: function itemRenderer(_ref6) {
    var item = _ref6.item,
        getRootProps = _ref6.getRootProps;

    return _react2.default.createElement(
      'div',
      getRootProps({
        style: {
          color: 'white',
          background: 'rgb(33, 150, 243)',
          border: '1px solid rgb(26, 111, 179)'
        }
      }),
      item.title
    );
  }
};

var Item = function (_React$PureComponent2) {
  _inherits(Item, _React$PureComponent2);

  function Item() {
    var _ref3;

    var _temp2, _this3, _ret2;

    _classCallCheck(this, Item);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_ref3 = Item.__proto__ || Object.getPrototypeOf(Item)).call.apply(_ref3, [this].concat(args))), _this3), _this3.getStyles = function () {
      var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var dimensions = arguments[1];
      var itemHeight = arguments[2];

      return _extends({
        position: 'absolute',
        left: dimensions.left,
        top: dimensions.top,
        width: dimensions.width,
        height: itemHeight
      }, style);
    }, _this3.getRootProps = function () {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var style = props.style,
          rest = _objectWithoutProperties(props, ['style']);

      return {
        style: _this3.getStyles(style, _this3.props.itemContext.dimensions, _this3.props.itemHeight),
        rest: rest
      };
    }, _temp2), _possibleConstructorReturn(_this3, _ret2);
  }

  _createClass(Item, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          item = _props2.item,
          timelineContext = _props2.timelineContext,
          itemContext = _props2.itemContext,
          props = _props2.props;

      return this.props.itemRenderer({
        item: item,
        timelineContext: timelineContext,
        itemContext: itemContext,
        getRootProps: this.getRootProps,
        props: props
      });
    }
  }]);

  return Item;
}(_react2.default.PureComponent);

Item.propTypes = {
  item: _propTypes2.default.object.isRequired,
  timelineContext: _propTypes2.default.shape({
    timelineWidth: _propTypes2.default.number,
    visibleTimeStart: _propTypes2.default.number,
    visibleTimeEnd: _propTypes2.default.number,
    canvasTimeStart: _propTypes2.default.number,
    canvasTimeEnd: _propTypes2.default.number
  }).isRequired,
  itemContext: _propTypes2.default.shape({
    dimensions: _propTypes2.default.object,
    width: _propTypes2.default.number
  }).isRequired,
  itemRenderer: passThroughPropTypes['itemRenderer'],
  itemHeight: passThroughPropTypes['itemHeight'],
  props: _propTypes2.default.object
};


var ItemHeaderWrapper = function ItemHeaderWrapper(_ref4) {
  var style = _ref4.style,
      className = _ref4.className,
      props = _ref4.props,
      items = _ref4.items,
      stackItems = _ref4.stackItems,
      itemHeight = _ref4.itemHeight,
      itemRenderer = _ref4.itemRenderer;
  return _react2.default.createElement(
    _TimelineStateContext.TimelineStateConsumer,
    null,
    function (_ref5) {
      var getTimelineState = _ref5.getTimelineState;

      var timelineState = getTimelineState();
      return _react2.default.createElement(ItemHeader, {
        style: style,
        className: className,
        items: items,
        props: props,
        canvasTimeEnd: timelineState.canvasTimeEnd,
        canvasTimeStart: timelineState.canvasTimeStart,
        visibleTimeStart: timelineState.visibleTimeStart,
        visibleTimeEnd: timelineState.visibleTimeEnd,
        canvasWidth: timelineState.canvasWidth,
        keys: timelineState.keys,
        stackItems: stackItems,
        itemHeight: itemHeight,
        itemRenderer: itemRenderer
      });
    }
  );
};

ItemHeaderWrapper.propTypes = _extends({}, passThroughPropTypes);

exports.default = ItemHeaderWrapper;