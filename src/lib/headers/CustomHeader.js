import React from 'react'
import PropTypes from 'prop-types'
import { TimelineHeadersConsumer } from './HeadersContext'
import { TimelineStateConsumer } from '../timeline/TimelineStateContext'
import { iterateTimes, calculateXPositionForTime } from '../utility/calendar'

export class CustomHeader extends React.Component {
  static propTypes = {
    //component props
    children: PropTypes.func.isRequired,
    unit: PropTypes.string.isRequired,
    timeSteps: PropTypes.object.isRequired,
    //Timeline context
    visibleTimeStart: PropTypes.number.isRequired,
    visibleTimeEnd: PropTypes.number.isRequired,
    canvasTimeStart: PropTypes.number.isRequired,
    canvasTimeEnd: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    showPeriod: PropTypes.func.isRequired,
    props: PropTypes.object,
    getLeftOffsetFromDate: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props)
    const {
      canvasTimeStart,
      canvasTimeEnd,
      canvasWidth,
      unit,
      timeSteps,
      showPeriod,
      getLeftOffsetFromDate,
    } = props
    const ratio = this.calculateRatio(
      canvasWidth,
      canvasTimeEnd,
      canvasTimeStart
    )
    const intervals = this.getHeaderIntervals({
      canvasTimeStart,
      canvasTimeEnd,
      canvasWidth,
      unit,
      timeSteps,
      showPeriod,
      getLeftOffsetFromDate,
    })

    this.state = {
      intervals,
      ratio
    }
  }

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.canvasTimeStart !== this.props.canvasTimeStart ||
      nextProps.canvasTimeEnd !== this.props.canvasTimeEnd ||
      nextProps.canvasWidth !== this.props.canvasWidth ||
      nextProps.unit !== this.props.unit ||
      nextProps.timeSteps !== this.props.timeSteps ||
      nextProps.showPeriod !== this.props.showPeriod ||
      nextProps.children !== this.props.children
    ) {
      return true
    }
    return false
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.canvasTimeStart !== this.props.canvasTimeStart ||
      nextProps.canvasTimeEnd !== this.props.canvasTimeEnd ||
      nextProps.canvasWidth !== this.props.canvasWidth ||
      nextProps.unit !== this.props.unit ||
      nextProps.timeSteps !== this.props.timeSteps ||
      nextProps.showPeriod !== this.props.showPeriod
    ) {
      const {
        canvasTimeStart,
        canvasTimeEnd,
        canvasWidth,
        unit,
        timeSteps,
        showPeriod,
        getLeftOffsetFromDate,
      } = nextProps
      const ratio = this.calculateRatio(
        canvasWidth,
        canvasTimeEnd,
        canvasTimeStart
      )
      const intervals = this.getHeaderIntervals({
        canvasTimeStart,
        canvasTimeEnd,
        canvasWidth,
        unit,
        timeSteps,
        showPeriod,
        getLeftOffsetFromDate,
      })

      this.setState({ intervals, ratio })
    }
  }

  getHeaderIntervals = ({
    canvasTimeStart,
    canvasTimeEnd,
    unit,
    timeSteps,
    getLeftOffsetFromDate,
  }) => {
    const intervals = []
    iterateTimes(
      canvasTimeStart,
      canvasTimeEnd,
      unit,
      timeSteps,
      (startTime, endTime) => {
        const left = getLeftOffsetFromDate(startTime.valueOf())
        const right = getLeftOffsetFromDate(endTime.valueOf())
        const width = right-left
        intervals.push({
          startTime,
          endTime,
          labelWidth: width,
          left,
        })
      }
    )
    return intervals
  }

  rootProps = {
    style: {
      position: 'relative'
    }
  }

  getRootProps = (props = {}) => {
    const { style } = props
    return {
      style: Object.assign({}, style ? style : {}, {
        position: 'relative',
        width: this.props.canvasWidth
      })
    }
  }

  getIntervalProps = (props = {}) => {
    const { interval, style } = props
    if (!interval) throw new Error("you should provide interval to the prop getter")
    const { startTime, labelWidth, left } = interval
    return {
      style: this.getIntervalStyle({
        style,
        startTime,
        labelWidth,
        canvasTimeStart: this.props.canvasTimeStart,
        unit: this.props.unit,
        ratio: this.state.ratio,
        left,
      }),
      key: `label-${startTime.valueOf()}`
    }
  }

  calculateRatio(canvasWidth, canvasTimeEnd, canvasTimeStart) {
    return canvasWidth / (canvasTimeEnd - canvasTimeStart)
  }

  getIntervalStyle = ({ startTime, canvasTimeStart, ratio, unit, left,labelWidth, style, }) => {

    return {
      ...style,
      left,
      width: labelWidth,
      position: 'absolute'
    }
  }

  getStateAndHelpers = () => {
    const {
      canvasTimeStart,
      canvasTimeEnd,
      unit,
      showPeriod,
      timelineWidth,
      visibleTimeStart,
      visibleTimeEnd
    } = this.props
    //TODO: only evaluate on changing params
    return {
      timelineContext: {
        timelineWidth,
        visibleTimeStart,
        visibleTimeEnd,
        canvasTimeStart,
        canvasTimeEnd
      },
      headerContext: {
        unit,
        intervals: this.state.intervals
      },
      getRootProps: this.getRootProps,
      getIntervalProps: this.getIntervalProps,
      showPeriod
    }
  }

  render() {
    const props = this.getStateAndHelpers()
    return this.props.children(props, this.props.props)
  }
}

const CustomHeaderWrapper = ({ children, unit, props }) => (
  <TimelineStateConsumer>
    {({ getTimelineState, showPeriod, getLeftOffsetFromDate }) => {
      const timelineState = getTimelineState()
      return (
        <TimelineHeadersConsumer>
          {({ timeSteps }) => (
            <CustomHeader
              children={children}
              timeSteps={timeSteps}
              showPeriod={showPeriod}
              unit={unit ? unit : timelineState.timelineUnit}
              {...timelineState}
              props={props}
              getLeftOffsetFromDate={getLeftOffsetFromDate}
            />
          )}
        </TimelineHeadersConsumer>
      )
    }}
  </TimelineStateConsumer>
)

CustomHeaderWrapper.propTypes = {
  children: PropTypes.func.isRequired,
  unit: PropTypes.string,
  props: PropTypes.object,
}

export default CustomHeaderWrapper
