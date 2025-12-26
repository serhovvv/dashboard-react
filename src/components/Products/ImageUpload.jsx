import { Upload, X } from "lucide-react";
import puer from "./../../assets/img/tea/puer2.jpg";
import { useState } from "react";

export default function ImageUpload({ imgSrc, setImgSrc }) {
  const handleDragOver = (e) => {
    e.preventDefault();
    console.log("handle grag over");
  };
  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };
  const handleImgInput = (e) => {
    handleFiles(e.target.files);
  };
  const handleFiles = (files) => {
    if (!files) return;
    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImgSrc(reader.result);
    };
  };
  const uploadContent = (
    <label
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      htmlFor="img-upload"
      className="border-4 border-dashed gap-3 hover:border-green-600 border-zinc-400 w-[300px] aspect-[16/10] flex rounded-xl flex-col justify-center items-center "
    >
      <Upload className="w-[40px] text-zinc-400  h-[40px]" />
      <span>Upload Image or Drop Here</span>
      <input
        onChange={handleImgInput}
        className="hidden"
        type="file"
        name="image-upload"
        id="img-upload"
      />
    </label>
  );
  const previewContent = (
    <div className="relative w-[300px] aspect-[16/10] overflow-hidden object-cover rounded-xl">
      <img className="block w-full h-full" src={imgSrc} alt="" />
      <div className="bg-red w-full h-full absolute top-0 left-0 text-right p-4">
        <button onClick={() => setImgSrc(null)} className="cursor-pointer">
          <X width={24} height={24} />
        </button>
      </div>
    </div>
  );
  return imgSrc ? previewContent : uploadContent;
}
