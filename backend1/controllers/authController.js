import bcrypt from "bcryptjs"
import User from "../models/userModel.js";
import generateTokenAndSetCookie from "../utils/generateToken.js"


export const signupUser = async (req, res) => {
    try {
        const { fullName, username, contact, email, password, confirmPassword, gender, state } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "passwords dont match" })
        }

        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ error: "username already exists" })
        }

        const contactno = await User.findOne({ contact });

        if (contactno) {
            return res.status(400).json({ error: "phone number already exists" })
        }

        const mail = await User.findOne({ email });

        if (mail) {
            return res.status(400).json({ error: "email already exists" })
        }

        //HASH PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            username,
            email,
            contact,
            password: hashPassword,
            gender,
            state
        })
        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                contact: newUser.contact,
            })
        } else {
            res.status(400).json({ error: "invalid user data" })
        }
    } catch (error) {
        console.log('error in signup controller', error.message)
        res.status(500).json({ error: "Internal server error" })
    }
}



export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username })
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!isPasswordCorrect || !user) {
            return res.status(400).json({ error: "Invalid username or password" })
        }
        generateTokenAndSetCookie(user._id, res);
        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            contact: user.contact,
        })

    } catch (error) {
        console.log("error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const logoutUser = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        console.log("Error in logout controll;er ", error.message);
        res.status(500).json({ error: "Internal server error" })
    }
}