import { useState, useEffect } from "react"

/**
 * @param {Number} timeout 제한시간
 * @param {function} onTimeout 실행함수
 * @param {String} mode css
 * @returns // 타이머 컴포넌트
 */
export default function QuestionTimer({timeout, onTimeout, mode}) {

    //남은 시간(바 표시용)
    const [remainingTime, setRemainingTime] = useState(timeout)

    //타이머 세팅(시간이 초과됐는데 답 미선택시 handleSkipAnswer함수 실행)
    useEffect(() => {
        const timer = setTimeout(onTimeout, timeout)

        return () => {
            clearTimeout(timer)
        }
    }, [onTimeout, timeout])

    // 바 업데이트
    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(preRemainingtime => preRemainingtime - 100)
        }, 100)

        return () => {
            clearInterval(interval)
        }
    }, [])
    


    return (
        <progress 
            id="question-time"
            max={timeout}
            value={remainingTime}
            className={mode}
        />
    )
}