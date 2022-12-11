import React, { useRef, useState } from 'react'
import { useAdicionarParticipante } from '../state/hook/useAdicionarParticipante'
import { useMensagemDeErro } from '../state/hook/useMensagemDeErro'
import styles from './Formulario.module.scss'

const Formulario = () => {
  const [nome, setNome] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)
  const adicionarNaLista = useAdicionarParticipante()

  const mensagemDeErro = useMensagemDeErro()

  const adicionarParticipante = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    adicionarNaLista(nome)
    setNome('')
    inputRef.current?.focus()
  }

  return (
    <form onSubmit={adicionarParticipante}>
      <div className={styles['grupo-input-btn']}>
        <input
          ref={inputRef}
          type="text"
          value={nome}
          onChange={evento => setNome(evento.target.value)}
          placeholder="Insira os nomes dos participantes"
        />
        <button disabled={!nome}>Adicionar</button>
        {mensagemDeErro && (
          <p className={`${styles.alerta} ${styles.erro}`} role={'alert'}>
            {mensagemDeErro}
          </p>
        )}
      </div>
    </form>
  )
}

export default Formulario
