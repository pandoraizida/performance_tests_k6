export const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

export const getPayload = (petId) => {
    return JSON.stringify({
        id: getRandomNumber(1, 10000),
        petId: petId,
        quantity: 1,
        shipDate: Date.now(),
        status: 'placed',
        complete: true
    });
}