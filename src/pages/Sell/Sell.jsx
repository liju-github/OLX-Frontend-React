import SellProduct from "../../components/Sell/SellProduct";
import NavbarTop from "../../components/Navbar/NavbarTop";


import React from 'react'

const Sell = () => {


  return (
    <div>
      <NavbarTop showSearch={false} showSellButton={false}/>
      <SellProduct></SellProduct>
      {/* footer */}
    </div>
  )
}

export default Sell
