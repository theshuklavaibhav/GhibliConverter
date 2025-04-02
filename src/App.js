import React, { useState } from "react";

export default function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [outputImage, setOutputImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.REACT_APP_REPLICATE_API_KEY;


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  

  const handleConvert = async () => {
    if (!image) {
      alert("Please upload an image first!");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
          "Authorization": Token ${apiKey},
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          version: "stability-ai/sdxl", // Replace with the correct Ghibli-style model version
          input: { "image": preview },
        }),
      });

      const data = await response.json();
      if (data.output) {
        setOutputImage(data.output);
      } else {
        alert("Error processing image");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Ghibli Art Converter</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />
      {preview && <img src={preview} alt="Preview" className="w-60 h-60 object-cover rounded-lg" />}
      <button 
        onClick={handleConvert} 
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
        disabled={loading}
      >
        {loading ? "Converting..." : "Convert to Ghibli Art"}
      </button>
      {outputImage && <img src={outputImage} alt="Output" className="mt-4 w-60 h-60 object-cover rounded-lg" />}
    </div>
  );
}
