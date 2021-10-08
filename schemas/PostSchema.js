const {Schema, model} = require('mongoose')

const PostSchema = new Schema({
    content: {
        type: String,
        trim: true
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    pinned: Boolean,
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]

}, {timestamps: true})

const Post = model('Post', PostSchema);
module.exports = Post;