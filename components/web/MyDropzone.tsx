"use client";

import { Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import { MAX_KYC_FILES, MAX_KYC_FILE_SIZE } from "@/lib/validators/kycSchema";

interface MyDropzoneProps {
  value: File[];
  onChange: (files: File[]) => void;
  disabled?: boolean;
}

function FilePreview({ file }: { file: File }) {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    if (imageRef.current) imageRef.current.src = url;
    return () => URL.revokeObjectURL(url);
  }, [file]);

  // Local object URLs do not need Next.js image optimization.
  // eslint-disable-next-line @next/next/no-img-element
  return <img ref={imageRef} alt={`Preview of ${file.name}`} width={56} height={56} className="h-14 w-14 rounded object-cover" />;
}

export default function MyDropzone({ value, onChange, disabled = false }: MyDropzoneProps) {
  const [error, setError] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    disabled,
    accept: { "image/png": [".png"], "image/jpeg": [".jpg", ".jpeg"], "application/pdf": [".pdf"] },
    multiple: false,
    maxFiles: MAX_KYC_FILES,
    minSize: 1,
    maxSize: MAX_KYC_FILE_SIZE,
    onDrop: (acceptedFiles: File[], rejections: FileRejection[]) => {
      if (disabled) return;
      if (rejections.length) {
        setError("Choose one non-empty PNG, JPEG, or PDF file, no larger than 5 MB.");
        return;
      }
      if (value.length + acceptedFiles.length > MAX_KYC_FILES) {
        setError("Upload only one file. Remove the selected file before adding another.");
        return;
      }
      setError(null);
      onChange([...value, ...acceptedFiles]);
    },
  });

  return (
    <div className="flex flex-col gap-3">
      <div
        {...getRootProps({ "aria-disabled": disabled, "aria-label": "Upload proof of address documents" })}
        className={`rounded-md p-4 text-center h-31 border-dashed border-blue-300 border-2 flex flex-col items-center justify-center ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
      >
        <input {...getInputProps({ id: "file" })} />
        {isDragActive ? (
          <p className="text-base font-semibold text-primary">Drop files here ...</p>
        ) : (
          <div className="gap-4 flex flex-col items-center">
            <Upload className="text-neutra-1000 size-20 lg:size-7.5" />
            <p className="text-base font-semibold text-primary">Click or drag to upload ({value.length}/{MAX_KYC_FILES})</p>
          </div>
        )}
      </div>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      {value.map((file, index) => (
        <div key={`${file.name}-${file.lastModified}-${index}`} className="flex items-center gap-3 rounded-md border bg-gray-50 p-2">
          {file.type === "application/pdf" ? (
            <span className="flex h-14 w-14 items-center justify-center rounded bg-gray-200 text-sm font-semibold">PDF</span>
          ) : (
            <FilePreview file={file} />
          )}
          <div className="min-w-0 flex-1 text-sm">
            <p className="truncate font-medium">{file.name}</p>
            <p className="text-gray-500">File selected</p>
          </div>
          <button
            type="button"
            disabled={disabled}
            aria-label={`Remove ${file.name}`}
            className="rounded p-2 disabled:opacity-50"
            onClick={() => {
              setError(null);
              onChange(value.filter((_, fileIndex) => fileIndex !== index));
            }}
          >
            <X className="size-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
