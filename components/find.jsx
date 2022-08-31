import Pokedex from 'pokedex-promise-v2';
import { useState } from 'react';

export default function Find(){

    const P = new Pokedex();

    //variaveis
    const [gen, setGen] = useState("");
    const [numr, setNumr] = useState("");
    const [erro, setErro] = useState(false);
    const [mostrar, setMostrar] = useState(false);
    

    //pegar as informações da geração (vem da API)
    const getID = async() => {
        await P.getGenerationByName(`generation-` + numr)
        .then((result)=>{
            setGen(result);
            setErro(false);
            setMostrar(true);
        })
        .catch((err) =>{
            setErro(true);
            setMostrar(false);
            console.log(err);
        });
       
    }

    return(
        <>
            <div className='container'>

                {/* Form */}
                <div className='mb-3'>
                    <label className='form-label'>Escolha Uma geração (em numeros romanos)</label> <br />
                    <input type="text" placeholder='Geração' required  onChange={event=>setNumr(event.target.value)} value={numr} className='input-group-text form-control' />
                    
                </div>
                <div className='mb-3'>
                    <input type="button" value="Confirmar" onClick={getID} className='btn btn-primary' />
                </div>

                {/* Mostrar Informações */}
                {mostrar ?(
                    <div>
                        <table className='table table-info'>
                            <thead>
                                <tr>
                                    <th >Geração</th>
                                    <th > Região</th>
                                    <th >Jogo</th>
                                    <th>Terceiro Jogo, Remake ou DLC</th>
                                    <th>Espécies</th>
                                </tr>
                            </thead>    

                            <tbody>
                                <tr>
                                    <td> {gen?.names?.[3]?.name ?? ""} </td>
                                    <td> {gen?.main_region?.name ?? ""} </td>
                                    <td> {gen?.version_groups?.[0]?.name ?? ""} </td>
                                    <td> {gen?.version_groups?.[1]?.name ?? ""} </td>
                                    <td> {gen?.pokemon_species.length ?? ""} </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ):(<></>)}
            

                {/* Erro */}
                {erro ?(
                    <h1 className='bg-danger text-white p-2 text-center'>Invalido</h1>
                ):(<></>)}
                
            </div>
        </>
    );

}