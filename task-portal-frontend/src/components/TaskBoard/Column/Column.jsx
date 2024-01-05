import Card from '../Card/Card'

import './Column.sass'

const Column = ({ title, cards }) => {
  
  return (
    <div className='column-container' >
      <span className='title'>{title}</span>
      {cards?.map( (cardProps) => <Card key={cardProps?.id} {...cardProps} /> )}
    </div>
  )
}
export default Column