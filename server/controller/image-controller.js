import File from "../models/file.js";
import dotenv from "dotenv";
dotenv.config();

export const uploadImage = async (request, response) => {

    const RESULT_URL = `${process.env.RESPONSE_URL}`;

    const fileObj = {
        path: request.file.path,
        name: request.file.originalname
    }
    try {
        const file = await File.create(fileObj);
        response.status(200).json({ path: `${RESULT_URL}/file/${file._id}` })
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ error: error.message })
    }
}

export const downloadImage = async (request, response) => {
    try {
        const file = await File.findById(request.params.fileId);

        file.downloadContent++;

        await file.save();

        response.download(file.path, file.name);
    } catch (error) {
        console.error(error.message);
        return response.status(200).json({ error: error.message });
    }
}