// Form component
import React from 'react'

class ContactForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(event) {
    const { target } = event
    const value = target.type === 'checkbox' ? target.checked : target.value
    const { name } = target

    this.setState({
      [name]: value
    })
    console.log(`Change detected. State updated${name} = ${value}`)
  }

  handleSubmit(event) {
    alert(`A form was submitted: ${this.state.name} // ${this.state.email}`)
    event.preventDefault()
  }

  render() {
    const { name, email } = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="nameInput">Name</label>
            <input type="text" name="name" value={name} onChange={this.handleInputChange} className="form-control" id="nameInput" placeholder="Name" />
          </div>
          <div className="form-group">
            <label htmlFor="emailInput">email</label>
            <input name="email" type="email" value={email} onChange={this.handleInputChange} className="form-control" id="emailInput" placeholder="email@domain.com" />
          </div>
          <input type="submit" value="Submit" className="btn btn-dark mt-3" />
        </form>
      </div>
    )
  }
}

export default ContactForm
