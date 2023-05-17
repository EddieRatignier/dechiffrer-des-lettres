export default function SecondsToText(seconds) {
    const minutesRemain = Math.floor((seconds % 3600) / 60);
    const secondsRemain = seconds % 60;
    const hoursRemain = Math.floor(seconds / 3600)
    let textminutes = minutesRemain + ' minute ';
    let texthours = hoursRemain + ' heure ';
    let textseconds = secondsRemain + ' seconde ';
    let textand1 = '';
    let textand2 = '';

    if (minutesRemain > 1) {
        textminutes = minutesRemain + ' minutes ';
    } else if (minutesRemain === 0) {
        textminutes = '';
    }

    if (secondsRemain > 1) {
        textseconds = secondsRemain + ' secondes ';
    } else if (secondsRemain === 0) {
        textseconds = '';
    }

    if (hoursRemain > 1) {
        texthours = hoursRemain + ' heures ';
    } else if (hoursRemain === 0) {
        texthours = '';
    }

    if (secondsRemain > 0 && minutesRemain > 0) {
        textand2 = ' et ';
    }

    if (hoursRemain > 0 && minutesRemain > 0) {
        textand1 = ' et ';
    }

    return `${texthours + textand1 + textminutes + textand2 + textseconds}`;
}