import formidable from 'formidable-serverless';
import ProductsModel from '../models/products';
import dbConnect from '../utils/dbConnect';


const post = (async (req, res) => {
    await dbConnect()

    const form = new formidable.IncomingForm({
        multiples: true,
        uploadDir: 'public/uploads',
        keepExtensions: true,
    })

    form.parse(req, async (error, fields) => {
        if (error) {
            return res.status(500).json({ success: true })
        }

        const { files } = fields

        const filesParser = JSON.parse(files)

        const filesToSave = []

        filesParser.files.forEach(async file => {
            filesToSave.push({ 
                    name: file.pathname, 
                    path: file.url
                })
        })
            
        const { 
            title, 
            category, 
            description, 
            price, 
            name,
            email,
            phone,
            userId,
            image,
            city,
        } = fields

        const product = new ProductsModel({
            title,
            category,
            description,
            price,
            user: {
                id: userId,
                name,
                email,
                phone,
                image: image == 'null' ? null : image,
                city,
            },
            files: filesToSave,
            date : Date.now(),
        })

        const savedProduct = await product.save()

        if(!savedProduct) return res.status(500).json({ message: 'error' })

        return res.status(201).json({ message: 'success' })

    })

   
})

const remove = (async (req, res) => {
    await dbConnect()

    const id  = req.body.id
    
    const deleted = await ProductsModel.findByIdAndDelete({ _id: id })

    if (!deleted) return res.status(500).json({ message: 'error' })

    return res.status(200).json({ message: 'success' })
})

const search = (async (req, res) => {
    await dbConnect()
    
    const query  = req.query.query

    const products = await ProductsModel.find({
        $or: [
            { title: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } },
        ]
    })

    if (!products) return res.status(500).json({ message: 'error' })

    return res.status(200).json({ products })
})

const get = (async (req, res) => {
    await dbConnect()

    const products = await ProductsModel.aggregate([{ $limit: 6 }])

    if (!products) return res.status(500).json({ message: 'error' })

    return res.status(200).json({ products })
})

const getProductById = (async (req, res) => {
    const id = req.query?.id

    if (!id) return res.status(500).json({ message: 'error' })

    const product = await ProductsModel.findById({ '_id': id })

    if (!product) return res.status(500).json({ message: 'error' })

    return res.status(200).json({ product })
})

const getProductByUser = (async (req, res) => {
    await dbConnect()
    const email = req.query.email

    const products = await ProductsModel.find({ 'user.email': email })

    if (!products) return res.status(500).json({ message: 'error' })

    return res.status(200).json({ products })
})

export {
    get, getProductById, getProductByUser, post,
    remove, search
};

