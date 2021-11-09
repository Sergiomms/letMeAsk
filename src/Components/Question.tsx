import { ReactNode } from 'react';
import cx from 'classnames'

import '../styles/question.scss'

type QuestionProps = {
  content: string,
  author: {
    name: string,
    avatar: string,
  },
  children?: ReactNode,
  isAnswered?: boolean,
  isHighLigted?: boolean,
}

export function Question({
  content,
  author,
  isAnswered = false,
  isHighLigted = false,
  children }: QuestionProps) {
  return (
    <div className={cx('question',
    { answered: isAnswered },
    { highlighted: isHighLigted && !isAnswered },
    )}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  )
}