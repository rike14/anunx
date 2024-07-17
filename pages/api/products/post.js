import { createRouter } from 'next-connect';
import { post } from '../../../src/controllers/products';

const route = createRouter();

route.post(post);

export default route.handler();

export const config = {
    api: {
        bodyParser: false,
    },
}