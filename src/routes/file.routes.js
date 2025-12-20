const router=require("express").Router();
const multer=require("multer");
const {uploadFile}=require("../controllers/file.controller");
const upload=multer({dest:"uploads/"});
router.post("/upload",upload.single("file"),uploadFile);
module.exports=router;