import { createRouter } from 'next-connect';
import { get } from '../../../src/controllers/products';

const route = createRouter();

route.get(get);

export default route.handler();

export const config = {
    api: {
        bodyParser: false,
    },
}