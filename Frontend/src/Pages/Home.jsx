import React from 'react'
import Hero from '../Components/Hero'
import LatestCollection from '../Components/LatestCollection'
import Bestseller from '../Components/Bestseller'
import Ourpolicy from '../Components/Ourpolicy'
import Newsletterbox from '../Components/Newsletterbox'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <Bestseller/>
      <Ourpolicy/>
      <Newsletterbox/>
    </div>
  )
}

export default Home
