import { derivePath as deriveP } from 'ed25519-hd-key';
import { validateLiskPath } from './is-valid-coin-type';

export const derivePath = (path: string, seed: string) => {
    validateLiskPath(path);
    return deriveP(path, seed);
};
