import { useHistory, useParams } from "react-router-dom"

import logoImg from "../Assets/images/logo.svg"
import deleteImg from "../Assets/images/delete.svg";
import checkImage from "../Assets/images/check.svg"
import answerImage from "../Assets/images/answer.svg"

import { Button } from "../Components/Button"
import { Question } from "../Components/Question"
import { RoomCode } from "../Components/RoomCode"
import { useAuth } from "../hooks/useAuth"
import { useRoom } from "../hooks/useRoom"
import "../styles/room.scss"
import { database } from "../Services/firebase";

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const { user } = useAuth()
  const history = useHistory()
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { title, questions } = useRoom(roomId)

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push('/')
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    })
  }

  async function handleHighLightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighLigted: true,
    })
  }


  return (

    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button
              isOutlined
              onClick={handleEndRoom}
            >Encerrar Sala</Button>
          </div>


        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>


        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isHighLigted={question.isHighLigted}
                isAnswered={question.isAnswered}
              >

                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img src={checkImage} alt="Marcar pergunta como respondida" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleHighLightQuestion(question.id)}
                    >
                      <img src={answerImage} alt="Dar destaque à pergunta" />
                    </button>
                  </>)}

                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover Pergunta" />
                </button>
              </Question>
            )
          })}
        </div>

      </main>
    </div>
  )
}