import React, { useState, useEffect } from 'react';
import Event from './Event';
import Swipe from 'react-easy-swipe';
import Cell from './Cell';
import { swipeDown, swipeUp, swipeRight, swipeLeft } from './Move';

const Board = () => {
    const UP_ARROW = 38;
    const DOWN_ARROW = 40;
    const LEFT_ARROW = 37;
    const RIGHT_ARROW = 39;

    const [data, setData] = useState([]);
    const [score, setScore] = useState(0);

    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        initialize();
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        setGameOver(checkIfGameOver());
        // eslint-disable-next-line
    }, [data]);

    // Initialize
    const initialize = () => {
        setGameOver(false);
        let emptyGrid = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];

        addNumber(emptyGrid);
        addNumber(emptyGrid);
        setScore(0);
        setData(emptyGrid);
    };

    // Agregar numero (2 o 4) random
    const addNumber = (newGrid) => {
        let added = false;
        let gridFull = true;

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (newGrid[i][j] === 0) {
                    gridFull = false;
                }
            }
        }
        if (!gridFull) {

            while (!added) {

                let rand1 = Math.floor(Math.random() * 4);
                let rand2 = Math.floor(Math.random() * 4);
                if (newGrid[rand1][rand2] === 0) {
                    newGrid[rand1][rand2] = Math.random() > 0.1 ? 2 : 4;
                    added = true;
                }
            }
        }
    };

    // Check Gameover
    const checkIfGameOver = () => {

        let checker = swipeLeft(data, score);
        if (JSON.stringify(data) !== JSON.stringify(checker.newArray)) {
            return false;
        }

        let checker2 = swipeDown(data, score);
        if (JSON.stringify(data) !== JSON.stringify(checker2.newArray)) {
            return false;
        }

        let checker3 = swipeRight(data, score);
        if (JSON.stringify(data) !== JSON.stringify(checker3.newArray)) {
            return false;
        }

        let checker4 = swipeUp(data, score);
        if (JSON.stringify(data) !== JSON.stringify(checker4.newArray)) {
            return false;
        }

        return true;
    };

    const handleKeyDown = (event) => {
        let key;
        if (event === 37 || event === 38 || event === 39 || event === 40) {
            key = event;
        } else {
            event.preventDefault();
            key = event.keyCode;
        }

        if (gameOver) {
            return;
        }

        let oldData = data;
        let newData;

        switch (key) {
            case UP_ARROW:
                newData = swipeUp(data, score);
                break;
            case DOWN_ARROW:
                newData = swipeDown(data, score);
                break;
            case LEFT_ARROW:
                newData = swipeLeft(data, score);
                break;
            case RIGHT_ARROW:
                newData = swipeRight(data, score);
                break;
            default:
                break;
        }

        if (newData !== undefined) {

            if (JSON.stringify(oldData) !== JSON.stringify(newData.newArray)) {
                addNumber(newData.newArray);
                setData(newData.newArray);
                setScore(newData.newScore);
            }
        }
    };

    // Evento keyup
    Event("keydown", handleKeyDown);

    const onSwipeDown = () => {
        handleKeyDown(40);
    }
    const onSwipeUp = () => {
        handleKeyDown(38);
    }
    const onSwipeRight = () => {
        handleKeyDown(39);
    }
    const onSwipeLeft = () => {
        handleKeyDown(37);
    }

    return (
        <div>
            <div className="container">
                <div className="d-flex">
                    <h1 className="title">2048</h1>
                    <div className="score">
                        <p className="m-0" style={{ fontSize: '13px', marginTop: '-20px', color: '#eee4da' }}>SCORE</p>
                        <p className="m-0" style={{ fontSize: '18px', marginTop: '-25px' }}>{score}</p>
                    </div>
                </div>
                <div className="about-game">
                    <div>
                        <p className="m-0">
                            ¡Une a las fichas, llega al <strong>2048!</strong>
                        </p>
                        <p className="m-0">Cómo jugar →</p>
                    </div>
                    <div className="reset-button" onClick={initialize}>
                        Nuevo Juego
                    </div>
                </div>
                <div className="container-game">
                    {gameOver && (
                        <div className="game-overlay">
                            <div>
                                <div className="game-over">
                                    Game Over
                                </div>
                                <div>
                                    <div className="try-button" onClick={initialize}>
                                        Try Again
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <Swipe
                        onSwipeDown={onSwipeDown}
                        onSwipeLeft={onSwipeLeft}
                        onSwipeRight={onSwipeRight}
                        onSwipeUp={onSwipeUp}
                        className="overflowy-hidden"
                    >
                        {data.map((row, oneIndex) => {
                            return (
                                <div className="d-flex" key={oneIndex}>
                                    {row.map((digit, index) => (
                                        <Cell num={digit} key={index} />
                                    ))}
                                </div>
                            );
                        })}
                    </Swipe>
                </div>

                <div>
                    <p className="game-explanation">
                        <strong>Cómo Jugar:</strong> Usa tus
                        <strong> flechas</strong> para mover las celdas. Los mosaicos con el mismo número se
                        <strong> fusionan en uno</strong> cuando se tocan. <strong>¡Súmalos</strong> para llegar a
                        <strong> 2048!</strong>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Board;