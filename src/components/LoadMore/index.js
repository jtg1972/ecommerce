import React from 'react'
import Button from '../forms/Button'
import './styles.scss'

const LoadMore = ({onLoadMoreEvt}) => {
  return (
    <div>
      <Button onClick={onLoadMoreEvt}>Load More</Button>
    </div>
  )
}

export default LoadMore
