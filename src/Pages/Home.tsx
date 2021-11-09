import illustrationImg from "../Assets/images/illustration.svg";
import logoImg from "../Assets/images/logo.svg";
import googleIconImg from "../Assets/images/google-icon.svg";
import { Button } from "../Components/Button";
import { useHistory } from "react-router-dom";

import "../styles/auth.scss"
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from "react";
import { database } from "../Services/firebase";

export function Home() {

  const history = useHistory()
  const { user, signInWithGoogle } = useAuth()
  const [roomCode, setRoomCode] = useState('')

  async function handelCreateRoom() {
    if(!user){
      await signInWithGoogle()
    }

    history.push('/rooms/new')
  }

  async function handleJoinRoom(event: FormEvent) {
    
    event.preventDefault()

    if(roomCode.trim() === '') {
      return
    } 
    
    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    if(!roomRef.exists()) {
      alert('Room does not exists')
      return
    }

    if(roomRef.val().endedAt) {
      alert('Room already ended');
      return;
    }

    history.push(`/rooms/${roomCode}`)
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie Salas de Q&amp;A ao-vivo</strong>
        <p>Tire as duvidas da sua audiencia em tempo-real</p>
      </aside>
      <main>
        <div className='main-content'>
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handelCreateRoom} className='create-room'>
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o google
          </button>
          <div className='separator'>Ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}