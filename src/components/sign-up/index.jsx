import { Component } from "react";

import "./sign-up.scss";
import FormInput from "../form-input";
import CustomButton from "../custom-button";
import { auth, createUserProfileDocument } from "../../firebase/firebase";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("Password don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      await createUserProfileDocument(user, { displayName });

      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  render() {
    const { displayName, email, password, confirmPassword } = this.state;

    return (
      <div className="sign-up">
        <h2 className="title">I do not have a account!</h2>
        <p>Sign up with your email and password</p>

        <form className="sign-up-form" onSubmit={this.handleSubmit.bind(this)}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            label="Display Name"
            handleChange={this.handleChange.bind(this)}
            required
          />

          <FormInput
            type="password"
            name="password"
            value={password}
            label="Password"
            handleChange={this.handleChange.bind(this)}
            required
          />

          <FormInput
            type="text"
            name="confirmPassword"
            value={confirmPassword}
            label="Confirm your password"
            handleChange={this.handleChange.bind(this)}
            required
          />

          <FormInput
            type="email"
            name="email"
            value={email}
            label="Email"
            handleChange={this.handleChange.bind(this)}
            required
          />

          <CustomButton type="submit">Sign Up</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
