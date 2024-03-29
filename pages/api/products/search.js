import nextConnect from 'next-connect';
import { search } from '../../../src/controllers/products'

const route = nextConnect();

route.get(search);

export default route

export const config = {
    api: {
        bodyParser: false,
    },
}