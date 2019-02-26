import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

const Counter = props => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('use effect was called')
  }, [])

  return (
    <div>
      <div>Count: {count}</div>
      <div>
        <button onClick={() => setCount(count + 1)}>Count</button>
      </div>
    </div>
  )
}

const App = () => {
  const [showCounter, counter] = useState(true)

  return (
    <div>
      {showCounter && <Counter />}
      <button onClick={() => counter(false)}>Remove Counter</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
