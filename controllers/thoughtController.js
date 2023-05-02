const { Thought, User, Reaction } = require('../models');

module.exports = {
    
    //get all thoughts
    async getThoughts(req, res){
        try{
            const thoughts = await Thought.find();
            res.json(thoughts);
        }catch(err){
            res.status(500).json(err);
        }
    },
    //get one thought
    async getThoughtById(req, res){
        try{
            const thought = await Thought.findOne({_id: req.params.thoughtId});
            if(!thought){
                return res.status(404).json({message: 'No thought with that ID'});
            }
            res.json(thought);
        }catch(err){
            res.status(500).json(err);
        }
    },
    //add a thought
    async addThought(req, res){
        try{
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { username: req.body.username },
                { $addToSet: {thoughts: thought._id}},
                { new: true },
            );
            res.json(user);
        }catch(err){
            res.status(500).json(err);
        }
    },
    //update a thought
    async updateThought(req, res){
        try{
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { $set: req.body}, 
                { new: true, runValidators: true });
            if(!thought){
                return res.status(404).json({message: 'No thought with that ID'});
            }
            res.json(thought);
        }catch(err){
            res.status(500).json(err);
        }
    },
    //delete thought
    async deleteThought(req, res){
        try{
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            res.json({message: 'Thought Deleted'});
        }catch(err){
            res.status(500).json(err);
        }
    },

    //add a reaction to a thought
    async createReaction(req, res){
        try{
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId},
                { $push: { reactions: { reactionBody: req.body.reactionBody, username: req.body.username} } },
                { new: true, runValidators: true })
            if(!thought){
                return res.status(404).json({message: 'No thought with that ID'});
            }
            res.json(thought);
        }catch(err){
            res.status(500).json(err);
        }
    },
    //delete reaction from a thought
    async deleteReaction(req, res){
        try{
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { $pull: { reactions: { reactionId: req.params.reactionId }}},
                { runValidators: true, new: true });
            if(!thought){
                return res.status(404).json({message: 'No thought with that ID'});
            }
            res.json(thought);
        }catch(err){
            res.stauts(500).json(err);
        }
    },
}