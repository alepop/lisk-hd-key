import * as cryptography from '@liskhq/lisk-cryptography';
import * as transactions from '@liskhq/lisk-transactions';
import { getTransactionSchema } from './liskSchemas';

export const signTransaction = (transaction, privateKey, networkIdentifier) => {
    const TxSchema = getTransactionSchema(transaction);
    const txSigningBytes = transactions.getSigningBytes(TxSchema.schema, transaction);
    const tx = Buffer.concat([ networkIdentifier, txSigningBytes ]);
    return cryptography.signDataWithPrivateKey(
        tx,
        privateKey
    );
};

export const prepareTransaction = (transaction, privateKey, networkIdentifier) => {
    const signedTransaction = Object.assign({}, transaction, {
        signature: signTransaction(transaction, privateKey, networkIdentifier)
    })
    return signedTransaction;
};
