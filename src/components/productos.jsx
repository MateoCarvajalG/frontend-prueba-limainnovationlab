
import React, {Fragment,useEffect,useState}from 'react'
import {Link} from "react-router-dom";
const style={
    width: '17rem',
}
const Todosproductos = () => {

    const [productos,setProductos] = useState([])

    const consumirApi = async () => {
        const data = await fetch('http://localhost:5000/productos/list')
        const productos = await data.json() 

        setProductos(productos)
        console.log(productos)
    }

    useEffect(() =>{
        consumirApi()
    }, [])
    return (  
        <Fragment>
                
                {
                    productos.map((item,index)=>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="card">
                            <div className="card-body text-center">
                                <img src={item.url_img} style={style} alt=""/>
                                <h5 className="card-title text-capitalize h1">{item.name}</h5>
                                <p className="card-text text-success h3"> Precio= $ {item.precio}</p>
                                <p className="card-text text-warning h3"> Disponibles=  {item.stock}</p>
                                <Link
                                    to= {`/producto/${item.id}`}
                                    className="btn btn-primary">
                                        adquirir
                                </Link>
                            </div>
                            </div>
                        </div>
                        </div>
                    )
                }

            


        </Fragment>
    );
}
 
export default Todosproductos