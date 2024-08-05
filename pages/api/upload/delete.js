import { del } from '@vercel/blob';

export const config = {
    runtime: 'edge',
};

export default async function deleteFile (request) {
    const fileUrl = await request.json()
    await del(fileUrl);

    return new Response();
};

