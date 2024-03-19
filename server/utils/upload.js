
import multer from 'multer';    //middleware for uploading purpose  authent,autho,err hand,

import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();   //file se nikalkr object ko dega variables

const username= process.env.DB_USERNAME;
const password=process.env.DB_PASSWORD;

const storage= new GridFsStorage({
    url : `mongodb://${username}:${password}@ac-qgref93-shard-00-00.tawygcg.mongodb.net:27017,ac-qgref93-shard-00-01.tawygcg.mongodb.net:27017,ac-qgref93-shard-00-02.tawygcg.mongodb.net:27017/?ssl=true&replicaSet=atlas-ixy7us-shard-0&authSource=admin&retryWrites=true&w=majority`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.memeType) === -1) 
            return`${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});

export default multer({storage});