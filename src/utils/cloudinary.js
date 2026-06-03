import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';


// Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
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
        return null;
    }
}

const extractPublicId = (url)=>{
    const path = url.split('/')
    
    const PublicIdWithExtension = path[path.length-1]

    const publicId = PublicIdWithExtension.split('.')[0]
    return publicId; 
}

const deleteFromCloudinary = async (publicUrl) =>{
    try {
        const publicId = extractPublicId(publicUrl)

        if(!publicId) return null;

        const response = await cloudinary.uploader.destroy(publicId,{
            resource_type : "image",
            invalidate : true
        })

        return response;
    } catch (error) {
        console.error("Error deleting from Cloudinary:", error);
        throw error
    }
}

export { uploadToCloudinary, deleteFromCloudinary };