const mongoose = require("mongoose");
const Note = require("../models/note.js")
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const addnotes = async (req, res) => {
    const { title, tag, description } = req.body;
    const userid = req.user.id;   // ye wale user ke notes chahiye bas 

    // console.log(userid) ; 
    const data = await Note.create({
        title, tag, description, userid
    })
    res.json({ "success": true, data });
}

const getnotes = async (req, res) => {
    // mujhe user ki id pata hai // ab mujhe wo saare notes uthaane hai jisme userid field is equal to 
    //token ki user id hai 
    // const presentid = req.user.id ;
    // console.log(presentid);
    // const arr = Note.filter((x) => {
    //     return ((x.userid) == presentid)
    // })

    const arr = await Note.find({ userid: req.user.id });
    // console.log(arr);
    res.json(arr);
}

const deletenote = async (req, res) => {


    try {

        const idtodelete = req.params.id;  //note ki id hai 

        let note = await Note.findById(idtodelete);

        //what if wrong URL has been sent 
        if (!note) {
            return res.status(404).json({ "error": "Not Found" });
        }

        //ab ye note ka user hamara loggedIn member hi hai ki nhi // ye kaise pata lagayenge 
        if (req.user.id.toString() != note.userid.toString()) {
            return res.status(401).json({ "error": "unauthorized Access !" })
        }

        const notedeleted = await Note.findByIdAndDelete(idtodelete);
        return res.status(200).json({ "success": true, notedeleted });


    } catch (error) {
        return res.json({ "error": "some error occurred in this deletenote controller " });
    }



}

const updatenote = async (req, res) => {


    try {

        const idtoupdate = req.params.id;

        let note = await Note.findById(idtoupdate);
        if (!note) { return res.status(404).json({ "error": "Not Found" }) };

        //ab ye note ka user hamara loggedIn member hi hai ki nhi // ye kaise pata lagayenge 
        if (req.user.id != note.userid.toString()) {
            return res.status(401).json({ "error": "unauthorized Access !" })
        }

        //ab sab kuch theek hai to update kardo note ko 
        //ab update note me sirf idtoupdate bhejege params me but body me to title , tag , desc bhi ayega 

        const { title, tag, description } = req.body;

        const updatenote = {};
        if (title) { updatenote.title = title };
        if (description) { updatenote.description = description; }
        if (tag) { updatenote.tag = tag; }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: updatenote }, { new: true })
        res.status(200).json({ "success": true, note });

        //         How to use $set in mongoose?
        // The $set operator replaces the value of a field with the specified value. The $set operator expression has the following form: { $set: { <field1>: <value1>, ... } } To specify a <field> in an embedded document or in an array, use dot notation.

    } catch (error) {
        return res.json({ "error": "some error occurred in this deletenote controller " });
    }

}
module.exports = { addnotes, getnotes, deletenote, updatenote }; 