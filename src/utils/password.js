import bcrypt from 'bcrypt';

const crypto =  async pwd => {
    const salt =  await bcrypt.genSaltSync(10);
    
    const password = await bcrypt.hash(pwd, salt);

    return password;
    }

export {
    crypto,
};