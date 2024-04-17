import React, { Fragment } from 'react'
import './Home.css'
import Content from '../components/Content/Content'
import Banner from '../components/Banner/Banner'

const Home: React.FC = () => {
  return (
    <Fragment>
      <Banner/>
      <Content />
    </Fragment>
  )
}
export default Home;
