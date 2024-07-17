import { createRouter } from 'next-connect';
import { get, post } from '../../src/controllers/users';

const route = createRouter();

route.get(get);

route.post(post);

export default route.handler();