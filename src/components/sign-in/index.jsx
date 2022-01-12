import { Component } from "react";
import CustomButton from "../custom-button";
import FormInput from "../form-input";
import "./sign-in.scss";
import { signInWithGoogle } from "../../firebase/firebase";

class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    event.clear();
  }

  handleChange(event) {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  }

  render() {
    const { email, password } = this.state;

    return (
      <div className="sign-in" onSubmit={this.handleSubmit}>
        <h1>I already have an account</h1>
        <span>Sign in with your email and password</span>
        <form>
          <FormInput
            type="text"
            name="email"
            value={email}
            handleChange={this.handleChange.bind(this)}
            label="Email"
            required
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            handleChange={this.handleChange.bind(this)}
            label="Password"
            required
          />
          <div className="button">
            <CustomButton type="submit">Sign In</CustomButton>
            <CustomButton
              type="submit"
              onClick={signInWithGoogle}
              isGoogleSignIn
            >
              Login with Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
