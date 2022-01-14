import "./App.css";
import { Component } from "react";
import { setCurrentUser } from "./redux/user/user.actions";

import { connect } from "react-redux";
import Home from "./pages/home/";
import { Route, Switch, Redirect } from "react-router-dom";
import Shop from "./pages/shop/";
import Header from "./components/header";
import SignInAndSignUp from "./pages/signin-and-signup";
import { auth, createUserProfileDocument } from "./firebase/firebase";

class App extends Component {
  unsubscribeFromAuth = null;
  unsubscribeFromSnap = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        this.unsubscribeFromSnap = userRef.onSnapshot((snapshot) => {
          setCurrentUser(
            {
              id: snapshot.id,
              ...snapshot.data(),
            },
            () => console.log(this.state)
          );
        });
      }

      this.setState({ currentUser: null });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
    this.unsubscribeFromSnap();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/shop" component={Shop} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
