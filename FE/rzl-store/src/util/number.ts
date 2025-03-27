const formatNumberWithComma = (num: number | null | undefined) => {
    return num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0;
}

export default formatNumberWithComma;