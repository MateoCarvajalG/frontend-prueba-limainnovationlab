import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../productos.css";
const Todosproductos = () => {
    const [productos, setProductos] = useState([]);

    const consumirApi = async () => {
    const data = await fetch("http://localhost:5000/productos/list");
    const productos = await data.json();  
    setProductos(productos);
    }
    
  useEffect(() => {
    consumirApi();
  }, []);
  return (
    <Fragment>
      <div className="container ">
            <div className="row ">
        {productos.map((item, index) => (
              <div className="col-md-3 col-sm-6">
                <div className="card card-block mt-5">
                    <h4 className="card-title1 text-center text-capitalize h5 ">{item.name} </h4>
                    <img src={item.url_img} alt="" className="imagen" />
                    <h5 className="card-title mt-3 mb-3 text-center"> pertenece a la categoria   <br/><span className="text-success text-right h3">{item.Categorias.name}</span></h5>
                    <h4 className="card-text text-center">Precio <br/> <span className="text-danger h3">${item.precio}</span></h4> 
                    <Link className=" btn btn-primary justify-center"
                        to= {`/producto/${item.id}`}>
                         Adquirir
                    </Link> 
                    <p className="text-center">en stock: {item.stock}</p>
                </div>
              </div>
       ))} 
       </div>
    </div>
    </Fragment>
  );
};

export default Todosproductos;
 