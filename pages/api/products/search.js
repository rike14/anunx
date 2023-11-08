import nextConnect from 'next-connect';
import { get } from '../../../src/controllers/products'

const route = nextConnect();

route.get(get);

export default route

export const config = {
    api: {
        bodyParser: false,
    },
}