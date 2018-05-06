import { isValidateCoinType } from './is-valid-coin-type';

const path = "m/44'/134'/0'/0'";
const invalidPath = "m/44'/0'/0'/0'";

describe('is-valide-coin-type', () => {
    it('should return false for invalid coun type', () => {
        expect(isValidateCoinType(invalidPath)).toBeFalsy();
    });
    it('should return true for valid coin type', () => {
        expect(isValidateCoinType(path)).toBeTruthy();
    });
});
