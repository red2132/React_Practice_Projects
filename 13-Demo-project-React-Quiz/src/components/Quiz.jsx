import { useCallback, useState } from "react"
import QUESTIONS from "../questions"
import Question from "./Question"
import Summary from "./Summary"

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]) // 유저 답변

     // 현재 활성화 질문의 인덱스
    const activeQuestionIndex = userAnswers.length

    /** 유저 정답 저장 및, 인덱스 변경으로 다음 문제로 이동시키는 함수
     * @param {string} selectedAnswer //선택된 답
     * @returns {Array} userAnswers 유저 답
     */
    const handleSelectAnswer = useCallback(
        function handleSelectAnswer(selectedAnswer) {
            setUserAnswers(preUserAnswers => {
            return [...preUserAnswers, selectedAnswer]
        })
        }, 
    [])

    
    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

    // 문제 종료시 요약 component 호출
    if(activeQuestionIndex === QUESTIONS.length) {
        return <Summary userAnswers={userAnswers}/>
    }
    
    return (
        <div id="quiz">
            <Question
                key={activeQuestionIndex}
                index={activeQuestionIndex}
                handleSelectAnswer={handleSelectAnswer}
                handleSkipAnswer={handleSkipAnswer}
            />
        </div>
    )
}