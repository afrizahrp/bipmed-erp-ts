import { v2 as cloudinary } from 'cloudinary';
// const cloudinary = require('cloudinary').v2;

// Declare the 'body' and 'res' variables
const body: any = {}; // Replace 'any' with the appropriate type for 'body'
const res: any = {}; // Replace 'any' with the appropriate type for 'res'

const signature = cloudinary.utils.api_sign_request(
  body.paramsToSign,
  process.env.CLOUDINARY_API_SECRET as string
);

res.status(200).json({
  signature,
});
