import React from 'react'
import Carousel from './Carousel'
import LoginPage from '../../../../pages/LoginPage'
import TickerMessage from './TickerMessage'
import QuickLinksAndNews from './QuickLinkAndNews'

export default function IndexG1() {
  return (
    <div className=' overflow-x-hidden  '>
        <Carousel/>
        <TickerMessage/>
        <QuickLinksAndNews/>
        
        
    </div>
  )
}
