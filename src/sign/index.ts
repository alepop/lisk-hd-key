import * as cryptography from '@liskhq/lisk-cryptography';
import * as transactions from '@liskhq/lisk-transactions';
import { getTransactionSchema } from './liskSchemas';

export const signTransaction = (transaction: any,
                                privateKey: Buffer,
                                networkIdentifier: Buffer) => {
    const TxSchema = getTransactionSchema(transaction);
    const txSigningBytes = transactions.getSigningBytes(TxSchema.schema, transaction);
    const tx = Buffer.concat([ networkIdentifier, txSigningBytes ]);
    return cryptography.signDataWithPrivateKey(
        tx,
        privateKey
    );
};

export const prepareTransaction = (transaction: any,
                                   privateKey: Buffer,
                                   networkIdentifier: Buffer) => {
    const signature = signTransaction(transaction, privateKey, networkIdentifier)
    // Copy transaction
    let signedTransaction = Object.assign({}, transaction)
    // Add signature to signatures array.
    if(Array.isArray(signedTransaction.signatures))
        signedTransaction.signatures.push(signature);
    else
        signedTransaction.signatures = [ signature ];
    return signedTransaction;
};

export const getBytesToBroadcast = (transaction: any) => {
    const TxSchema = getTransactionSchema(transaction);
    return transactions.getBytes(TxSchema.schema, transaction);
}