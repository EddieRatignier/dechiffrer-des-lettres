import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export default function Score({ points }) {
    const navigate = useNavigate();

    return (
        <div className='container slide-left'>
            <div className='box'>
                <div className='title-box'>Partie terminée</div>
                <div>
                    <p className='italic center-text'>Sur cette partie, vous avez gagné</p>
                    <p className='center-text big-text'>{points} point{points > 1 ? 's' : ''}</p>
                </div>
                <button className='button w-100 bg-normal' style={{ marginTop: '2vh' }} onClick={() => navigate('/')}><FontAwesomeIcon icon={faHouse} style={{ color: 'white', marginRight: '8px' }} />Menu principal</button>
            </div>
        </div>
    );
};