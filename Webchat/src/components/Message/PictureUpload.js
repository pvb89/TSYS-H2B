import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'
import cx from 'classnames'

// const tsUrl = 'https://h2b.c-2fed325.kyma.shoot.live.k8s-hana.ondemand.com/predict'
const tsUrl = 'https://h2b-mw.c-2fed325.kyma.shoot.live.k8s-hana.ondemand.com/predict'
const uploadButtonText = 'Upload image'

const PictureUpload = ({ style, sendMessage }) => {

  const hiddenFileInput = React.useRef(null)

  const handleClick = event => {
    hiddenFileInput.current.click()
  }

  const onImageInput = (event) => {
    const image = event.target.files[0]

    const fd = new FormData()
    fd.append('file', image, image.name)
    fetch(tsUrl, {
      method: 'Post',
      body: fd,
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then(result => {
        console.log('Success:', result)
        result = result.data[0].category
        console.log(result)
        sendMessage({ type: 'text', content: result })
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  return (
    <div
      className='RecastSendButtonContainer CaiSendButtonContainer'
    >
      <div
        title={uploadButtonText}
        className={cx('RecastAppQuickReplies--button CaiAppQuickReplies--button')}
        onClick={handleClick}
        style={{
          border: `1px solid ${style.accentColor}`,
          color: style.accentColor,
        }}
      >
        {uploadButtonText}
        <input
          type='file'
          ref={hiddenFileInput}
          onChange={onImageInput}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  )
}

PictureUpload.propTypes = {
  style: PropTypes.object,
  sendMessage: PropTypes.func,
}

export default PictureUpload
