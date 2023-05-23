import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faHouse } from '@fortawesome/free-solid-svg-icons';
import RandomSeed from 'random-seed';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import GetResultsPossible from '../../components/GetResultsPossible';
import GetWordPoints from '../../components/GetWordPoints';
import Loading from '../../assets/Loading';

export default function PlayDaily({ answers, setAnswers, setStatus }) {
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const [manche, setManche] = useState({});
    const [remainLetters, setRemainLetters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [answerLetters, setAnswerLetters] = useState(['', '', '', '', '', '', '', '', '', '']);
    const remainLettersRef = useRef(remainLetters);
    const answerLettersRef = useRef(answerLetters);
    const answersRef = useRef(answers);
    const mancheRef = useRef(manche);
    const navigate = useNavigate();

    //Génération du tirage du jour, récupération des réponses possibles avec ce tirage, écoute des frappes et fin du chargement au chargement de la page
    useEffect(() => {
        const date = new Date();
        const randomSeeded = RandomSeed.create(date.getDate() + '' + date.getMonth() + '' + date.getFullYear());
        const alphabet = { 0: 'z', 1: "a", 2: "b", 3: "c", 4: "d", 5: "e", 6: "f", 7: "g", 8: "h", 9: "i", 10: "j", 11: "k", 12: "l", 13: "m", 14: "n", 15: "o", 16: "p", 17: "q", 18: "r", 19: "s", 20: "t", 21: "u", 22: "v", 23: "w", 24: "x", 25: "y" };
        const nearestVowel = { b: 'a', c: 'a', d: 'e', f: 'e', g: 'e', h: 'e', j: 'i', k: 'i', l: 'i', m: 'i', n: 'o', p: 'o', q: 'o', r: 'o', s: 'u', t: 'u', v: 'u', w: 'u', x: 'u', y: 'u', z: 'u' };
        const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
        let tempTirage = [];
        let countVowels = 0;
        for (let i = 0; i < 10; i++) {
            let index = Math.floor(randomSeeded.random() * 26);
            let tempLetter = alphabet[index];
            if (vowels.includes(tempLetter)) {
                countVowels++;
            }
            if (i > 7 && !(countVowels === 3)) {
                tempTirage.push(nearestVowel[tempLetter]);
            } else {
                tempTirage.push(tempLetter);
            }
        }
        setRemainLetters(tempTirage);
        GetResultsPossible(tempTirage).then((response) => {
            setManche({ tirage: tempTirage, resultsPossible: response });
            setLoading(false);
        });
        if (Cookies.get('score')) {
            let tempAnswers = JSON.parse(Cookies.get('score'));
            setAnswers(tempAnswers);
        }
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    //Si les 5 mots ont été entrés, alors ajout du cookie avec le score du jour -> status = completed
    useEffect(() => {
        if (answers.length === 5) {
            Cookies.set('completed', true, { expires: midnight });
            setStatus('completed');
        }
    }, [answers]);

    //Gestion des frappes
    const handleKeyUp = (event) => {
        const tempKey = event.key.toLowerCase();
        let tempAnswerLetters = structuredClone(answerLettersRef.current);
        let tempRemainLetters = structuredClone(remainLettersRef.current);
        const tempManche = structuredClone(mancheRef.current);
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
        } else if (tempKey === 'enter') {
            sendAnswer();
        }
    };

    //Gestion des réponses entrées
    function sendAnswer() {
        const tempManche = structuredClone(mancheRef.current);
        const tempAnswers = structuredClone(answersRef.current);
        let tempAnswerLetters = structuredClone(answerLettersRef.current);
        const tempMot = tempAnswerLetters.join('');
        if (checkIfExist(tempMot)) {
            //Mot existe
        } else if (tempMot.length === 0) {
            //Réponse vide
        } else {
            if (tempManche.resultsPossible.includes(tempMot)) {
                const tempPoints = GetWordPoints(tempMot);
                tempAnswers.push([tempMot, tempPoints]);
            } else {
                tempAnswers.push([tempMot, 0]);
            }
            setAnswerLetters(['', '', '', '', '', '', '', '', '', '']);
            setRemainLetters(manche.tirage);
            setAnswers(tempAnswers);
            Cookies.set('score', JSON.stringify(tempAnswers), { expires: midnight });
        }
    }

    //Check si la réponse a déjà été donnée
    function checkIfExist(word) {
        for (let i = 0; i < answersRef.current.length; i++) {
            if (answersRef.current[i][0] == word) {
                return true;
            }
        }
        return false;
    }

    //Gestion des références
    useEffect(() => {
        remainLettersRef.current = structuredClone(remainLetters);
        answerLettersRef.current = structuredClone(answerLetters);
        mancheRef.current = structuredClone(manche);
        answersRef.current = structuredClone(answers);
    }, [remainLetters, answerLetters, manche, answers]);


    function handleTirageClick(element) {
        let tempAnswerLetters = structuredClone(answerLetters);
        let tempRemainLetters = structuredClone(remainLetters);
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
            let tempAnswerLetters = structuredClone(answerLetters);
            let tempRemainLetters = structuredClone(remainLetters);
            tempAnswerLetters[index] = '';
            tempRemainLetters.push(element);
            setRemainLetters(tempRemainLetters);
            setAnswerLetters(tempAnswerLetters);
        }
    }

    function filterAndRemoveFirstOccurrence(arr, value) {
        let index = arr.findIndex(item => item === value);
        if (index !== -1) {
            arr = arr.filter((item, i) => i !== index);
        }
        return arr;
    }

    return (
        loading ?
            <div className='container'>
                <Loading />
            </div>
            :
            <div className='container slide-left'>
                <div className='box'>
                    <div className='title-box'>Tirage du jour</div>
                    <div className='letters-container anime1'>
                        {manche.tirage.map((element) => <div className='letters-tile' onClick={() => handleTirageClick(element)} style={{ cursor: 'cell' }}><span>{element}</span></div>)}
                    </div>
                    <div className='letters-container anime2'>
                        {answerLetters.map((element, index) => <div className='letters-tile' onClick={() => handleAnswerClick(element, index)} style={{ opacity: element === '' ? '0.4' : '1', cursor: element === '' ? 'default' : 'no-drop' }}><span>{element}</span></div>)}
                    </div>
                    <div className='answers-container'>
                        {answers.length > 0 ? <p className='italic center-text'>Réponses :</p> : ''}
                        {answers.map((element, index) => <div className='answer'>Mot {index + 1} : <span className='bold uppercase'>{element[0]}</span> - {element[1]} point{element[1] > 1 ? 's' : ''}{element[1] === 0 ? <span className='italic'> (le mot n'est pas valide)</span> : ''}</div>)}
                    </div>
                    <button className='button w-100 bg-normal' onClick={() => sendAnswer()} ><FontAwesomeIcon icon={faCheck} style={{ color: 'white', marginRight: '8px' }} />Valider le mot</button>
                    <button className='button w-100 bg-dark' onClick={() => navigate('/')} ><FontAwesomeIcon icon={faHouse} style={{ color: 'white', marginRight: '8px' }} />Menu principal</button>
                </div >
            </div>
    )
};