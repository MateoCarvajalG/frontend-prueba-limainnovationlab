import React, {Fragment,useEffect,useState}from 'react'
import { useParams } from 'react-router-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
  } from "react-router-dom";
import "../producto.css";
import AñadirAlCarro from './addToCar'

import {Button,Modal, ModalHeader,ModalBody,ModalFooter} from 'reactstrap'

 const Producto = (props) => {
     
    //JSON.parse(localStorage.getItem("listadoProductos"))
    const {id} = useParams()
    const [producto,setProducto] = useState({})
    const [estadoModal,setEstadoModal]=useState(false)
    
    const consumirApi = async () => {
        const data = await fetch(`http://localhost:5000/productos/producto/:${id}`)
        const productos = await data.json() 
        setProducto(productos)
    }

    const addToLocalStorage = () =>{
        setEstadoModal(!estadoModal)
        let cantidad = document.getElementById("cantidad").value
        const productoC={
            producto:producto,
            cantidad:cantidad
        }
        let isNew=true
        props.carro.some(function(item,index){
            if (producto.name === item.producto.name){
                console.log("repite")
                let cantidadAnterior=parseInt(props.carro[index].cantidad)
                let cantidadNueva=parseInt(cantidad) + cantidadAnterior
                console.log((cantidadNueva.toString()))
                props.carro[index].cantidad = cantidadNueva.toString()
                return true
            }
        })
        props.carro.forEach(function(item){
            if ((item.producto.name === producto.name)){ //no repiten 
                isNew=false
            }


        })
        
        if(isNew){
            props.setCarro([...props.carro,productoC])
        }
    }
    useEffect(() =>{
        consumirApi()
    }, [])
  
    
     return (  
        
        <Fragment>
         {/* {producto.map((item,index) => (  */}
         
            <div className="container1">
            <div className="card1">
                <div className="front">
                    <div ><img src={producto.url_img} alt=""/></div>
                        </div>
                            <div className="back">
                                <h1 className="text-uppercase">{producto.name}<span></span></h1>
                                <ul className="text-center ">
                                <li className="text-success display-5">Precio = ${producto.precio}</li>
                                <li> <label for="cantidad">Cantidad</label> <br/><button>+</button><input type="text" name="cantidad" id="cantidad"/><button>-</button> </li>
                                <li className="mt-5">
                                    
                                    <Link className=" btn btn-primary justify-center"
                                    //to= "/productos/carro"
                                    onClick={() => 
                                        addToLocalStorage()
                                    }
                                    >
                                    Añadir al carrito 
                                    <i className="fas fa-cart-plus mx-2"></i>
                                    </Link> 
                                  
                                </li>
                                <li></li>
                                </ul>
                                
                            </div>
                        </div>
                    </div>

         {/* ))} */}
         
         <Modal isOpen={estadoModal} className="modal-lg">
            <ModalHeader>
                <div>
                    <h4>productos a comprar</h4>
                    <br/>
                    <div className="modalHeadercontenedor">
                        <h5 className="modalHeaderelemento">Producto</h5>
                        <h5 className="modalHeaderelemento">Precio Unitario</h5>
                        <h5 className="modalHeaderelemento">Cantidad</h5>
                        <h5 className="modalHeaderelemento">Precio Total</h5>
                    </div>
                </div>
            </ModalHeader>
            <ModalBody >
                {props.carro.map((j, index) => 
                        <div className="container">
                            <div className="modalBodycontenedor">
                                <div className="modalBodyelemento"> <img src={j.producto.url_img} alt="" className="imagen modalBodyelemento"/></div>
                                
                                
                                <div className="modalBodyelemento elementoPrecio h5 font-italic">${j.producto.precio}</div>  
                                
                               
                                <div className="modalBodyelemento">{j.cantidad > j.producto.stock ? 
                                    j.producto.stock  : 
                                    j.cantidad}
                                    <br/>
                                    <span>
                                    {j.cantidad > j.producto.stock ? 
                                    "Limite stock alcanzado" : `Disponibles : ${j.producto.stock}` }
                                    </span>

                                </div> 
                                
                                
                                <div className="modalBodyelemento elementoPrecio h5 font-italic">${j.cantidad * j.producto.precio}</div>  
                            
                            </div>
                        </div>
                     
                )}
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => setEstadoModal(!estadoModal)}>Cerrar</Button>
            </ModalFooter>
         </Modal>



         
         </Fragment>
        
     );
 }
  
 export default Producto;