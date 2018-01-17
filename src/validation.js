export const validateSixCharacters = (str) => {
    if (str.length >= 6) {
        return false;
    }
    return true;
};

export const validateUppercaseLetter = (str) => {
    if (/[A-Z]/.test(str)) {
        return false;
    }
    return true;
};

export const validateOneNumber = (str) => {
    if (/[0-9]/.test(str)) {
        return false;
    }
    return true;
};