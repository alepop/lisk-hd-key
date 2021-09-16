import { sign } from 'crypto';

jest.mock('@liskhq/lisk-cryptography');
jest.mock('@liskhq/lisk-transactions');
jest.mock('./liskSchemas');
import * as cryptography from '@liskhq/lisk-cryptography';
import * as transactions from '@liskhq/lisk-transactions';
import * as liskSchemas from './liskSchemas';
import { signTransaction, prepareTransaction } from './';

const txSigningBytes = Buffer.from('0x08');
const privateKey = Buffer.from('privateKey');
const networkIdentifier = Buffer.from('networkIdentifier');
const signatures = Buffer.concat([ networkIdentifier, txSigningBytes ]);

describe('Sign', () => {
    describe('signTransaction', () => {
        beforeAll(() => {
            jest.spyOn(transactions, 'getSigningBytes').mockReturnValue(txSigningBytes)
            jest.spyOn(liskSchemas, 'getTransactionSchema').mockReturnValue(liskSchemas.TransferAssetSchema)
        })
        it('should call transactions.getSigningBytes method', () => {
            signTransaction({}, privateKey, networkIdentifier);
            expect(transactions.getSigningBytes).toBeCalled();
        });

        it('should call cryptography.signDataWithPrivateKey', () => {
            signTransaction({}, privateKey, networkIdentifier);
            expect(cryptography.signDataWithPrivateKey).toBeCalledWith(signatures, privateKey)
        });
    });

    describe('prepareTransaction', () => {
        beforeAll(() => {
            (signTransaction as any) = jest.fn(() => signatures);
        });
        afterAll(() => {
            (signTransaction as any).mockRestore();
        })
        it('should call signTransaction', () => {
            prepareTransaction({}, privateKey, networkIdentifier);
            expect(signTransaction).toBeCalledWith({}, privateKey, networkIdentifier);
        });

        it('should return transaction with signature field', () => {
            expect(prepareTransaction({}, privateKey, networkIdentifier)).toEqual({ signatures: [signatures] })
        })
    });
});
