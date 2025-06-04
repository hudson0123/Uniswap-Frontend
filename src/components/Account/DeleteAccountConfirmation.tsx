import React from 'react'

export default function DeleteAccountConfirmation({update}: () => void) {
  return (
    <div className='bg-white rounded relative'>
      <button className="absolute top-0 right-0" onClick={() => update()}>X</button>
    </div>
  )
}
