import { createRouter } from 'next-connect';
import { getByUser } from '../../../src/controllers/products';

const route = createRouter();

route.get(getByUser);

export default route.handler();

export const config = {
    api: {
        bodyParser: false,
    },
}