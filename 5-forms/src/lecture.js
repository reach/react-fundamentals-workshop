import React, { useState } from 'react'
import ReactDOM from 'react-dom'

function Forms() {
  const [fields, setFields] = useState({ fieldOne: '', fieldTwo: '' })

  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <div>
      <h1>Forms</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={fields.fieldOne}
          onChange={e => {
            setFields(
              Object.assign({}, fields, { fieldOne: e.target.value })
            )
          }}
        />
        <input
          type="text"
          value={fields.fieldTwo}
          onChange={e => {
            setFields({ fieldTwo: e.target.value })
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

ReactDOM.render(<Forms />, document.getElementById('root'))
