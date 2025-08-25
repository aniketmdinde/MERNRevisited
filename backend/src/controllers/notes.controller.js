import { Note } from "../models/Note.model.js";

export const getAllNotes = async (_, res) => {
    try {
        const notes = await Note.find({}).sort({createdAt: -1});
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error :: getAllNotes :: ", error);
        
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const getNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.find({_id: id});
        res.status(200).json(note);
    } catch (error) {
        console.error("Error :: getNote :: ", error);
        
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        const newNote = new Note({title, content});
        const savedNote = await newNote.save();

        res.status(201).json({note: savedNote, message: "Note created successfully"});
    } catch (error) {
        console.error("Error :: createNote :: ", error);
        
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const updatedNote = await Note.findByIdAndUpdate({_id: id}, {title, content}, {new: true});

        if(!updatedNote) {
            return res.status(404).json({message: "Note not found"});
        }

        res.status(200).json({note: updatedNote, message: "Note updated successfully"});
    } catch (error) {
        console.error("Error :: updateNote :: ", error);
        
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNote = await Note.findByIdAndDelete({_id: id});

        if(!deletedNote) {
            return res.status(404).json({message: "Note not found"});
        }

        res.status(200).json({note: deletedNote, message: "Note deleted successfully"});
    } catch (error) {
        console.error("Error :: deleteNote :: ", error);
        
        res.status(500).json({message: "Internal Server Error"})
    }
}