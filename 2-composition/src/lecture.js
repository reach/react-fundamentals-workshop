import React from 'react'
import ReactDOM from 'react-dom'

const tacos = [
  { name: 'Carnitas', stars: 5 },
  { name: 'Pollo', stars: 3 },
  { name: 'Carne Asada', stars: 4 },
  { name: 'Al Carbon', stars: 3 },
  { name: 'Mole', stars: 5 }
]

const Stars = ({ stars }) => (
  <>
    {Array.from({ length: stars }).map(() => '★')}
    {Array.from({ length: 5 - stars }).map(() => '☆')}
  </>
)

const Taco = ({ taco }) => (
  <li style={{ margin: '10px' }}>
    <button onClick={() => alert(taco.name + ' is my favorite!')}>
      +1
    </button>{' '}
    <Stars stars={taco.stars} x="abc" />
    {taco.name}
  </li>
)

const App = () => {
  return (
    <div>
      <h1>Welcome to React!</h1>
      <ul>
        {tacos
          .sort((a, b) => b.stars - a.stars)
          .map((taco, i) => (
            <Taco key={i} taco={taco} />
          ))}
      </ul>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
