import { User } from "@/components/Table/types";
import { ReactNode } from "react";


export interface CsvDataContextProps {
  csvData: User[];
  uploadCsv: (file: File) => Promise<void>;
  searchCsvData: (query: string) => void;
  setSearchTerm?: (term: string) => void;
  loading?: boolean; 
  error?: string | null; 
}

export interface CsvDataProviderProps {
  children: ReactNode;
}