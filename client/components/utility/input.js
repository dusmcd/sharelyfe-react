import React from 'react'

const Input = props => {
  const { type, value, label, placeholder, name } = props
  return (
    <div className="field">
      <label>{label}</label>
      <input type={type} value={value} placeholder={placeholder} name={name} />
    </div>
  )
}

export default Input
