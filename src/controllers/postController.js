const {PrismaClient} = require ('@prisma/client');
const prisma = new PrismaClient();

exports.createPost = async (req, res) => {
    const {title, content} = req.body;
    try {
        const post = await prisma.post.create({
            data : {
                title,
                content,
                userId : req.user.id
            }
        });
        res.status(201).json(post);
    } catch (err) {
        return res.status(400).json({message : `${err}`});
    }
};

exports.updatePost = async (req, res) => {
    const postId = req.params.id;
    const {title, content} = req.body;
    try {
        const updatedPost = await prisma.post.update( {
            where: { id: parseInt(postId) },
            data: { title, content }
        });
        res.status(200).json(updatedPost);
    } catch (err) {
        return res.status(400).json({message: `${err}`});
    }
};

exports.deletePost = async (req, res) => {
    const postId = req.params.id;
    try {
        const deletedPost = await prisma.post.delete( {
            where : {id : parseInt(postId)}
        });
        res.status(204).json({message: "Post deleted successfully", Post_Deleted: deletedPost });
    }
    catch (err) {
        res.status(400).json({message: `${err}`});
    }
}


