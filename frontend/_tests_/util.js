export const wait = async (amount = 0) => await new Promise(resolve => setTimeout(resolve, amount));