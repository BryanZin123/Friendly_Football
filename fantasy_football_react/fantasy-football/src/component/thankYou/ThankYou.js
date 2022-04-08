import React from 'react'

export const ThankYou = () => {
  return (
    <div className="home-page d-flex align-items-center">
    <div className='container thank-you'>
        <div className='row'> 
        <div className='col'>
            <h3>
                ThankYou for signing up
            </h3>
        </div>
        </div>
        <div className='row'>
                <span>You may now <a href='/login'>login</a> to your account.</span>
        </div>
    </div>
    </div>
  )
}
