import React,{Fragment,useState} from 'react';

const Lista = () => {

    const [lista,setLista] = useState([1,2,3,4,5])


    const agregarNumero = () =>{
        setLista([...lista,9])
    }

    return ( 

        <Fragment>
        <h2>lista</h2>
        {
            lista.map((item,index) => 
                <p key={index}>{item} -{index}</p>
            )
        }

        <button onClick={agregarNumero}>Agregar numero</button>
        </Fragment>
       
     );
}
 
export default Lista;