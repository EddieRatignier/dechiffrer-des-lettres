export default function GetWordPoints(word) {
    let score = 0;
    const points1 = ['A', 'E', 'I', 'L', 'N', 'O', 'R', 'S', 'T', 'U'];
    const points2 = ['D', 'G', 'M'];
    const points3 = ['B', 'C', 'P'];
    const points4 = ['F', 'H', 'V'];
    const points8 = ['J', 'Q'];
    const points10 = ['K', 'W', 'X', 'Y', 'Z'];

    for (const letter of word) {
        const a = letter.toUpperCase();
        if (points1.includes(a)) {
            score += 1;
        } else if (points2.includes(a)) {
            score += 2;
        } else if (points3.includes(a)) {
            score += 3;
        } else if (points4.includes(a)) {
            score += 4;
        } else if (points8.includes(a)) {
            score += 8;
        } else if (points10.includes(a)) {
            score += 10;
        }
    }
    if (word.length == 2) {
        score = score * 1.5;
    } else if (word.length == 2) {
        score = score * 2;
    } else if (word.length == 3) {
        score = score * 2.5;
    } else if (word.length == 4) {
        score = score * 3;
    } else if (word.length == 5) {
        score = score * 3.5;
    } else if (word.length == 6) {
        score = score * 4;
    } else if (word.length == 7) {
        score = score * 4.5;
    } else if (word.length == 8) {
        score = score * 5;
    } else if (word.length == 9) {
        score = score * 6;
    } else if (word.length == 10) {
        score = score * 7;
    }

    return Math.ceil(score);
}