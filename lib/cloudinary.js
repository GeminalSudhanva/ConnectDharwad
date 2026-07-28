import { v2 as cloudinary } from 'cloudinary';

let configured = false;
function ensure() {
  if (configured) return true;
  // CLOUDINARY_URL is auto-detected by the SDK. If it's set, we're good.
  if (process.env.CLOUDINARY_URL) {
    configured = true;
    return true;
  }
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) return false;
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  });
  configured = true;
  return true;
}

export async function uploadImage(dataUrl, folder = 'connect-dharwad') {
  if (!ensure()) {
    return { url: dataUrl, fallback: true };
  }
  try {
    const res = await cloudinary.uploader.upload(dataUrl, { folder, resource_type: 'image' });
    return { url: res.secure_url, publicId: res.public_id };
  } catch (e) {
    console.error('[cloudinary] upload failed:', e.message);
    return { url: dataUrl, fallback: true, error: e.message };
  }
}
