import { createRouter } from 'next-connect';
import { getProductByUser } from '../../../src/controllers/products';

const route = createRouter();

route.get(getProductByUser);

export default route.handler();

export const config = {
    api: {
        bodyParser: false,
    },
}