import React, {Fragment,useEffect,useState}from 'react'
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import "../producto.css";
 const Producto = () => {
    const {id} = useParams()
    const [producto,setProducto] = useState([])

    const consumirApi = async () => {
        const data = await fetch(`http://localhost:5000/productos/producto/:${id}`)
        const productos = await data.json() 

        setProducto([...producto, productos])
        
    }
    useEffect(() =>{
        consumirApi()
    }, [])
  
    console.log(producto)
     return (  

        <Fragment>
         {producto.map((item, index) => ( 
            <div class="container1">
            <div class="card1">
                <div class="front">
                    <div ><img src={item.url_img} alt=""/></div>
                        </div>
                            <div class="back">
                                <h1 className="text-uppercase">{item.name}<span>{item.Categorias.name}</span></h1>
                                <ul className="text-center">
                                <li className="text-success display-5">Precio = ${item.precio}</li>
                                <li><Link className=" btn btn-primary justify-center"
                                    to= {`/producto/${item.id}`}>
                                    Añadir al carrito
                                    </Link> 
                                </li>
                                <li></li>
                                </ul>
                               
                            </div>
                        </div>
                    </div>

         ))}
         
         </Fragment>
     );
 }
  
 export default Producto;