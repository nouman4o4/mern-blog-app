import React, { useState, useRef, useCallback } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ImageCropper = () => {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 50,
    aspect: 1,
  });
  const [completedCrop, setCompletedCrop] =
    useState<PixelCrop | null>(null);
  const [croppedUrl, setCroppedUrl] = useState<string>("");
  const [isCropped, setIsCropped] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImageSrc(reader.result);
        setIsCropped(false); // Reset if cropping again
        setCroppedUrl("");
      }
    };
    reader.readAsDataURL(file);
  };

  const onImageLoaded = (img: HTMLImageElement) => {
    imgRef.current = img;
  };

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
      const previewUrl = URL.createObjectURL(blob);
      setCroppedUrl(previewUrl);
      setIsCropped(true); // Hide cropper and show result
    }, "image/jpeg");
  }, [completedCrop]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-md shadow mt-10">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Crop Your Profile Image
      </h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4 block w-full text-sm text-gray-600 file:border-0 file:bg-gray-100 file:rounded file:px-3 file:py-2 file:text-sm"
      />

      {!isCropped && imageSrc && (
        <div>
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={1}
            keepSelection>
            <img
              src={imageSrc}
              ref={imgRef}
              onLoad={(e) => onImageLoaded(e.currentTarget)}
              alt="To Crop"
              className="max-w-full max-h-[400px]"
            />
          </ReactCrop>

          <button
            onClick={getCroppedImage}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
            Crop Image
          </button>
        </div>
      )}

      {isCropped && croppedUrl && (
        <div className="mt-6 text-center">
          <p className="text-gray-700 text-sm mb-2">
            Cropped Result:
          </p>
          <img
            src={croppedUrl}
            alt="Cropped"
            className="w-32 h-32 rounded-full object-cover border mx-auto"
          />
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
