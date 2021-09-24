import cloneDeep from "lodash.clonedeep";

export const swipeLeft = (data, score) => {
    let newArray = cloneDeep(data);
    let newScore = score;

    for (let i = 0; i < 4; i++) {
        let b = newArray[i];
        let slow = 0;
        let fast = 1;
        while (slow < 4) {
            if (fast === 4) {
                fast = slow + 1;
                slow++;
                continue;
            }

            if (b[slow] === 0 && b[fast] === 0) {
                fast++;
            } else if (b[slow] === 0 && b[fast] !== 0) {
                b[slow] = b[fast];
                b[fast] = 0;
                fast++;
            } else if (b[slow] !== 0 && b[fast] === 0) {
                fast++;
            } else if (b[slow] !== 0 && b[fast] !== 0) {
                if (b[slow] === b[fast]) {
                    b[slow] = b[slow] + b[fast];
                    newScore = newScore + b[slow];
                    b[fast] = 0;
                    slow++;
                    fast = slow + 1;
                } else {
                    slow++;
                    fast = slow + 1;
                }
            }
        }
    }
    return {newArray, newScore};
};

// Swipe Derecha
export const swipeRight = (data, score) => {
    let newArray = cloneDeep(data);
    let newScore = score;

    for (let i = 3; i >= 0; i--) {
        let b = newArray[i];
        let slow = b.length - 1;
        let fast = slow - 1;
        while (slow > 0) {
            if (fast === -1) {
                fast = slow - 1;
                slow--;
                continue;
            }

            if (b[slow] === 0 && b[fast] === 0) {
                fast--;
            } else if (b[slow] === 0 && b[fast] !== 0) {
                b[slow] = b[fast];
                b[fast] = 0;
                fast--;
            } else if (b[slow] !== 0 && b[fast] === 0) {
                fast--;
            } else if (b[slow] !== 0 && b[fast] !== 0) {
                if (b[slow] === b[fast]) {
                    b[slow] = b[slow] + b[fast];
                    newScore = newScore + b[slow];
                    b[fast] = 0;
                    slow--;
                    fast = slow - 1;
                } else {
                    slow--;
                    fast = slow - 1;
                }
            }
        }
    }
    return {newArray, newScore};
};

// Swipe Abajo
export const swipeDown = (data, score) => {
    let newArray = cloneDeep(data);
    let newScore = score;

    for (let i = 3; i >= 0; i--) {
        let slow = newArray.length - 1;
        let fast = slow - 1;
        while (slow > 0) {
            if (fast === -1) {
                fast = slow - 1;
                slow--;
                continue;
            }
            if (newArray[slow][i] === 0 && newArray[fast][i] === 0) {
                fast--;
            } else if (newArray[slow][i] === 0 && newArray[fast][i] !== 0) {
                newArray[slow][i] = newArray[fast][i];
                newArray[fast][i] = 0;
                fast--;
            } else if (newArray[slow][i] !== 0 && newArray[fast][i] === 0) {
                fast--;
            } else if (newArray[slow][i] !== 0 && newArray[fast][i] !== 0) {
                if (newArray[slow][i] === newArray[fast][i]) {
                    newArray[slow][i] = newArray[slow][i] + newArray[fast][i];
                    newScore = newScore + newArray[slow][i];
                    newArray[fast][i] = 0;
                    slow--;
                    fast = slow - 1;
                } else {
                    slow--;
                    fast = slow - 1;
                }
            }
        }
    }
    return {newArray, newScore};
};

// Swipe Arriba
export const swipeUp = (data, score) => {
    let newArray = cloneDeep(data);
    let newScore = score;

    for (let i = 0; i < 4; i++) {
        let slow = 0;
        let fast = 1;
        while (slow < 4) {
            if (fast === 4) {
                fast = slow + 1;
                slow++;
                continue;
            }
            if (newArray[slow][i] === 0 && newArray[fast][i] === 0) {
                fast++;
            } else if (newArray[slow][i] === 0 && newArray[fast][i] !== 0) {
                newArray[slow][i] = newArray[fast][i];
                newArray[fast][i] = 0;
                fast++;
            } else if (newArray[slow][i] !== 0 && newArray[fast][i] === 0) {
                fast++;
            } else if (newArray[slow][i] !== 0 && newArray[fast][i] !== 0) {
                if (newArray[slow][i] === newArray[fast][i]) {
                    newArray[slow][i] = newArray[slow][i] + newArray[fast][i];
                    newScore = newScore + newArray[slow][i];
                    newArray[fast][i] = 0;
                    slow++;
                    fast = slow + 1;
                } else {
                    slow++;
                    fast = slow + 1;
                }
            }
        }
    }
    return {newArray, newScore};
};