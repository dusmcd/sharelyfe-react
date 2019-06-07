import React from 'react'
import { Form } from 'semantic-ui-react'

const Input = props => {
  const {
    type,
    value,
    label,
    placeholder,
    name,
    onChange,
    isPrice,
    className,
  } = props
  return (
    <Form.Field className={className}>
      <label>{label}</label>
      {isPrice ? (
        <div className="ui right labeled input">
          <label htmlFor="amount" className="ui label">
            $
          </label>
          <input
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
          />
          <div className="ui basic label">.00</div>
        </div>
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
        />
      )}
    </Form.Field>
  )
}

export default Input
