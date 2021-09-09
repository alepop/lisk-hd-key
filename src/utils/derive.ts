import { derivePath as deriveP } from 'ed25519-hd-key';
import { validateLiskPath } from './is-valid-coin-type';

export const derivePath = (path: string, seedHex: Buffer|string) => {
    validateLiskPath(path);
    return deriveP(path, Buffer.isBuffer(seedHex) ? seedHex.toString('hex') : seedHex);
};
