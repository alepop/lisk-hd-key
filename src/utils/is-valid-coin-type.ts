export const COIN_TYPE = 134;

export const isValidateCoinType = (path: string) => {
    try {
        return parseInt(path.split('/')[2].replace("'", ''), 10) === COIN_TYPE
    } catch(e) {
        return false;
    }
}

const throwError = () => {
    throw new Error(
        `Lisk coin type must be ${COIN_TYPE}. (https://github.com/satoshilabs/slips/blob/master/slip-0044.md)`,
    );
}

export const validateLiskPath = (path: string) => {
    if (!isValidateCoinType(path)) throwError();
}