const mongoose = require('mongoose');

const PostScheema = new mongoose.Schema({
    author: String, 
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes: {
        type: Number,
        default: 0,
    }
}, {
    /*
    Cria em cada registro da tabela os campos createdAt e updatedAt
    armazenar a data de criacaco e atualizacao
    */
    timestamps: true,
}
);

module.exports = mongoose.model('Post', PostScheema);