import { createRouter } from 'next-connect';
import { getProductById } from '../../../src/controllers/products';

const route = createRouter();

route.get(getProductById);

export default route.handler();

export const config = {
    api: {
        bodyParser: false,
    },
}