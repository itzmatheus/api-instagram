const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
require('dotenv').config()

module.exports = {
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt');
        return res.json(posts);
    },

    async indexObj(req, res) {
        const post = await Post.findById(req.params.id);
        return res.json(post);
    },

    async store(req, res) {

        const { author_name, place, description, hashtags } = req.body;
        let fileNameImage = "";
        let fileNameAvatar = "";
    
/*

  {
    fieldname: 'image',
    originalname: 'IMG_20191213_194425.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    key: '330d0cf383f69d6aa495bc683819c016-IMG_20191213_194425.jpg',
    destination: '/home/matheus/Documents/workspaces/Javascript/Rocketseat/Weeks/07/api-instagram/uploads',
    filename: '330d0cf383f69d6aa495bc683819c016-IMG_20191213_194425.jpg',
    path: '/home/matheus/Documents/workspaces/Javascript/Rocketseat/Weeks/07/api-instagram/uploads/330d0cf383f69d6aa495bc683819c016-IMG_20191213_194425.jpg',
    size: 5086038
  }

*/

        if (req.files['image']){
            const { filename: image, key: key, location: url = "" } = req.files['image'];  
            fileNameImage = url;
            console.log(image)
            
            if ( (process.env.STORAGE_TYPE === 'local') && req.files['image']) { 

                const [name] = image.split('.');

                fileNameImage = `http://${process.env.APP_HOST}/files/${name}.jpg`;

                await sharp(req.files['image'].path)
                .resize(500)
                .jpeg({ quality: 70 })
                .toFile(
                    path.resolve(req.files['image'].destination, 'resized', name + '.jpg') 
                );
        
                fs.unlinkSync(req.files['image'].path);

            }
        }
        console.log("!23132132132131232131312")
        if (req.files['author_avatar']){
            const { filename: image, key: key, location: url = "" } = req.files['author_avatar'];  
            fileNameAvatar = url;
            
            if ( (process.env.STORAGE_TYPE === 'local') && req.files['author_avatar']) { 

                const [name] = image.split('.');

                fileNameAvatar = `http://${process.env.APP_HOST}/files/${name}.jpg`;

                await sharp(req.files['author_avatar'].path)
                .resize(500)
                .jpeg({ quality: 70 })
                .toFile(
                    path.resolve(req.files['author_avatar'].destination, 'resized', name + '.jpg') 
                );
        
                fs.unlinkSync(req.files['author_avatar'].path);

            }
        }

        const post = await Post.create({
            author_name,
            author_avatar: fileNameAvatar,
            place, 
            description,
            hashtags,
            image: fileNameImage,
        }); 

        req.io.emit('post', post);

        return res.json(post);
    },

    async delete(req, res) {

        const post = await Post.findById(req.params.id);
        await post.remove();
        return res.json({
            mensagem: "Postagem deletada com sucesso",
        });
    },

};