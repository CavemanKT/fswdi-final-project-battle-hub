import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as yup from 'yup'
import FileField from '@/components/FileField'

const RenderForm = ({ values, errors, touched, isSubmitting, setFieldValue }) => (
  <Form>
    <div className="form-group">
      <label htmlFor="characterName">characterName</label>
      <Field
        id="characterName"
        className={`form-control ${(errors.characterName && touched.characterName ? ' is-invalid' : '')}`}
        name="characterName"
        type="text"
      />
      <ErrorMessage component="div" className="invalid-feedback" name="characterName" />
    </div>

    <div className="form-group">
      <label htmlFor="gameTitle">gameTitle</label>
      <Field
        id="gameTitle"
        className={`form-control ${(errors.gameTitle && touched.gameTitle ? ' is-invalid' : '')}`}
        name="gameTitle"
        type="text"
      />
      <ErrorMessage component="div" className="invalid-feedback" name="gameTitle" />
    </div>

    <div className="form-group">
      <label htmlFor="weapon">weapon</label>
      <Field
        id="weapon"
        className={`form-control ${(errors.weapon && touched.weapon ? ' is-invalid' : '')}`}
        name="weapon"
        type="text"
      />
      <ErrorMessage component="div" className="invalid-feedback" name="weapon" />
    </div>

    <div className="form-group">
      <label htmlFor="amulet">amulet</label>
      <Field
        id="amulet"
        className={`form-control ${(errors.amulet && touched.amulet ? ' is-invalid' : '')}`}
        name="amulet"
        type="text"
      />
      <ErrorMessage component="div" className="invalid-feedback" name="amulet" />
    </div>

    <div className="form-group">
      <label htmlFor="armour">armour</label>
      <Field
        id="armour"
        className={`form-control ${(errors.armour && touched.armour ? ' is-invalid' : '')}`}
        name="armour"
        type="text"
      />
      <ErrorMessage component="div" className="invalid-feedback" name="armour" />
    </div>

    <div className="form-group">
      <label htmlFor="boots">boots</label>
      <Field
        id="boots"
        className={`form-control ${(errors.boots && touched.boots ? ' is-invalid' : '')}`}
        name="boots"
        type="text"
      />
      <ErrorMessage component="div" className="invalid-feedback" name="boots" />
    </div>

    {/* images upload */}

    <FileField
      name="thumbnail"
      setFieldValue={setFieldValue}
      value={values.thumbnail}
    />

    <FileField
      name="img1"
      setFieldValue={setFieldValue}
      value={values.img1}
    />

    <FileField
      name="img2"
      setFieldValue={setFieldValue}
      value={values.img2}
    />

    <FileField
      name="img3"
      setFieldValue={setFieldValue}
      value={values.img3}
    />

    <FileField
      name="video"
      setFieldValue={setFieldValue}
      value={values.video}
    />

    <button className="btn btn-success mt-3" type="submit" disabled={isSubmitting}>Submit</button>
  </Form>
)
RenderForm.propTypes = {
  errors: PropTypes.shape().isRequired,
  touched: PropTypes.shape().isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  values: PropTypes.shape().isRequired
}

// const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png']
// const SUPPORTED_VIDEO_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'audio/mp3', 'video/mp4', 'video/mov']

const FormsProfileCreateSchema = yup.object().shape({
  characterName: yup.string().required('Required'),
  gameTitle: yup.string().required('Required'),
  weapon: yup.string().required('Required'),
  armour: yup.string().required('Required'),
  amulet: yup.string().required('Required'),
  boots: yup.string().required('Required')

})

const FormsProfileCreate = ({ onSubmit, gameTitle }) => (
  <Formik
    initialValues={{
      characterName: '',
      gameTitle,
      weapon: '',
      amulet: '',
      armour: '',
      boots: '',
      thumbnail: '',
      img1: '',
      img2: '',
      img3: '',
      video: ''
    }}
    validationSchema={FormsProfileCreateSchema}
    onSubmit={onSubmit}
    component={RenderForm}
  />
)

FormsProfileCreate.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  gameTitle: PropTypes.string.isRequired
}

export default FormsProfileCreate
