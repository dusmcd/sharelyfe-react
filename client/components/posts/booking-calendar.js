import React from 'react'
import Calendar from 'react-calendar'
import { connect } from 'react-redux'
import { setDateAction } from '../../store'
import { formatDate } from '../utility/utility-funcs'

class BookingCalendar extends React.Component {
  componentDidMount() {
    // black out dates that are unavailable
  }

  dateIsReserved = ({ date }) => {
    console.log('POST:', this.props.post)
  }

  handleDateSelection = dates => {
    this.props.setDates(dates)
  }
  render() {
    const { post, isFetching } = this.props
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
