import QuestionTimer from "./QuestionTimer"
import Answers from "./Answers"
import { useState } from "react"
import QUESTIONS from "../questions"

export default function Question({
    index,  // 현재 질문 인덱스
    handleSelectAnswer, //답 세팅 함수
    handleSkipAnswer, // 정답 선택 못했을 시의 함수
}) {
    // 대답
    const [answer, setAnswer] = useState({
        seletedAnswer: '', // 선택한 대답
        isCorrect: null // 정답여부
    })

    let timer = 10000

    if(answer.seletedAnswer) { //답을 선택했을 경우(타이머 1초 설정)
        timer = 1000
    }
    if(answer.isCorrect !== null) { //답을 미선택했을 경우(타이머 2초 설정)
        timer = 2000
    }

    /**
     * 대답 세팅 및 타이머 설정 함수
     * @param {object} answer // 대답(선택된 대답, 정답 여부)
     */
    function onSelectAnswer(answer) {
        setAnswer({
            seletedAnswer: answer,
            isCorrect: null
        })

        //  정답 여부 체크 (1초 있다가 정답공개)
        setTimeout(() => {
            setAnswer({
                seletedAnswer: answer,
                isCorrect: QUESTIONS[index].answers[0] === answer
            })

            // 2초 이후에 userAnswers 배열에 선택한 답 세팅
            setTimeout(() => {
                handleSelectAnswer(answer)
            }, 2000)

        }, 1000)
    }

    // Answers css를 위한 answerState 세팅 
    let answerState = '' // 대답 답 여부(색깔 설정)

    if(answer.seletedAnswer) {
        answerState = 'answered'
        if(answer.isCorrect !== null) {
            answerState = answer.isCorrect ? 'correct' : 'wrong'
        }
    }

    return (
    <div id="question">
    <QuestionTimer
        key={timer}
        timeout={timer} // 제한 시간
        onTimeout={answer.seletedAnswer === '' ? handleSkipAnswer : null}
        mode={answerState} // css
    />
    <h2>{QUESTIONS[index].text}</h2>
    <Answers 
        answers={QUESTIONS[index].answers}      // 선택지 
        selectedAnswer={answer.seletedAnswer}   // 선택한 답
        answerState={answerState}               // css
        handleSelectAnswer={onSelectAnswer}     // 답 선택 함수
    />
    </div>
    )
}