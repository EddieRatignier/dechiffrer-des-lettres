import React, { useEffect, useRef, useState } from 'react';
import SecondsToText from '../../components/SecondsToText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faTrophy, faStop, faCheck, faForward } from '@fortawesome/free-solid-svg-icons';
import Score from './Score';
import EndManche from './EndManche';
import Loading from '../../assets/Loading';

export default function PlayTraining({ rules }) {
    const [resultsPossible, setResultsPossible] = useState([]);
    const [index, setIndex] = useState(0);
    const [points, setPoints] = useState(0);
    const [tempsRestant, setTempsRestant] = useState(rules.time);
    const [timerActif, setTimerActif] = useState(false);
    const [tirages, setTirages] = useState([]);
    const [earnPoints, setEarnPoints] = useState(0);
    const dicConsonnes = "ssssssnnnnnnrrrrrrttttttlllllddddcccmmpppggbbvvhhffqqxjkwz";
    const dicVoyelles = "aaaaaaaeeeeeeeeeeeeiiiiiiiooooouuuuuy";
    const [resultValid, setResultValid] = useState(false);
    const [genWords, setGenWords] = useState(true);
    const [endManche, setEndManche] = useState(false);
    const [endGame, setEndGame] = useState(false);
    const [remainLetters, setRemainLetters] = useState([]);
    const [answerLetters, setAnswerLetters] = useState(['', '', '', '', '', '', '', '', '', ''])
    let minuteur;
    const remainLettersRef = useRef(remainLetters);
    const answerLettersRef = useRef(answerLetters);
    const resultsPossibleRef = useRef(resultsPossible);
    const endGameRef = useRef(endGame);
    const endMancheRef = useRef(endManche);
    const indexRef = useRef(index);

    useEffect(() => {
        remainLettersRef.current = [...remainLetters];
        answerLettersRef.current = [...answerLetters];
        indexRef.current = index;
        endGameRef.current = endGame;
        endMancheRef.current = endManche;
        resultsPossibleRef.current = [...resultsPossible]
    }, [remainLetters, answerLetters, index, resultsPossible, endGame, endManche]);


    useEffect(() => {
        if (timerActif && tempsRestant > 0) {
            minuteur = setInterval(() => {
                setTempsRestant(tempsRestant - 1);
            }, 1000);
        } else if (tempsRestant === 0) {
            setTimerActif(false);
            clearInterval(minuteur);
            if ((index + 1) == rules.words) {
                setEndGame(true);
            } else {
                answerValidate();
            }
        }
        return () => {
            clearInterval(minuteur);
        };
    }, [timerActif, tempsRestant]);

    function newWord() {
        if ((index + 1) == rules.words) {
            setEndManche(false);
            setEndGame(true);
        } else {
            setRemainLetters(tirages[index + 1])
            setAnswerLetters(['', '', '', '', '', '', '', '', '', ''])
            setIndex(index + 1);
            setTempsRestant(rules.time);
            setTimerActif(true);
            setEndManche(false);
        }
    }

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + '/dic.txt')
            .then(response => response.text())
            .then(data => { initialisation(data.split('\n')); });
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    const handleKeyUp = (event) => {
        let tempEndGameRef = endGameRef.current;
        let tempEndManche = endMancheRef.current;
        if (!tempEndGameRef && !tempEndManche) {
            let tempKey = event.key.toLowerCase();
            let tempAnswerLetters = [...answerLettersRef.current];
            let tempRemainLetters = [...remainLettersRef.current];
            let tempResultsPossible = [...resultsPossibleRef.current];
            let tempIndex = indexRef.current;
            if (tempKey === 'backspace' && tempAnswerLetters[0] !== '') {
                for (let i = 0; i < 10; i++) {
                    if (tempAnswerLetters[i] === '') {
                        tempRemainLetters.push(tempAnswerLetters[i - 1]);
                        tempAnswerLetters[i - 1] = '';
                        setRemainLetters(tempRemainLetters);
                        setAnswerLetters(tempAnswerLetters);
                        break;
                    }
                }
            } else if (tempRemainLetters.includes(tempKey) && tempAnswerLetters[9] === '') {
                for (let i = 0; i < 10; i++) {
                    if (tempAnswerLetters[i] === '') {
                        tempAnswerLetters[i] = tempKey;
                        tempRemainLetters = filterAndRemoveFirstOccurrence(tempRemainLetters, tempKey);
                        setRemainLetters(tempRemainLetters);
                        setAnswerLetters(tempAnswerLetters);
                        break;
                    }
                }
            } else if (tempKey === 'enter' && tempAnswerLetters[0] !== '') {
                let tempMot = tempAnswerLetters.join('');
                if (tempResultsPossible[tempIndex].includes(tempMot)) {
                    setResultValid(true);
                    setEarnPoints(tempMot.length * 50 + tempsRestant * 2);
                    setPoints((old) => old + tempMot.length * 50 + tempsRestant * 2)
                } else {
                    setResultValid(false);
                }
                setEndManche(true);
            }
        }
    }

    function initialisation(data) {
        let tempTirage = [];
        let tempResultsPossibles = [];
        for (let i = 0; i < rules.words; i++) {
            tempTirage.push([]);
            tempResultsPossibles.push([]);
            for (let a = 0; a < rules.voyelles; a++) {
                tempTirage[i].push(dicVoyelles[Math.floor(Math.random() * dicVoyelles.length)]);
            }
            for (let b = 0; b < (10 - rules.voyelles); b++) {
                tempTirage[i].push(dicConsonnes[Math.floor(Math.random() * dicVoyelles.length)]);
            }
            const words = data.filter((word) => {
                const remainingLetters = [...tempTirage[i]];
                for (let i = 0; i < word.length; i++) {
                    const letterIndex = remainingLetters.indexOf(word[i]);
                    if (letterIndex === -1) {
                        return false;
                    }
                    remainingLetters.splice(letterIndex, 1);
                }
                return true;
            }).filter((word) => word.length <= 10);
            words.sort((a, b) => a.length - b.length);
            for (let c = 0; c < words.length; c++) {
                tempResultsPossibles[i].push(words[c]);
            }
        }
        setResultsPossible(tempResultsPossibles);
        setTirages(tempTirage);
        setRemainLetters(tempTirage[0])
        setTimeout(() => {
            setGenWords(false)
            setTimerActif(true);
        }, 1000)
    }

    function handleTirageClick(element) {
        let tempAnswerLetters = [...answerLetters];
        let tempRemainLetters = [...remainLetters];
        if (remainLetters.includes(element)) {
            for (let i = 0; i < 10; i++) {
                if (tempAnswerLetters[i] === '') {
                    tempAnswerLetters[i] = element;
                    tempRemainLetters = filterAndRemoveFirstOccurrence(remainLetters, element);
                    setRemainLetters(tempRemainLetters);
                    setAnswerLetters(tempAnswerLetters);
                    break;
                }
            }
        }
    }

    function handleAnswerClick(element, index) {
        if (answerLetters[index] !== '') {
            let tempAnswerLetters = [...answerLetters];
            let tempRemainLetters = [...remainLetters];
            tempAnswerLetters[index] = '';
            tempRemainLetters.push(element);
            setRemainLetters(tempRemainLetters);
            setAnswerLetters(tempAnswerLetters);
        }
    }

    function answerValidate() {
        let tempMot = answerLetters.join('');
        if (resultsPossible[index].includes(tempMot)) {
            setResultValid(true);
            setEarnPoints(tempMot.length * 50 + tempsRestant * 2);
            setPoints((old) => old + tempMot.length * 50 + tempsRestant * 2)
        } else {
            setResultValid(false);
        }
        setEndManche(true);
    }

    function filterAndRemoveFirstOccurrence(arr, value) {
        let index = arr.findIndex(item => item === value);
        if (index !== -1) {
            arr = arr.filter((item, i) => i !== index);
        }
        return arr;
    }

    return (
        genWords ?
            <div className='container'>
                <Loading />
            </div>
            :
            endManche ?
                <EndManche resultsPossible={resultsPossible[index]} mot={answerLetters.join('')} index={index} resultValid={resultValid} earnPoints={earnPoints} newWord={() => newWord()} />
                :
                endGame ?
                    <Score points={points} />
                    :
                    <div className='container slide-left'>
                        <div className='box'>
                            <div className='title-box'>Manche {index + 1} sur {rules.words}</div>
                            <div className='game-stats'>
                                <p><FontAwesomeIcon icon={faClock} beat size='1x' style={{ marginRight: '10px' }} />{SecondsToText(tempsRestant)} restante{tempsRestant > 1 ? 's' : ''}</p>
                                <p><FontAwesomeIcon icon={faTrophy} size='1x' style={{ marginRight: '10px' }} />{points} point{points > 1 ? 's' : ''}</p></div>
                            <div className='letters-container anime1'>
                                {tirages[index].map((element) => <div className='letters-tile' onClick={() => handleTirageClick(element)} style={{ cursor: 'cell' }}><span>{element}</span></div>)}
                            </div>
                            <div className='letters-container anime2'>
                                {answerLetters.map((element, index) => <div className='letters-tile' onClick={() => handleAnswerClick(element, index)} style={{ opacity: element === '' ? '0.4' : '1', cursor: element === '' ? 'default' : 'no-drop' }}><span>{element}</span></div>)}
                            </div>
                            <button className='button w-100 bg-normal' onClick={() => answerValidate()}><FontAwesomeIcon icon={faCheck} style={{ color: 'white', marginRight: '8px' }} />Valider le mot</button>
                            <button className='button w-100 bg-dark' onClick={() => {
                                setTimerActif(false);
                                clearInterval(minuteur);
                                setEndGame(true);
                            }} ><FontAwesomeIcon icon={faStop} style={{ color: 'white', marginRight: '8px' }} />Arrêter la partie</button>
                        </div>
                    </div>
    );
};