const {getClient}=require("../config/telegram");
const {Api}=require("telegram");
exports.uploadFile=async(req,res)=>{
    const client =getClient();
    const file=req.file;
    const result = await client.sendFile(
        "me",
        {
            file:file.path,
            caption:file.originalname,
        }
    );
    res.json({
        success:true,
        telegramMessageId:result.id,
        fileName:file.originalname,
    });
};