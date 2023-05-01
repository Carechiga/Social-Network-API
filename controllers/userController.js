const { User, Thought, Reaction } = require('../models');

module.exports = {

    //get all users
    async getUsers(req, res) {
        try{
            const users = await User.find();
            res.json(users);
        }catch(err){
            res.status(500).json(err);
        }
    },
    //get a single user
    async getSingleUser(req, res) {
        try{
            const user = await User.findOne({_id: req.params.userId})
            .select('-__v');

            if(!user){
                return res.status(404).json({message: 'No user with that ID'});
            }
            res.json(user);
        }catch(err){
            res.status(500).json(err);
        }
    },
    //create a new user
    async createUser(req, res) {
        try {
          const user = await User.create(req.body);
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
        // Delete a user and associated thoughts
    async deleteUser(req, res) {
        try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }

        await Application.deleteMany({ _id: { $in: user.thoughts } });
        res.json({ message: 'User and associated thoughts deleted!' })
        } catch (err) {
        res.status(500).json(err);
        }
    },
     //update user info
    async updateUser(req, res) {
        try{
           const user =  User.findOneAndUpdate({ _id: params.userId}, { $push: { friends: params.friendId } }, { new: true, runValidators: true });
           if (!user) {
            return res.status(404).json({ message: 'No user found with that ID' });
          }
           res.json(user);
        }catch (err) {
            res.status(500).json(err);
        }
    },
    //add friend to user friend list
    async addFriend(req, res) {
        try{
           const user =  User.findOneAndUpdate({ _id: req.params.id}, { $addToSet: { friends: req.params.friendId} }, { new: true, runValidators: true });
           if (!user) {
            return res.status(404).json({ message: 'No user found with that ID' });
          }
           const userObj = {
            user,
            friendCount: await friendCount(),
           }
        
           res.json(userObj);
        }catch (err) {
            res.status(500).json(err);
        }
    },
    //remove friend from friend list
    async removeFriend(req, res){
        try{
            const user = User.findOneAndUpdate({ _id: req.params.id}, { $pull: { friends: req.params.friendId} });
            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID' });
              }
              const userObj = {
                user,
                friendCount: await friendCount(),
               }
            
               res.json(userObj);
        }catch (err) {
            res.status(500).json(err);
        }
    }

}