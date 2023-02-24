import bcrypt from 'bcrypt';

const crypto =  async pwd => {
    const salt =  await bcrypt.genSaltSync(10);
    
    const password = await bcrypt.hash(pwd, salt);

    return password;
    }

const compare = (pwd, hash) => {
    const result = bcrypt.compare(pwd, hash)
    return result
}

export {
    crypto,
    compare
};