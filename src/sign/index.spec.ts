jest.mock('lisk-elements');
import elements from 'lisk-elements';
const {
    cryptography,
    transaction: { utils },
} = elements;

import { signTransaction, prepareTransaction } from './';

const transactionHash = '0x8';
const privateKey = Buffer.from('privateKey');

describe('Sign', () => {
    describe('signTransaction', () => {
        beforeAll(() => {
            utils.getTransactionHash.mockImplementation(() => transactionHash)
        })
        it('should call lisk-elements getTransactionHash method', () => {
            signTransaction({}, privateKey);
            expect(utils.getTransactionHash).toBeCalled();
        });

        it('should call lisk-elements signDataWithPrivateKey', () => {
            signTransaction({}, privateKey);
            expect(cryptography.signDataWithPrivateKey).toBeCalledWith(transactionHash, privateKey)
        });
    });

    describe('prepareTransaction', () => {
        const signature = '123';
        const id = '123';
        beforeAll(() => {
            (signTransaction as any) = jest.fn(() => signature);
            utils.getTransactionId.mockImplementation(() => id);
        });
        afterAll(() => {
            (signTransaction as any).mockRestore();
        })
        it('should call signTransaction', () => {
            prepareTransaction({}, privateKey);
            expect(signTransaction).toBeCalledWith({}, privateKey);
        });

        it('should call lisk-elements getTransactionId method', () => {
            prepareTransaction({}, privateKey);
            expect(utils.getTransactionId).toBeCalledWith({ signature });
        });

        it('should return transaction with signature and id fields', () => {
            expect(prepareTransaction({}, privateKey)).toEqual({id, signature })
        })
    });
});