const express = require("express")
const app = express(); 
const fetchuser = require("../middlewares/fetchuser.js")


const router = express.Router() ; 

const {getnotes , addnotes , deletenote , updatenote } = require("../controllers/note.js")

router.post("/addnotes" , fetchuser , addnotes) ; 
router.get("/getnotes"  , fetchuser ,  getnotes) ; 
router.delete("/deletenote/:id" , fetchuser , deletenote);
router.put("/updatenote/:id" , fetchuser , updatenote);

module.exports = router; 