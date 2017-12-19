import {
    derivePath,
    isValidateCoinType,
    getDerivedPathData,
    getDerivedPathKeys,
} from './';

import * as ed25519 from 'ed25519-hd-key';

const path = "m/44'/134'/0'/0'";
const invalidPath = "m/44'/0'/0'/0'";
const seed =
    'fffcf9f6f3f0edeae7e4e1dedbd8d5d2cfccc9c6c3c0bdbab7b4b1aeaba8a5a29f9c999693908d8a8784817e7b7875726f6c696663605d5a5754514e4b484542';

describe('Lisk HD key', () => {
    describe('isValidateCoinType', () => {
        it('should return false for invalid coun type', () => {
            expect(isValidateCoinType(invalidPath)).toBeFalsy();
        });
        it('should return true for valid coin type', () => {
            expect(isValidateCoinType(path)).toBeTruthy();
        });
    });
    describe('derivePath', () => {
        beforeAll(() => {
            (ed25519.derivePath as any) = jest.fn();
        });

        afterAll(() => {
            (ed25519.derivePath as any).mockRestore();
        });

        it('should call derivePath from ed25519-hd-key package', () => {
            derivePath(path, seed);
            expect(ed25519.derivePath).toBeCalledWith(path, seed);
        });

        it('should throw Error for not Lisk coin type', () => {
            expect(() => derivePath(invalidPath, seed)).toThrowError(
                'Lisk coin type must be 134. https://github.com/satoshilabs/slips/blob/master/slip-0044.md',
            );
        });
    });

    describe('getDerivedPathKeys', () => {
        it('should return valid data', () => {
            expect(getDerivedPathKeys(path, seed)).toEqual({
                publicKey:
                    'e30cf4e31a16d98fa455c25e965f07313ddd4c7391f2c4d9a20fd0326eebe013',
                privateKey:
                    'eb045d78d273107348b0300c01d29b7552d622abbc6faf81b3ec55359aa9950ce30cf4e31a16d98fa455c25e965f07313ddd4c7391f2c4d9a20fd0326eebe013',
            });
        });
    });

    describe('getDerivedPathData', () => {
        it('should return valid data', () => {
            expect(getDerivedPathData(path, seed)).toEqual({
                path,
                publicKey:
                    'e30cf4e31a16d98fa455c25e965f07313ddd4c7391f2c4d9a20fd0326eebe013',
                privateKey:
                    'eb045d78d273107348b0300c01d29b7552d622abbc6faf81b3ec55359aa9950ce30cf4e31a16d98fa455c25e965f07313ddd4c7391f2c4d9a20fd0326eebe013',
                address: '2016897913186254339L',
            });
        });
    });
});
