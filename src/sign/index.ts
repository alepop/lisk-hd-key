import elements from 'lisk-elements';
const {
    cryptography,
    transaction: { utils },
} = elements;

export const signTransaction = (transaction, privateKey) => {
    const transactionHash = utils.getTransactionHash(transaction);
    return cryptography.signDataWithPrivateKey(
        transactionHash,
        privateKey
    );
};

export const prepareTransaction = (transaction, privateKey) => {
    const signedTransaction = Object.assign({}, transaction, {
        signature: signTransaction(transaction, privateKey)
    })
    const transactionWithId = Object.assign({}, signedTransaction, {
        id: utils.getTransactionId(signedTransaction),
    });

    return transactionWithId;
};
