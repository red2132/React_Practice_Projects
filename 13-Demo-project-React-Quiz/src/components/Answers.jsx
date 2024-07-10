import { useRef } from "react"

export default function Answers({selectedAnswer, answerState, answers, handleSelectAnswer}) {
    const shuffledAnswers = useRef()
    //선택지 셔플
    if(!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers].sort(() => Math.random() - 0.5)
    }

    return (
    <ul id="answers">
        {shuffledAnswers.current.map((answer) => {
            const isSelected = selectedAnswer === answer
            let cssClasses = ''

            if(answerState === 'answered' && isSelected) {
                cssClasses = 'selected'
            } 
            
            if((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                cssClasses = answerState
            }

            return (                      
                <li key={answer} className="answer">
                    <button
                        onClick={() => handleSelectAnswer(answer)}
                        className={cssClasses}
                        disabled={answerState !== ''}
                    >
                        {answer}
                    </button> 
                </li>
            )
        })
        }
    </ul>
    )
}