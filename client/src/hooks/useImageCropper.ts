import { useCallback, useRef, useState } from "react";
import { Crop, PixelCrop } from "react-image-crop";

export default function useImageCropper(
  croppedUrl: string,
  setCroppedUrl: React.Dispatch<React.SetStateAction<string>>
) {
  const [imageFile, setImageFile] = useState<any | Blob>(null);
  const [completedCrop, setCompletedCrop] =
    useState<PixelCrop | null>(null);
  // const [croppedUrl, setCroppedUrl] = useState<string>("");
  const [isCropped, setIsCropped] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 50,
    height: 50,
    x: 5,
    y: 5,
  });
  ///

  const getCroppedImage = useCallback(() => {
    if (!completedCrop || !imgRef.current) return;

    const canvas = document.createElement("canvas");
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY =
      imgRef.current.naturalHeight / imgRef.current.height;

    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(
      imgRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    canvas.toBlob((blob) => {
      if (!blob) return;
      console.log(blob);
      const previewUrl = URL.createObjectURL(blob);
      setImageFile(blob);
      setCroppedUrl(previewUrl);
      setIsCropped(true); // Hide cropper and show result
    }, "image/jpeg");
  }, [completedCrop]);
  return {
    crop,
    setCrop,
    completedCrop,
    setCompletedCrop,
    croppedUrl,
    setCroppedUrl,
    isCropped,
    setIsCropped,
    imgRef,
    imageFile,
    setImageFile,

    getCroppedImage,
  };
}
