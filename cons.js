const credentials = {
    username: 'test_' + Date.now(),
    password: 'secret_' + Date.now(),
};

const petStatus = 'available';
const LOGIN_TAG = 'GET /user/login';
const FIND_PETS_TAG = 'GET /pet/findByStatus';
const FIND_PET_TAG = 'GET /pet';
const PLACE_ORDER_TAG ='POST /store/order';
const GET_ORDER_TAG = 'GET /store/order'

export {credentials, petStatus, LOGIN_TAG, FIND_PETS_TAG, FIND_PET_TAG, PLACE_ORDER_TAG, GET_ORDER_TAG};