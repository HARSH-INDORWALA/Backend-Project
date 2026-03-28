import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';


// Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

const uploadToCloudinary =async (filePath)=>{
    try{
        if(!filePath) return null;
        const response = await  cloudinary.uploader.upload(filePath,{
            resource_type : "auto"
        })
        fs.unlinkSync(filePath);
        
        // console.log("Cloudinary response:", response);
        return response;
    }
    catch(err)
    {
        fs.unlinkSync(filePath);
        // console.log("Error uploading to Cloudinary:", err);
        throw err;
    }
}
export { uploadToCloudinary };