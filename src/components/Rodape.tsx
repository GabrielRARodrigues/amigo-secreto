import { useNavigate } from 'react-router-dom'
import { useListaDeParticipantes } from '../state/hook/useListaDeParticipantes'
import { useSorteador } from '../state/hook/useSorteador'

import styles from './Rodape.module.scss'

const Rodape = () => {
  const participantes = useListaDeParticipantes()

  const navegarPara = useNavigate()
  
  const sortear = useSorteador()

  const iniciar = () => {
    sortear()
    navegarPara('/sorteio')
  }


  return (
    <footer className={styles['rodape-configuracoes']}>
      <button
        className={styles.botao}
        disabled={participantes.length < 3}
        onClick={iniciar}
      >
        Inicar brincadeira
      </button>
      <img src="/imagens/sacolas.png" alt="Sacolas de compras" />
    </footer>
  )
}

export default Rodape
