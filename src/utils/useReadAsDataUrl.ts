import { useEffect, useState } from 'react';

export const useReadAsDataUrl = () => {
  const [dataUrl, setDataUrl] = useState<string | ArrayBuffer | null>(null);
  const [file, setFile] = useState<File | Blob | null>(null);

  useEffect(() => {
    if (!file) {
      setDataUrl('');
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (ev) => setDataUrl(ev.target?.result ?? null);
  }, [file]);

  return { dataUrl, setFile };
};
