import { createRouter } from 'next-connect';
import { post } from '../../../src/controllers/auth/signin';

const route = createRouter();

route.post(post);

export default route.handler();