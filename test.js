import http from 'k6/http';
import { sleep, check } from 'k6';
import { config } from './config.js';
import { getRandomNumber, getPayload } from './helpers.js';
import * as cons from './cons.js';

const test_mode = __ENV.test_mode;  // smoke, load, stress, soak
const runId = __ENV.TEST_RUN_ID || 'default'; //run tests with or without TestId
const baseUrl = config["baseUrl"];
const stages = config[test_mode]["stages"] // defining stages used in options


const params = {
    headers: {
    'Content-Type': 'application/json',
    },
};

export let options = {
    stages: stages,
      tags: {
    testid: runId
  }
};

export default function () {

    console.log("Configuration", JSON.stringify({ test_mode, baseUrl, stages, runId }));

    //Log in
    let res = http.get(
        `${baseUrl}/user/login?username=${cons.credentials.username}&password=${cons.credentials.password}`,
        { ...params,
        tags: { ...params.tags, name: cons.LOGIN_TAG}
        }
    );
    
    check(res, {
        'login is 200': (r) => r.status === 200,
        'login message includes user session': (r) => r.body.includes('logged in user session')
    });
    sleep(1);


    //Find pets by status
    res = http.get(`${baseUrl}/pet/findByStatus?status=${cons.petStatus}`,
        { ...params, tags: 
            {...params.tags, name: cons.FIND_PETS_TAG}
        }
    );

    check(res, {
        'find pets by status is 200': (r) => r.status === 200
    });


    const rundomIndex = getRandomNumber(1,6);
    const petId = res.json()[rundomIndex].id;
    sleep(1);


    //Find pet by Id
    res = http.get(`${baseUrl}/pet/${petId}`, 
        {...params, tags: 
            {...params.tags, name: cons.FIND_PET_TAG
        }
    });

    check(res, {
        'find pet by id is 200': (r) => r.status === 200,
        'body includes pet Id': (r) => r.body.includes(petId)
    });
    sleep(1);

    //Place an order for a pet;
    const orderPayload = getPayload(petId);

    res = http.post(`${baseUrl}/store/order`, orderPayload, 
        {...params, tags: 
            {...params.tags, name: cons.PLACE_ORDER_TAG
        }
    });
    
    const orderId = res.json().id;
    
    check(res, {
        'place an order is 200': (r) => r.status === 200,
        'body includes order Id': (r) => r.body.includes(petId)
    });
    sleep(1);
    

    //Get an order by order Id
    res = http.get(`${baseUrl}/store/order/${orderId}`, 
        {...params, tags: 
            {...params.tags, name: cons.GET_ORDER_TAG
        }
    });

    check(res, {
        'get an order by Id is 200': (r) => r.status === 200,
    });
}