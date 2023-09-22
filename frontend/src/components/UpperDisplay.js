import React from 'react'
import "./upperDisplay.css"

function UpperDisplay() {
  return (
    <div className='upperDisplay'>
        <div className="first">
          <p>0.65%</p>
          <span>5 Mins</span>
        </div>

        <div className="second">
          <p>1.3%</p>
          <span>1 Hour</span>
        </div>

        <div className="middle">
          <span>Best Price to Trade</span>
          <h1>₹ 24,24,670</h1>
          <span>Average BTC/INR net price including commission</span>
        </div>

        <div className="third">
          <p>4.73%</p>
          <span>1 Day</span>
        </div> 

        <div className="fourth">
          <p>12.6%</p>
          <span>7 Days</span>
        </div>       
    </div>
  )
}

export default UpperDisplay