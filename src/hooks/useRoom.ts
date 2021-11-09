import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../Services/firebase";
import { useAuth } from "./useAuth";

type QuestionType = {
  id: string,
  author: {
    name: string,
    avatar: string,
  },
  content: string,
  isAnswered: boolean,
  isHighLigted: boolean,
  likeCount: number,
  likeId: string | undefined,
}

//Para o typeScript saber que isso é um objeto, deve ser declarado dessa forma
type FirebaseQuestions = Record<string, {
  author: {
    name: string,
    avatar: string,
  },
  content: string,
  isAnswered: boolean,
  isHighLigted: boolean,
  likes: Record<string, {
    authorId: string,
  }>
}>

export function useRoom (roomId: string) {

  const { user } = useAuth()
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [title, setTitle] = useState('');

  useEffect(() => {


    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', room => {
      const roomDatabase = room.val()
      //Para falar que eu sei qual o tipo de questions coloco o tipo criado la em cima
      const firebaseQuestions = roomDatabase.questions as FirebaseQuestions ?? {}
      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighLigted: value.isHighLigted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
        }
      })

      setTitle(roomDatabase.title)
      setQuestions(parsedQuestions)
    })

    return () => {
      roomRef.off('value')
    }
  }, [roomId, user?.id])

  return { questions, title}
  
}