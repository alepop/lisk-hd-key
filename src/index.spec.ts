import { signTransaction, getPublicKey } from './index';
import { prepareTransaction } from './sign';
import { derivePath } from './utils';
import * as eded25519 from 'ed25519-hd-key';

const path = "m/44'/134'/0'/0'/0'";
const hexSeed = '06bae687f0250ab9533be2ac9717ae2a802d69c97d547c2e862e66e05453b165cf3e06a649c826a6db3b702644dc1c9154ad3b4188b8c15848d83a87c1c48eca';
const unsignedTransaction = {
    "amount": "100000000000",
    "recipientId": "666L",
    "timestamp": 60225629,
    "type": 0,
    "fee": "20000000",
    "asset": {
        "data": "lol wat?"
    }
};

describe('Main module', () => {
    describe('signTransaction', () => {
        beforeEach(() => {
            (prepareTransaction as any) = jest.fn();
        });
        afterEach(() => {
            (prepareTransaction as any).mockRestore();
        });

        it('should add senderPublicKey field to transaction if it not exist', () => {
            (prepareTransaction as any).mockReturnValue(unsignedTransaction);
            const signedTransaction = signTransaction(hexSeed, path, unsignedTransaction);
            expect(signedTransaction.senderPublicKey).toBeDefined();
        });

        it('should convert ed25519 32 byte -> NaCL 64 byte private key', () => {
            const { key } = derivePath(path, hexSeed);
            const publicKey = eded25519.getPublicKey(key, false);
            signTransaction(hexSeed, path, unsignedTransaction);
            expect(prepareTransaction).toBeCalledWith(
                Object.assign(unsignedTransaction, { senderPublicKey: publicKey.toString('hex')}),
                Buffer.concat([key, publicKey])
            );
        });
    });
    describe('getPublicKey', () => {
        beforeAll(() => {
            (eded25519.getPublicKey as any) = jest.fn();
        });
        afterAll(() => {
            (eded25519.getPublicKey as any).mockRestore();
        });

        it('should call eded25519 getPublicKey method', () => {
            getPublicKey(path, hexSeed);
            expect(eded25519.getPublicKey).toBeCalled();
        });
    });
});
