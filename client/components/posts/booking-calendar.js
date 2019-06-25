import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { connect } from 'react-redux'
import { setStartDateAction, setEndDateAction } from '../../store'
import { formatDate } from '../utility/utility-funcs'
import { Input } from 'semantic-ui-react'

class BookingCalendar extends React.Component {
  dateIsReserved = ({ date }) => {
    const { post } = this.props
    if (post.datesReserved[formatDate(date)]) return true
  }

  handleStartDateSelection = date => {
    this.props.setStartDate(date)
  }

  handleEndDateSelection = date => {
    this.props.setEndDate(date)
  }
  render() {
    const { isFetching, startDate, endDate } = this.props

    if (isFetching) return <div>LOADING...</div>
    return (
      <div className="date-container">
        <div id="start-date">
          <h3>Start Date</h3>
          <DatePicker
            selected={startDate}
            onChange={this.handleStartDateSelection}
            customInput={<Input icon={{ name: 'calendar alternate' }} />}
            placeholderText="Select a start date"
          />
        </div>

        <div id="end-date">
          <h3>End Date</h3>
          <DatePicker
            selected={endDate}
            onChange={this.handleEndDateSelection}
            customInput={<Input icon={{ name: 'calendar alternate' }} />}
            placeholderText="Select an end date"
          />
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    isFetching: state.post.isFetching,
    startDate: state.booking.startDate,
    endDate: state.booking.endDate,
  }
}

const mapDispatch = dispatch => {
  return {
    setStartDate: date => dispatch(setStartDateAction(date)),
    setEndDate: date => dispatch(setEndDateAction(date)),
  }
}

export default connect(
  mapState,
  mapDispatch
)(BookingCalendar)
