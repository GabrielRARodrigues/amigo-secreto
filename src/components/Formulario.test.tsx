import { fireEvent, render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { RecoilRoot } from 'recoil'
import Formulario from './Formulario'

describe('o comportamento do Formulario.tsx', () => {
  test('quando o input está vazio, novos participantes não podem ser adicionados', () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    )

    const input = screen.getByPlaceholderText(
      'Insira os nomes dos participantes'
    )

    const botao = screen.getByRole('button')

    expect(input).toBeInTheDocument()
    expect(botao).toBeDisabled()
  })

  test('adicionar um participante caso exista um nome preenchido', () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    )

    const input = screen.getByPlaceholderText(
      'Insira os nomes dos participantes'
    )

    const botao = screen.getByRole('button')

    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina'
      }
    })

    fireEvent.click(botao)

    expect(input).toHaveFocus()
    expect(input).toHaveValue('')
  })
  test('nomes dublicados não podem ser adicionados', () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    )

    const input = screen.getByPlaceholderText(
      'Insira os nomes dos participantes'
    )

    const botao = screen.getByRole('button')

    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina'
      }
    })

    fireEvent.click(botao)

    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina'
      }
    })

    fireEvent.click(botao)

    const mensagemDeErro = screen.getByRole('alert')

    expect(mensagemDeErro.textContent).toBe(
      'Nomes dublicados não são permitidos!'
    )
  })

  test('a mensagem de erro deve sumir após os timers', () => {
    jest.useFakeTimers()
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    )

    const input = screen.getByPlaceholderText(
      'Insira os nomes dos participantes'
    )

    const botao = screen.getByRole('button')

    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina'
      }
    })

    fireEvent.click(botao)

    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina'
      }
    })

    fireEvent.click(botao)

    let mensagemDeErro = screen.queryByRole('alert')

    expect(mensagemDeErro).toBeInTheDocument()
    act(() => {
      jest.runAllTimers()
    })

    mensagemDeErro = screen.queryByRole('alert')
    expect(mensagemDeErro).toBeNull()
  })
})
