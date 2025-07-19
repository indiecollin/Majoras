export const delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
}

export const mod = (n, m) => {
    return ((n % m) + m) % m;
}



