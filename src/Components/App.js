import {React, Component} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./Login/Login";
import Main from "./Main/Main";
import Register from "./Register/Register";



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: false
    }
  }



  onLogin = () => {
    const auth = this.state.auth
    this.setState({
      auth: !auth
    })
  }


  render() {
    const auth = this.state.auth
    if(!auth) {
      return(
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Login auth={() => this.onLogin}/>}/>
              <Route path="/register" element={<Register />}/>
              <Route path="*" element={<Login />}/>
          </Routes>
        </BrowserRouter>
      )
    }

    return(
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Main auth={() => this.onLogin} />}/>
              <Route path="*" element={<Main />}/>
          </Routes>
      </BrowserRouter>
    )
  }
} 

export default App
