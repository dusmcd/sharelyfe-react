import React from 'react'
import Calendar from 'react-calendar'
import { connect } from 'react-redux'
import { setDateAction } from '../../store'
import { formatDate } from '../utility/utility-funcs'

class BookingCalendar extends React.Component {
  dateIsReserved = ({ date }) => {
    const { post } = this.props
    if (post.datesReserved[formatDate(date)]) return true
  }

  handleDateSelection = dates => {
    this.props.setDates(dates)
  }
  render() {
    const { isFetching } = this.props
    if (isFetching) return <div>LOADING...</div>
    return (
      <Calendar
        selectRange
        onChange={this.handleDateSelection}
        minDate={new Date(Date.now())}
        tileDisabled={this.dateIsReserved}
      />
    )
  }
}

const mapState = state => {
  return {
    isFetching: state.post.isFetching,
  }
}

const mapDispatch = dispatch => {
  return {
    setDates: dateRange => dispatch(setDateAction(dateRange)),
  }
}

export default connect(
  mapState,
  mapDispatch
)(BookingCalendar)
