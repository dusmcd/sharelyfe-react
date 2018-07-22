import React from 'react'
import Calendar from 'react-calendar'
import { connect } from 'react-redux'
import { setDateAction } from '../../store'

class BookingCalendar extends React.Component {
  componentDidMount() {
    // black out dates that are unavailable
  }

  handleDateSelection = dates => {
    // console.log('DATES SELECTED:', dates)
    this.props.setDates(dates)
  }
  render() {
    return <Calendar selectRange onChange={this.handleDateSelection} />
  }
}

const mapDispatch = dispatch => {
  return {
    setDates: dateRange => dispatch(setDateAction(dateRange)),
  }
}

export default connect(
  null,
  mapDispatch
)(BookingCalendar)
