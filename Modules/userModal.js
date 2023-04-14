const { default: mongoose } = require("mongoose");
mongoose.connect('mongodb+srv://arshiyachallana:arshiyachallana@web322.dawnkrc.mongodb.net/web322');
const userSchema = new mongoose.Schema({
    userName: { type: String, unique: true },
    password: String,
    email: String,
    loginHistory: [
        {
            dateTime: Date,
            userAgent: String
        }
    ]
});
const userMode = mongoose.model('User', userSchema)
export default userMode;