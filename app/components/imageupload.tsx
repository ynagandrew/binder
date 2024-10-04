import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardHeader, Image } from "@nextui-org/react";
import Cropper from "react-easy-crop";
import Resizer from 'react-image-file-resizer';

const ImageUpload = ({ onImageChange, initialImage }) => {
    const [imageSrc, setImageSrc] = useState(initialImage || "");
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    // Handle the image upload and set it for preview
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];

        Resizer.imageFileResizer(
            file,
            800, // Max width
            1120, // Max height
            'JPEG', // Format
            80, // Quality (1-100)
            0, // Rotation (degrees)
            (uri) => {
                setImageSrc(uri); // Set resized image for preview
                onImageChange(uri); // Pass resized base64 image up
            },
            'base64' // Output type
        );
    }, [onImageChange]);

    // Enable clicking on the dropzone to open file dialog
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: "image/jpeg, image/png",
        multiple: false,
    });

    return (
        <Card className="col-span-12 sm:col-span-4 w-[300px] h-[420px] relative">
            {/* Dropzone Layer */}
            <div
                {...getRootProps()}
                className="absolute inset-0 z-0 flex justify-center items-center border-dashed border-2 border-gray-300 cursor-pointer"
            >
                <input {...getInputProps()} />
                {!imageSrc && <p>Click or Drag & Drop to Upload</p>}
            </div>

            {/* Card content layer */}
            {imageSrc ? (
                <>
                    <Image
                        removeWrapper
                        alt="Uploaded image"
                        className="z-10 w-full h-full object-cover"
                        src={imageSrc}
                    />
                    <div className="crop-container z-10">
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={5 / 7}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                        />
                    </div>
                </>
            ) : (
                <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">Upload Image</p>
                </CardHeader>
            )}
        </Card>
    );
};

export default ImageUpload;
