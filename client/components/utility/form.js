import React from 'react'

const Form = props => {
  return (
    <div className="ui container">
      <form
        className="ui form"
        onSubmit={props.handleSubmit}
        onChange={props.handleChange}
      >
        {props.children}
      </form>
    </div>
  )
}

export default Form
