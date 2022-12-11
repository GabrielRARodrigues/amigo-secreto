import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import Header from './components/Header'
import Configuracao from './paginas/Configuracao'
import Sorteio from './paginas/Sorteio'

function App() {
  return (
    <>
      <BrowserRouter>
        <RecoilRoot>
          <Header />
          <Routes>
            <Route>
              <Route path="/" element={<Configuracao />} />
              <Route path="/sorteio" element={<Sorteio />} />
            </Route>
          </Routes>
        </RecoilRoot>
      </BrowserRouter>
    </>
  )
}

export default App
