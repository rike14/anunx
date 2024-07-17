import { createRouter } from 'next-connect';
import { search } from '../../../src/controllers/products';

const route = createRouter();

route.get(search);

export default route.handler();

export const config = {
    api: {
        bodyParser: false,
    },
}