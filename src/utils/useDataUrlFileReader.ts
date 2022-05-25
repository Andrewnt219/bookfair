import { useEffect, useState } from "react";

export const useDataUrlFileReader = () => {
  const [result, setResult] = useState<string | ArrayBuffer | null>(null);
  const [file, setFile] = useState<File | Blob | null>(null);

  useEffect(() => {
    if (!file) {
      setResult("");
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (ev) => setResult(ev.target?.result ?? null);
  }, [file]);

  return { result, setFile };
};
