import React, { useState } from 'react';

function Level10_Quiz() {
    const questions = [
        { question: 'Reactはどの言語で書かれている？', options: ['JavaScript', 'Python', 'Java', 'C++'], answer: 0 },
        { question: 'useStateは何？', options: ['関数', 'フック', 'クラス', '変数'], answer: 1 },
        { question: 'JSXとは？', options: ['データ形式', '構文拡張', 'ライブラリ', 'フレームワーク'], answer: 1 }
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const handleAnswer = (answerIndex) => {
        setSelectedAnswer(answerIndex);
        if (answerIndex === questions[currentQuestion].answer) {
            setScore(score + 1);
        }

        setTimeout(() => {
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < questions.length) {
                setCurrentQuestion(nextQuestion);
                setSelectedAnswer(null);
            } else {
                setShowResult(true);
            }
        }, 1000);
    };

    const restart = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setSelectedAnswer(null);
    };

    if (showResult) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h1>Level 10: クイズアプリ</h1>
                <h2>結果: {score} / {questions.length}</h2>
                <p>{score === questions.length ? '完璧です！' : 'もう一度挑戦してみましょう！'}</p>
                <button onClick={restart}>もう一度</button>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Level 10: クイズアプリ</h1>
            <h3>問題 {currentQuestion + 1} / {questions.length}</h3>
            <h2>{questions[currentQuestion].question}</h2>
            <div>
                {questions[currentQuestion].options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        disabled={selectedAnswer !== null}
                        style={{
                            display: 'block',
                            margin: '10px',
                            padding: '10px',
                            backgroundColor: selectedAnswer === index
                                ? (index === questions[currentQuestion].answer ? 'green' : 'red')
                                : 'white'
                        }}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Level10_Quiz;

