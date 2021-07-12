import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'

const UploadButton = ({ onUpload, preferences, value }) => {

  const hiddenFileInput = React.useRef(null)

  const handleClick = event => {
    hiddenFileInput.current.click()
  }

  return (
    <div
      className='RecastSendButtonContainer CaiSendButtonContainer'
    >
      <div
        className='RecastSendButton CaiSendButton'
        onClick={handleClick}
        disabled={!value}
      >
        <svg
          style={{
            width: 23,
            fill: value ? preferences.accentColor : preferences.botMessageColor,
          }}
          viewBox='0 0 512 512'
        >
          <path d='M85 277.375h259.704L225.002 397.077 256 427l171-171L256 85l-29.922 29.924 118.626 119.701H85v42.75z' />
        </svg>
      </div>
      <input
        type='file'
        ref={hiddenFileInput}
        onChange={onUpload}
        style={{ display: 'none' }}
      />
    </div>
  )
}

UploadButton.propTypes = {
  preferences: PropTypes.object,
  onUpload: PropTypes.func,
  value: PropTypes.string,
}

export default UploadButton
