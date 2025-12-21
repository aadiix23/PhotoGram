const router=require("express").Router();
const multer=require("multer");
const auth =require("../middleware/auth.middleware")
const {uploadFile}=require("../controllers/file.controller");
const upload=multer({dest:"uploads/"});
router.post("/upload",auth,upload.single("file"),uploadFile);
module.exports=router;