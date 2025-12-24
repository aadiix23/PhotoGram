const { getClient } = require("../config/telegram");
const File = require("../models/File")
const { Api } = require("telegram");
const fs = require("fs");

exports.uploadFile = async (req, res) => {
    const client = getClient();
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const file = req.file;
    const result = await client.sendFile(
        "me",
        {
            file: file.path,
            caption: file.originalname,
        }
    );
    const savedFile = await File.create({
        userPhone: req.user.phone,
        telegramMessageId: result.id,
        fileName: req.file.originalname,
        mimeType: req.file.mimetype,
    });
    fs.unlinkSync(req.file.path);
    res.json({
        success: true,
        telegramMessageId: result.id,
        fileName: file.originalname,
    });
};
exports.getFiles=async (req,res)=>{
    try {
        const userPhone=req.user.phone;
        const files=await File.find({userPhone}).sort({createdAt:-1});
        const response=files.map(file=>({
            id:file._id,
            fileName:file.fileName,
            mimeType:file.mimeType,
            uploadedAt:file.createdAt,
            viewUrl:`/files/view/${file._id}`
        }));
        res.json({
            success:true,
            files:response
        })
    } catch (error) {
        console.error(err);
        res.status(500).json({error:err.message});
        
    }
};