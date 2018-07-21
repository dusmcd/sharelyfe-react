import React from 'react'
import Calendar from 'react-calendar'

class BookingCalendar extends React.Component {
  componentDidMount() {
    // black out dates that are unavailable
  }
  render() {
    return (
      <Calendar selectRange tileDisabled={({ date }) => date.getDay() === 3} />
    )
  }
}

export default BookingCalendar
