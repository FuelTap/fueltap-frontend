import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const MyDropzone = ({ onChange }) => {
  const [previewFile, setPreviewFile] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      onChange(acceptedFiles); // Send files to react-hook-form

      const file = acceptedFiles[0];
      if (!file) return;

      // For preview
      if (file.type.startsWith('image/')) {
        setPreviewFile({
          type: 'image',
          url: URL.createObjectURL(file),
          name: file.name,
        });
      } else if (file.type === 'application/pdf') {
        setPreviewFile({
          type: 'pdf',
          name: file.name,
        });
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf'],
    },
    multiple: false,
  });

  return (
    <div className="flex flex-col gap-3">
      <div
        {...getRootProps()}
        className="cursor-pointer rounded-md border p-4 text-center transition hover:border-green-600"
      >
        <input {...getInputProps()} />

        {isDragActive ? (
          <p>Drop the file here ...</p>
        ) : (
          <>
            <p>Drag & Drop or click to select a file</p>
            <p className="text-sm text-gray-500">PNG, JPEG, PDF</p>
          </>
        )}
      </div>

      {/* Preview Section */}
      {previewFile && (
        <div className="flex items-center gap-3 rounded-md border bg-gray-50 p-2">
          {previewFile.type === 'image' ? (
            <img
              src={previewFile.url}
              alt="preview"
              className="h-14 w-14 rounded object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded bg-red-200 font-bold text-red-700">
              PDF
            </div>
          )}

          <div className="text-sm">
            <p className="font-medium">{previewFile.name}</p>
            <p className="text-gray-500">File selected</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDropzone;
