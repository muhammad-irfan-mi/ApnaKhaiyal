import React, { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileText, Image, Film } from 'lucide-react';
import { Context } from '../../../Context/ContextProvider';

export const FileUploader = ({
  onFilesSelected,
  acceptedFileTypes,
  multiple = false,
  value,
  placeholder = 'Drag & drop files or click to browse'
}) => {

  const { theme } = useContext(Context)

  const files = Array.isArray(value) ? value : (value ? [value] : []);

  const onDrop = useCallback((acceptedFiles) => {
    if (multiple) {
      onFilesSelected([...files, ...acceptedFiles]);
    } else {
      onFilesSelected(acceptedFiles.slice(0, 1));
    }
  }, [files, multiple, onFilesSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    multiple
  });

  const removeFile = (indexToRemove) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    onFilesSelected(updatedFiles);
  };

  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) {
      return <Image className="h-5 w-5 text-blue-800" />;
    } else if (file.type.startsWith('video/')) {
      return <Film className="h-5 w-5 text-blue-800" />;
    } else {
      return <FileText className="h-5 w-5 text-blue-800" />;
    }
  };

  return (
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload className="h-8 w-8 text-blue-800" />
          <p className="text-gray-600">{placeholder}</p>
          <p className="text-xs text-gray-500">
            {multiple ? 'You can upload multiple files' : 'You can upload only one file'}
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 rounded-md p-3 border border-gray-200"
            >
              <div className="flex items-center space-x-3">
                {getFileIcon(file)}
                <div className="overflow-hidden">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-gray-500 hover:text-red-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};