import { createRouter } from 'next-connect';
import { remove } from '../../../src/controllers/products';

const route = createRouter();

route.delete(remove)

export default route.handler();
