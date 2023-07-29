export const getFechaActual = () => {
    const now = new Date();
    return [padTo2Digits(now.getDate()), padTo2Digits(now.getMonth() + 1), now.getFullYear()].join('/')
}

const padTo2Digits = (num: number) => {
    return num.toString().padStart(2, '0');
}