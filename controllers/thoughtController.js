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
            const thought = await Thought.findOne({__id: req.params.id});
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
            const thought = await Thought.create({thoughtText: req.body.thoughtText, username: req.body.userId});
            res.json(thought);
        }catch(err){
            res.status(500).json(err);
        }
    },
    //update a thought
    async updateThought(req, res){
        try{
            const thought = await Thought.findOneAndUpdate({ _id: req.params.id, thoughtText: req.body}, { new: true });
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
            const thought = await Thought.findOneAndDelete({ _id: req.params.id });
            res.json(thought);
        }catch(err){
            res.status(500).json(err);
        }
    },

    //add a reaction to a thought
    async createReaction(req, res){
        try{
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId}, { $push: { reactions: { reactionBody: body.reactionBody, username: body.username} } },{ new: true, runValidators: true })
            if(!thought){
                return res.status(404).json({message: 'No thought with that ID'});
            }
            res.json(thought);
        }catch(err){
            res.stauts(500).json(err);
        }
    },
    //delete reaction from a thought
    async deleteReaction(req, res){
        try{
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId}, { $pull: { reactions: req.params.reactionId} } )
            if(!thought){
                return res.status(404).json({message: 'No thought with that ID'});
            }
            res.json(thought);
        }catch(err){
            res.stauts(500).json(err);
        }
    },
}