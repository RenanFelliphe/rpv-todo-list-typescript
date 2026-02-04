import { useState } from 'react'
import './App.css'

interface IErro{
    active: boolean
    description: string
}

interface ITarefa {
    id: number
    descricao: string
    criadoEm: string
    ativo: boolean
    concluido: boolean
}
export function App() {

    const [valorDoInput, setValorDoInput] = useState<string>("")
    const [tarefas, setTarefas] = useState<ITarefa[]>([])
    const [erro, setErro] = useState<IErro>({
        active: false,
        description: ""
    });

  function adicionarTarefa(): void {
    if (valorDoInput.trim() === "") {
      setErro({
        active: true,
        description: "Campo obrigatório."
      })
      return
    }

    if (valorDoInput.trim().length > 15) {
      setErro({
        active: true,
        description: "Máximo 15 caracteres."
      })
      return
    }

    const tarefasFiltradas = tarefas.filter(
      tarefa => tarefa.descricao.trim().toLowerCase() === valorDoInput.trim().toLowerCase()
    )

    if (tarefasFiltradas.length > 0) {
      setErro({
        active: true,
        description: "Tarefa já cadastrada."
      })

      return
    }

    const montarObjetoTarefa: ITarefa = {
        id: 0,
        descricao: valorDoInput,
        criadoEm: new Date().toISOString(),
        concluido: false,
        ativo: true
    }

    setTarefas(oldState => [...oldState, montarObjetoTarefa])
    setValorDoInput("")
  }

  return (
    <>
      <div className="card">
        <div className='input-wrapper'>
          <input type="text" id='input-tarefa' value={valorDoInput} onChange={(e) => setValorDoInput(e.target.value)} />
          <p className='erro'>{erro.active && erro.description}</p>
        </div>
        <button onClick={adicionarTarefa}>Adicionar Tarefa</button>
      </div>
      <ul>
        {
          tarefas.map((tarefa, index) => (
            <li key={index}>{tarefa.descricao}</li>
          ))
        }
      </ul>
    </>
  )
}