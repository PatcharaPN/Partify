import { useState } from "react";

export const useUploadImage = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const uploadImage = async (file: File) => {
    if (!file) return "";
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "partify-upload");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dk094vv12/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );
      if (!res.ok) {
        throw new Error("Upload failed");
      }
      const data = await res.json();
      return data.secure_url as string;
    } catch (error) {
      console.error(error);
      return "";
    } finally {
      setLoading(false);
    }
  };

  return { uploadImage, isLoading };
};
