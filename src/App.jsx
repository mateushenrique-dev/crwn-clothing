import "./App.css";
import { Component } from "react";


import Home from "./pages/home/";
import { Route, Switch } from "react-router-dom";
import Shop from "./pages/shop/";
import Header from "./components/header";
import SignInAndSignUp from "./pages/signin-and-signup";
import { auth, createUserProfileDocument } from "./firebase/firebase";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(
          (snapshot) => {
            this.setState(
              {
                currentUser: {
                  id: snapshot.id,
                  ...snapshot.data(),
                },
              }, () => console.log(this.state)
            );
          }
        );
      }

      this.setState({ currentUser: null });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/shop" component={Shop} />
          <Route path="/signin" component={SignInAndSignUp} />
        </Switch>
      </div>
    );
  }
}

export default App;
