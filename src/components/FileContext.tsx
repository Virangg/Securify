import React, { createContext, useContext, useState, ReactNode } from 'react';

export type FileItem = {
  name: string;
  date: string;
  icon: string;
  color: string;
  categoryId: string;
  uri?: string;
  size?: number;
  type?: string;
  modified?: string;
};

type FileContextType = {
  files: FileItem[];
  addFile: (file: FileItem) => void;
};

const FileContext = createContext<FileContextType | undefined>(undefined);

export const useFileContext = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error('useFileContext must be used within a FileProvider');
  }
  return context;
};

export const FileProvider = ({ children }: { children: ReactNode }) => {
  const [files, setFiles] = useState<FileItem[]>([]);

  const addFile = (file: FileItem) => {
    setFiles(prev => [file, ...prev]);
  };

  return (
    <FileContext.Provider value={{ files, addFile }}>
      {children}
    </FileContext.Provider>
  );
}; 