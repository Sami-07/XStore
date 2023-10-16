import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
export async function POST(req, res) {
    try {
        const session = await getServerSession();
        if(session){
            const formData = await req.formData();
            let body = Object.fromEntries(formData);
    
            const file = body.file;
    
            const newFormData = new FormData();
            newFormData.append('file', file);
            newFormData.append('upload_preset', process.env.PRESET_NAME);
            let res = await fetch("https://api.cloudinary.com/v1_1/dhykxlpwg/image/upload", {
                method: "POST",
                body: newFormData
            })
            let response = await res.json();
    
            return new NextResponse(JSON.stringify({ fileName: response.original_filename, pages: response.pages, downloadUrl: response.secure_url })); 
        }
        else{
            return new NextResponse(JSON.stringify({ err: "error" })); 
        }
      
    }
    catch (err) {
        return new NextResponse(JSON.stringify({ err: err.message }));
    }
}