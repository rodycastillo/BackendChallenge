const User = require('../schemas/User');
const CryptoJS = require('crypto-js');
const { generateJWT } = require('../helpers/generateJWT');

const login = async (req, res) => {
    const { dni } = req.body;
    try {
        const user = await User.findOne({dni})
        if(!user) {
            res.status(401).json({message: "Invalid DNI", status: false})
        }
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
        originalPassword !== req.body.password && res.status(401).json({message: "Invalid Password", status: false});
        const token = await generateJWT(user._id)
        const { password, ...info } = user._doc;
        res.status(200).json({ message: "Successfully Login", user: info, token, status: true });
    } catch (error) {
        res.status(500).json({ message: error, status: false });
    }
};

const register = async (req, res) => {
    try {
        const { name, email, password, dni } = req.body;

        const newUser = new User({
            name,
            email,
            password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString(),
            dni,
            rol: 'USER_ROLE'
        })
        const createdUser = await newUser.save();
        res.status(201).json({user: createdUser, status: true})
    } catch (error) {
        res.status(500).json({message: error, status: false })
    }
}
const updateUser = async (req, res) => {

    const { id } = req.body;
    
    try {
        const user = await User.findByIdAndUpdate(id, { $set: req.body}, {new: true});
        res.status(200).json({user, status: true});
    } catch (error) {
        res.status(500).json({error, status: false});
    }

}


module.exports = {
    login,
    register,
    updateUser
}