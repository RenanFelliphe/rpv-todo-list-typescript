import { act, useState } from 'react'
import './App.css'

interface IErro{
    active: boolean
    description: string
}

export function App() {

    const [valorDoInput, setValorDoInput] = useState<string>("")
    const [tarefas, setTarefas] = useState<string[]>([])
    const [erro, setErro] = useState<IErro>({
        active: false,
        description: ""
    });

    function adicionarTarefa():void{
        setTarefas(oldState => [...oldState, valorDoInput])
        setValorDoInput("")

        if(valorDoInput.trim() === ""){            
            setErro({
                active: true,
                description: "Campo obrigatório"
            })

            return;
        }

        if (valorDoInput.trim().length > 15){
            setErro({
                active: true,
                description: "O limite de caracteres é 15"
            })

            return;
        }
    }

    return (
        <>
            <div className="card">
                <div className="input-wrapper">
                    <input type="text" id='input-tarefa' value={valorDoInput} onChange={(e) => setValorDoInput(e.target.value)} />
                    <p className='erro'>{erro.active &&  erro.description}</p>
                </div>
                <button onClick={adicionarTarefa}>Adicionar Tarefa</button>
            </div>
            <ul>
                {
                tarefas.map(tarefa => (
                    <li>{tarefa}</li>
                ))
                }
            </ul>
        </>
  )
}
