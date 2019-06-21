import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { connect } from 'react-redux'
import { setDateAction } from '../../store'
import { formatDate } from '../utility/utility-funcs'

class BookingCalendar extends React.Component {
  constructor() {
    super()
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
    }
    this.handleStartDateSelection = this.handleStartDateSelection.bind(this)
    this.handleEndDateSelection = this.handleEndDateSelection.bind(this)
  }
  dateIsReserved = ({ date }) => {
    const { post } = this.props
    if (post.datesReserved[formatDate(date)]) return true
  }

  handleStartDateSelection(date) {
    console.log('start date changed')
    this.props.setDates(date)
    this.setState({ startDate: date })
  }

  handleEndDateSelection(date) {
    console.log('end date changed')
    this.props.setDates(date)
    this.setState({ endDate: date })
  }
  render() {
    const { isFetching } = this.props
    if (isFetching) return <div>LOADING...</div>
    return (
      <div>
        <h3>Start Date</h3>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleStartDateSelection}
        />
        <h3>End Date</h3>
        <DatePicker
          selected={this.state.endDate}
          onChange={this.handleEndDateSelection}
        />
      </div>
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
