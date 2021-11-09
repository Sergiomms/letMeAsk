import { useState } from 'react';
import { ButtonHTMLAttributes } from 'react'

import '../styles/buttom.scss'

type ButtonProps1 = {
  children?: string;  //o ponto de interrogação torna a props opcional
  text?: string;
}

export function Button1(props: ButtonProps1) {

  return (
    <button>{props.children || props.text || 'Deafault'}</button>
  )
}

export function ButtonCounter() {

  const [counter, setCounter] = useState(0)

  function increment() {
    setCounter(counter + 1)
  }

  return (

    <button onClick={increment}>{counter}</button>
  )
}



type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
}

export function Button({ isOutlined = false, ...props }: ButtonProps) {

  return (
                              //"Esparramo (spread operator)" as props aqui pq pode ter mais de uma
    <button className={`button ${isOutlined ? 'outlined' : ''}`} 
    {...props}></button>
  )
}


