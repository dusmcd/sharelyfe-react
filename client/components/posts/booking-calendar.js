import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { connect } from 'react-redux'
import { setDateAction } from '../../store'
import { formatDate } from '../utility/utility-funcs'
import { Input } from 'semantic-ui-react'

class BookingCalendar extends React.Component {
  constructor() {
    super()
    this.state = {
      startDate: '',
      endDate: '',
    }
    this.handleStartDateSelection = this.handleStartDateSelection.bind(this)
    this.handleEndDateSelection = this.handleEndDateSelection.bind(this)
  }

  dateIsReserved = ({ date }) => {
    const { post } = this.props
    if (post.datesReserved[formatDate(date)]) return true
  }

  handleStartDateSelection(date) {
    this.props.setDates(date)
    this.setState({ startDate: date })
  }

  handleEndDateSelection(date) {
    this.props.setDates(date)
    this.setState({ endDate: date })
  }
  render() {
    const { isFetching } = this.props

    if (isFetching) return <div>LOADING...</div>
    return (
      <div className="date-container">
        <div id="start-date">
          <h3>Start Date</h3>
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleStartDateSelection}
            customInput={<Input icon={{ name: 'calendar alternate' }} />}
            placeholderText="Select a start date"
          />
        </div>

        <div id="end-date">
          <h3>End Date</h3>
          <DatePicker
            selected={this.state.endDate}
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
