import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const FileField = ({ name, setFieldValue, value, existingFileUrl }) => {
  const [preview, setPreview] = useState('')

  useEffect(() => {
    if (value) setPreview(URL.createObjectURL(value))
  }, [value])

  return (
    <div className="form-group">
      <label htmlFor="url">File upload</label>
      <input
        id={name}
        className="form-control"
        name={name}
        type="file"
        onChange={(e) => {
          setFieldValue(name, e.target.files[0])
        }}
        value={value?.filename}
      />

      {
        (preview || existingFileUrl) && <img src={preview || existingFileUrl} alt="screen 1" style={{ width: '100px' }} />
      }
    </div>
  )
}

FileField.propTypes = {
  name: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  value: PropTypes.shape().isRequired,
  existingFileUrl: PropTypes.string
}

FileField.defaultProps = {
  existingFileUrl: ''
}

export default FileField
