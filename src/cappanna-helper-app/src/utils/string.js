export function padLeft(s, c, n) {
    return n - s.length > 0 ? c.repeat(n - s.length) + s : s;
}

export function formatAmount(amount, includeEuro = true) {
    return (includeEuro ? "€ " : "") + padLeft(amount.toFixed(2), " ", 5);
}
