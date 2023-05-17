import React, { useState } from 'react';
import SecondsToText from '../../components/SecondsToText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';

export default function Rules({ setStatus, rules, setRules }) {
    const [time, setTime] = useState(rules.time);
    const [words, setWords] = useState(rules.words);
    const [voyelles, setVoyelles] = useState(rules.voyelles);

    function Save() {
        let tempRules = rules;
        tempRules.time = time;
        tempRules.voyelles = voyelles;
        tempRules.words = words
        setRules(tempRules);
        setStatus('main');
        Cookies.set('rules', JSON.stringify(rules), { expires: 400 });
    }

    const handleCheckChange = e => {
        switch (e.target.name) {
            case 'time':
                setTime(e.target.value)
                break;
            case 'words':
                setWords(e.target.value)
                break;
            case 'voyelles':
                setVoyelles(e.target.value)
                break;
            default:
                break;
        }
    }

    return (
        <div className='container slide-left'>
            <div className='box'>
                <div className='title-box'>Paramètres</div>
                <div className='form'>
                    <label htmlFor="time">{time} secondes par mot</label>
                    <input className="range" type="range" name="time" id="time" min="30" max="600" step="30" onChange={handleCheckChange} value={time} />
                    <label htmlFor="words">{words} mot{words > 1 ? 's' : ''} par partie</label>
                    <input className="range" type="range" name="words" id="words" min="1" max="20" step="1" onChange={handleCheckChange} value={words} />
                    <label htmlFor="voyelles">{voyelles} voyelles</label>
                    <input className="range" type="range" name="voyelles" id="voyelles" min="3" max="10" step="1" onChange={handleCheckChange} value={voyelles} />
                    <span>La partie durera {SecondsToText(words * time)}</span>
                </div>
                <button className='button w-100 bg-normal' onClick={() => Save()}><FontAwesomeIcon icon={faFloppyDisk} style={{ color: 'white', marginRight: '8px' }} />Enregistrer</button>
            </div>
        </div>
    )
};