import React from "react";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        username: "Daniel",
        password: "hehej",
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  //Method for posting user login
  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={this.state.formData.username.value}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default Login;
