import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchData } from "../../redux/quiz.actions"
import { selectQuestion, nextQuestion } from "../../redux/quiz.actions"
import {
  Question,
  Button,
  Card,
  Answer,
  PointWrap,
  Result,
} from "../../Stylings"
import { IoBulbOutline } from "react-icons/io5"
import { GiTwoCoins } from "react-icons/gi"
import { TiDeleteOutline } from "react-icons/ti"
import { BsArrowClockwise } from "react-icons/bs"
import { quizTypes } from "../../redux/quiz.types"
import { Link } from "react-router-dom"

function Trivia() {
  const dispatch = useDispatch()
  const {
    questions,
    questionIndex,
    isSelected,

    point,
    isSubmitted,
    userAnswer,
  } = useSelector(state => state)
  console.log(isSelected)
  const handleFetchData = () => {
    dispatch(fetchData)
  }
  useEffect(() => {
    dispatch(fetchData)
  }, [])

  if (questions.length === 0) {
    return <h1>Loading ...</h1>
  }
  if (questionIndex === questions.length) {
    return (
      <Result>
        <h1>COMPLETE!</h1>
        <h3 style={{ color: "orange" }}>Score: {point}</h3>
        <>
          {" "}
          <Button background onClick={() => handleFetchData()}>
            Play Again <BsArrowClockwise />
          </Button>
        </>
        <Button
          style={{ background: "red", marginLeft: "10px" }}
          onClick={() => handleFetchData()}
        >
          Quit <TiDeleteOutline />
        </Button>
      </Result>
    )
  }
  return (
    <Card>
      <PointWrap>
        {questionIndex + 1}/{questions.length}
        <span>
          <GiTwoCoins style={{ color: "yellow", fontSize: "3rem" }} />
          {point}
        </span>
      </PointWrap>
      <Question>
        <span> {questions[questionIndex].question} </span>{" "}
      </Question>
      {questions[questionIndex].answers.map((answer, i) => {
        const correctAnswer = questions[questionIndex].correct_answer === answer

        return (
          <Answer
            disabled={isSubmitted}
            isCorrect={correctAnswer ? "correct" : "wrong"}
            isSubmit={isSubmitted}
            userAnswer={userAnswer === i}
            onClick={e => {
              dispatch({
                type: quizTypes.SELECT_QUESTION,
                payload: i,
                correctAnswer,
              })
            }}
            key={i}
          >
            {answer}
          </Answer>
        )
      })}
      <div className="btn">
        <Button
          disabled={!isSelected}
          background={isSelected}
          animation={isSelected}
          onClick={() => {
            !isSubmitted
              ? dispatch({
                  type: quizTypes.CHECK_QUESTION,
                })
              : dispatch({
                  type: quizTypes.NEXT_QUESTION,
                })
          }}
        >
          {isSubmitted ? "Next" : "Check"}
          {isSubmitted ? null : <IoBulbOutline />}
        </Button>
      </div>
    </Card>
  )
}

export default Trivia
