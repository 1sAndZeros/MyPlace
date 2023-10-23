
const TokenGenerator = require("../lib/tokenGenerator");
const User = require("../models/user");
const FriendsController = {
   
    Create: async (req, res) => {
        console.log(req.user_id)
        console.log(req.body)
        const currentUser = await User.findById(req.user_id);
        if (currentUser.friends.includes(req.body.friendId)) {
        res.status(400).json({ message: "You already have friended this user" });
        } else {
            User.findByIdAndUpdate(req.user_id, {
                $push: { friends: req.body.friendId },
            }, { new: true })
            .populate({
                path: "friends",
                model: "User",
                select: "-password",
            })
            .then((updatedUser) => {
                console.log(updatedUser);
           
                res.status(201).json({ message: "OK Friend Added", user: updatedUser });
            }
            )
            .catch((error) => {
                console.log(error);
                res.status(400).json({ message: "Could Not Update Friends List" });
            }
        )};
    },
};


  



module.exports = FriendsController;
