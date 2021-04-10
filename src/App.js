import React, {useState}from 'react'
import Todosproductos from './components/productos'
import Producto from './components/producto'
import Lista from './components/lista'
import AñadirAlCarro from './components/addToCar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
function App() {
const [carro,setCarro] = useState([])


  return (

    <Router>
        <div className="container mt-5">

        <div className="btn-group">
          <Link 
          to = "/inicio"
          className="btn btn-dark"
          >
          Todos los productos
          </Link>
          <Link 
          to="/frutas" 
          className="btn  btn-dark" >
            Frutas
          </Link>
          <Link
          to= "/verdura"
          className="btn btn-dark">
            Verduras
          </Link>
        </div>
        <Switch>
            <Route path="/producto/:id" >
              <Producto
               carro={carro} 
               setCarro={setCarro}
               />
            </Route>
            {/* <Route path="/productos/carro" >
             <AñadirAlCarro />
            </Route> */}
            <Route path="/inicio" >
              <Todosproductos /> 
            </Route>
            <Route path="/"  exact>
              <Lista />
            </Route>
        </Switch>
        </div>
    </Router>
  );
}

export default App;
