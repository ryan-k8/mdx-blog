import { UploadApiResponse, v2 as cloudinary_ } from "cloudinary";

cloudinary_.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface ICloudinaryService {
  uploadImage(arg0: File): Promise<UploadApiResponse>;
  removeImage(arg0: Array<string>): Promise<{ err: null | string }>;
}

class CloudinaryService implements ICloudinaryService {
  async uploadImage(file: File): Promise<UploadApiResponse> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
      cloudinary_.uploader
        .upload_stream(
          {
            tags: ["nextjs-server-actions-upload"],
            folder: "portfolio@github",
          },
          function (error, result) {
            if (error) {
              reject(error);
              return;
            }
            resolve(result!);
          },
        )
        .end(buffer);
    });
  }
  async removeImage(id: Array<string>): Promise<{ err: null | string }> {
    return new Promise((resolve, _) => {
      cloudinary_.api.delete_resources(id, function (error) {
        if (error) {
          resolve({ err: error });
        }
        resolve({ err: null });
      });
    });
  }
}

const cloudinary = new CloudinaryService();

export { cloudinary };
