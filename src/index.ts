import {
    getMasterKeyFromSeed as getMasterK,
    derivePath as deriveP,
} from 'ed25519-hd-key';
import { crypto } from 'lisk-js';

const COIN_TYPE = 134; // https://github.com/satoshilabs/slips/blob/master/slip-0044.md

export const isValidateCoinType = (path: string) =>
    parseInt(path.split('/')[2].replace("'", ''), 10) === COIN_TYPE;

export const getMasterKeyFromSeed = getMasterK;

export const derivePath = (path: string, seed: string) => {
    if (!isValidateCoinType(path)) {
        throw new Error(
            `Lisk coin type must be ${COIN_TYPE}. https://github.com/satoshilabs/slips/blob/master/slip-0044.md`,
        );
    }
    return deriveP(path, seed);
};

export const getDerivedPathKeys = (path: string, seed: string) =>
    crypto.getPrivateAndPublicKeyFromSecret(derivePath(path, seed));

export const getDerivedPathData = (path: string, seed: string) => {
    const { privateKey, publicKey } = getDerivedPathKeys(path, seed);
    return {
        path,
        privateKey,
        publicKey,
        address: crypto.getAddressFromPublicKey(publicKey),
    };
};
