import React, { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import toast from 'react-hot-toast';

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Lütfen bir dosya seçin!');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadStatus('Yükleme başarılı!');
        toast.success(uploadStatus)
      } else {
        toast.error(uploadStatus)
        setUploadStatus('Yükleme başarısız.');
      }
    } catch (error) {
      console.error('Yükleme hatası:', error);
      setUploadStatus('Bir hata oluştu.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-green-400">
      <div className="border-2 border-dashed border-green-400 rounded-lg p-8 flex flex-col items-center">
        <AiOutlineCloudUpload size={48} className="text-green-400 mb-4" />
        <label htmlFor="file-upload" className="cursor-pointer">
          <span className="text-lg font-medium">Dosya yüklemek için tıklayın</span>
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        {selectedFile && (
          <p className="mt-4 text-sm">
            Seçilen dosya: <span className="font-bold">{selectedFile.name}</span>
          </p>
        )}
      </div>
      <button
        onClick={handleUpload}
        className="mt-6 px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
      >
        Yükle
      </button>
    </div>
  );
};

export default ImageUploader;