export default function formatMoney(price) {
    let lastTwoDigitsZero = (price / 100).toFixed(2).slice(-2) === '00';

    if (lastTwoDigitsZero) {
        return (price / 100).toString();
    }

    return (price / 100).toFixed(2);
}

export function formatUSCurrency(amount) {
    let price = amount / 100;

    return new Intl.NumberFormat('en', {
        style: "currency",
        currency: "USD",
    }).format(price);
}