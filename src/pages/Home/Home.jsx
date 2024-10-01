import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import banner from "../../assets/banner.png"
import "./Home.css"
import ProductViewer from '../../components/ProductViewer/ProductViewer'

const Home = () => {
  return (
    <div className='home'>
      <Navbar/>
      <div className="banner"><img src={banner} alt="" /></div>
      <ProductViewer />
    </div>
  )
}

export default Home
