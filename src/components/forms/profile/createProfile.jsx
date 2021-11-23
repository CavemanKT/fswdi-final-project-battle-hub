import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as yup from 'yup'

const RenderForm = ({ errors, touched, isSubmitting }) => (
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

    {/* button */}
    <button className="btn btn-success mt-3" type="submit" disabled={isSubmitting}>Submit</button>
  </Form>
)
RenderForm.propTypes = {
  errors: PropTypes.shape().isRequired,
  touched: PropTypes.shape().isRequired,
  isSubmitting: PropTypes.bool.isRequired
}

const authLoginSchema = yup.object().shape({
  characterName: yup.string().required('Required'),
  // password: yup.string().min(6).required('Required')
})

const FormsAuthLogin = ({ onSubmit }) => (
  <Formik
    initialValues={{
      email: '',
      password: ''
    }}
    validationSchema={authLoginSchema}
    onSubmit={onSubmit}
    component={RenderForm}
  />
)
FormsAuthLogin.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default FormsAuthLogin
