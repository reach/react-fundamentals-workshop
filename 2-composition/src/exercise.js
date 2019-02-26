////////////////////////////////////////////////////////
// 1. Make a `Menu` component that receives a list of
//    items as a prop
// 2. Make a `MenuItem` component and pass it the props
//    it needs to render
// 3. Render two menus at the same time, one for
//    mexican food and one for english food
// 4. Pass in a custom "name" to each Menu
////////////////////////////////////////////////////////
import './index.css'
import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import sortBy from 'sort-by'

const items = [
  { id: 1, name: 'tacos', type: 'mexican', price: 6 },
  { id: 2, name: 'burrito', type: 'mexican', price: 9 },
  { id: 3, name: 'tostada', type: 'mexican', price: 8 },
  { id: 4, name: 'mushy peas', type: 'english', price: 3 },
  { id: 5, name: 'fish and chips', type: 'english', price: 12 },
  { id: 6, name: 'black pudding', type: 'english', price: 12 }
]

const MenuItem = props => {
  return (
    <li>
      {props.name} - <small>${props.price}</small>
    </li>
  )
}

const Menu = props => {
  return (
    <Fragment>
      {props.title === 'Mexican' && <h1>Menu: Mexican</h1>}
      <ul>
        {props.items.sort(sortBy('name')).map(item => (
          <MenuItem key={item.id} {...item} />
        ))}
      </ul>
    </Fragment>
  )
}

ReactDOM.render(
  <div>
    <Menu
      title="Mexican"
      items={items.filter(item => {
        return item.type === 'mexican'
      })}
    />
    <Menu
      title="English"
      items={items.filter(item => {
        return item.type === 'english'
      })}
    />
  </div>,
  document.getElementById('root')
)
