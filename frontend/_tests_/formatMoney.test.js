import formatMoney from '../lib/formatMoney';

describe('Format Money', () => {
    it('formats 100 correctly', () => {
        let formattedMoney = formatMoney("10000");
        expect(formattedMoney).toEqual("100");
    });
    it('formats 100.99 correctly', () => {
        let formattedMoney = formatMoney("10099");
        expect(formattedMoney).toEqual("100.99");
    });
});