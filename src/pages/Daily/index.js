import React, { useEffect, useState } from 'react';
import PlayDaily from './PlayDaily';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHouse } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo';
import Cookies from 'js-cookie';

export default function Daily() {
    const navigate = useNavigate();
    const [status, setStatus] = useState();
    const [answers, setAnswers] = useState([]);
    const [totalPoints, setTotalPoints] = useState();

    useEffect(() => {
        if (Cookies.get('completed') && Cookies.get('score')) {
            setStatus('completed');
            let tempAnswers = JSON.parse(Cookies.get('score'));
            setAnswers(tempAnswers);
        }
    }, []);

    useEffect(() => {
        let tempTotalPoints = 0;
        for (const answer of answers) {
            tempTotalPoints += answer[1];
        }
        setTotalPoints(tempTotalPoints);
    }, [answers]);

    return (
        <>
            <div className='app'>
                <Logo />
                {
                    status == 'completed' ?
                        <div className='container slide-right'>
                            <div className='box'>
                                <div className='title-box'>À demain !</div>
                                <div>
                                    <p className='italic center-text'>Ajourd'hui, vous avez gagné</p>
                                    <p className='center-text big-text'>{totalPoints} point{totalPoints > 1 ? 's' : ''}</p>
                                    {answers.map((element, index) => <div className='answer'>Mot {index + 1} : <span className='bold uppercase'>{element[0]}</span> - {element[1]} point{element[1] > 1 ? 's' : ''}{element[1] === 0 ? <span className='italic'> (mot non valide)</span> : ''}</div>)}
                                </div>
                                <button className='button w-100 bg-normal' onClick={() => navigate('/')}><FontAwesomeIcon icon={faHouse} style={{ color: 'white', marginRight: '8px' }} />Menu principale</button>
                            </div>
                        </div>
                        :
                        <PlayDaily answers={answers} setAnswers={setAnswers} setStatus={setStatus} />
                }
            </div>
            <div className="css-gbfwo9"><span className="css-157xav3"></span><span className="css-twyun3"></span><span className="css-17ntouw"></span></div>
            <div className="footer">Développé avec <FontAwesomeIcon style={{ color: '#ED213A', marginLeft: '5px', marginRight: '5px' }} icon={faHeart} size="lg" /> par Eddie.&nbsp;<a href="https://www.linkedin.com/in/eddie-ratignier/" target="_blank" style={{ textDecoration: 'none', color: '#ababab' }}>Retrouvez-moi sur<FontAwesomeIcon icon={faLinkedin} size="lg" style={{ color: '#0077B5', marginLeft: '5px' }} /></a></div>
        </>
    );
};