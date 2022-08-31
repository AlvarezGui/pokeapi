import Pokedex from 'pokedex-promise-v2';
import { useState } from 'react';

export default function Find(){

    const P = new Pokedex();

    //variaveis
    const [gen, setGen] = useState("");
    const [numr, setNumr] = useState("");
    const [erro, setErro] = useState("");
    

    //pegar as informações da geração (vem da API)
    const getID = async() => {
        await P.getGenerationByName(`generation-` + numr)
        .then((result)=>{
            setGen(result);
            setErro("");
        })
        .catch((err) =>{
            setErro("Invalido");
            console.log(err);
        });
       
    }

    return(
        <>
        <div>
            <h1>Geração: {gen?.name ?? ""}</h1>
            <h3>Região: {gen?.main_region?.name ?? ""}</h3>
            <p>Jogo: {gen?.version_groups?.[0]?.name ?? ""}</p>
        </div>
           

            <div>
                <label>Escolha Uma geração (em numeros romanos)</label> <br />
                <input type="text" placeholder='Geração' required  onChange={event=>setNumr(event.target.value)} value={numr} /> <br />
                <input type="button" value="Confirmar" onClick={getID} />
            </div>

            <h1>{erro}</h1>
        </>
    );

}