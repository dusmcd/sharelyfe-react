import React from 'react'
import { Form } from 'semantic-ui-react'

const Input = props => {
  const { type, value, label, placeholder, name, onChange } = props
  return (
    <Form.Field>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
      />
    </Form.Field>
  )
}

export default Input
