import React from 'react'
import ReactDOM from 'react-dom'

const tacos = [
  { name: 'Carnitas', stars: 5 },
  { name: 'Pollo', stars: 3 },
  { name: 'Carne Asada', stars: 4 },
  { name: 'Al Carbon', stars: 3 },
  { name: 'Mole', stars: 5 }
]

const label = 'Hello Penn State'

const App = () => {
  return (
    <div>
      <h1>{label}</h1>
      <ul>
        {tacos.map((taco, index) => {
          return (
            <li key={index}>
              {taco.name}
              {Array.from({ length: taco.stars }).map(() => '★')}
              {Array.from({ length: 5 - taco.stars }).map(() => '☆')}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
