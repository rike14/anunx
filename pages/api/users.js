import dbConnect from '../../src/utils/dbConnect';
import UsersModel from '../../src/models/users';
import { crypto } from '../../src/utils/password';

const users = async (req, res) => {
    const { method } = req;
    switch (method) {
        case 'GET':
            try {
                await dbConnect();
               
                res.status(200).json({ success: true });
            }
            catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
               const { name, email, password } = req.body;
                await dbConnect();

                const hashedPassword = await crypto(password);

                const user = new UsersModel({
                    name,
                    email,
                    password: hashedPassword,
                });
                user.save();

                res.status(201).json({ success: true });
            }
            catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
};

export default users;