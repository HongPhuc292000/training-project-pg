import React from 'react'

function ButtonOnOff() {
    const [buttonState, setButtonState] = React.useState(true);

    const handleChangeButtonState = ()=>{
      setButtonState(!buttonState);
    }
  return (
    <>
      <div onClick={handleChangeButtonState} style={{color: '#fff', cursor: 'default'}}>{buttonState ? 'YES' : 'NO'}</div>
    </>
  )
}

export default ButtonOnOff