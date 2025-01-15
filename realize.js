const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .,!?';

function processMessage() {
    const message = document.getElementById('message').value;
    const key = document.getElementById('key').value;
    const mode = document.getElementById('mode').value;
    const resultElement = document.getElementById('result');

    let result = '';

    if (mode === 'encrypt') {
        result = encryptMessage(message, key);
    } else if (mode === 'decrypt') {
        result = decryptMessage(message, key);
    }

    resultElement.value = result;
}

function encryptMessage(message, key) {
    const keyBinary = key.split('').map(char => char.charCodeAt(0).toString(2)).join('');
    let encryptedMessage = '';

    for (let char of message) {
        const charIndex = alphabet.indexOf(char);
        if (charIndex !== -1) {
            const encryptedChar = (charIndex * parseInt(keyBinary, 2)) + ';';
            encryptedMessage += encryptedChar;
        }
    }

    return encryptedMessage;
}

function decryptMessage(encryptedMessage, key) {
    const keyBinary = key.split('').map(char => char.charCodeAt(0).toString(2)).join('');
    const encryptedParts = encryptedMessage.split(';').filter(part => part);
    let decryptedMessage = '';

    for (let part of encryptedParts) {
        const originalIndex = Math.floor(parseInt(part) / parseInt(keyBinary, 2));
        const originalChar = alphabet[originalIndex];
        decryptedMessage += originalChar;
    }

    return decryptedMessage;
}
