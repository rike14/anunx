import path from 'path'
import fs from 'fs'
import formidable from 'formidable-serverless'
import ProductsModel from '../models/products'
import dbConnect from '../utils/dbConnect'


const post = (async (req, res) => {
    await dbConnect()

    const form = new formidable.IncomingForm({
        multiples: true,
        uploadDir: 'public/uploads',
        keepExtensions: true,
    })

    form.parse(req, async (error, fields, data) => {
        if (error) {
            return res.status(500).json({ success: true })
        }

        const { files } = data

        const fileToRename = files instanceof Array ? files : [ files ]

        const filesToSave = []

        fileToRename.forEach(file => {
            const timestamp = Date.now()
            const random = Math.floor(Math.random() * 999999) + 1
            const extension = path.extname(file.name)

            const filename = `${timestamp}-${random}-${extension}`

            const oldPath = path.join(__dirname, '../../../../' + file.path)
            const newPath = path.join(__dirname, '../../../../' + form.uploadDir + '/' + filename)

            filesToSave.push({ 
                name: filename, 
                path: newPath
             })

            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    console.error('Error', err)
                    return res.status(500).json({ message: 'error' })
                }
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
                image,
            },
            files: filesToSave,
        })

        const savedProduct = await product.save()
        
        if(!savedProduct) return res.status(500).json({ message: 'error' })

        return res.status(201).json({ message: 'success' })

    })

   
})

export { post }