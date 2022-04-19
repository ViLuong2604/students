import Home from "./pages/Home";
import {
  BrowserRouter ,
  Switch,
  Route,
 
} from "react-router-dom";
import Form from "./pages/Form";
function App() {
  return (
    
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
           <Home />
        </Route>
        <Route  path="/form">
           <Form />
        </Route>
        
      </Switch>
    </BrowserRouter>
    
  );
}

export default App;
