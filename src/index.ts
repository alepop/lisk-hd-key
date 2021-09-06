import { getPublicKey as getPubKey } from 'ed25519-hd-key';
import { derivePath } from './utils';
import { prepareTransaction } from './sign';

export const LISK_MAINNET_NETWORK_ID = '4c09e6a781fc4c7bdb936ee815de8f94190f8a7519becd9de2081832be309a99';

export const getPublicKey = (path: string, seed: string) => {
    const { key } = derivePath(path, seed);
    return getPubKey(key, false);
};

export const signTransaction = (seed: string,
                                path: string,
                                transaction: any, 
                                networkId: string = LISK_MAINNET_NETWORK_ID) => {
    const { key: privateKey } = derivePath(path, seed);
    const publicKey = getPubKey(privateKey, false);
    const networkIdBuffer = Buffer.from(networkId, 'hex');

    if (!transaction.senderPublicKey) {
        transaction.senderPublicKey = publicKey.toString('hex');
    }

    // ed25519 sk is 32 bytes long.
    // NaCL use 64 bytes for signing keys. NaCL store public key as a part of private key
    // https://crypto.stackexchange.com/a/54354
    const sk = Buffer.concat([privateKey, publicKey]);

    return prepareTransaction(transaction, sk, networkIdBuffer);
};
