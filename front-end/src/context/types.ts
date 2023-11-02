import { User } from "@/components/Table/types";
import { ReactNode } from "react";

export interface CsvDataContextProps {
  csvData: User[];
  uploadCsv: (file: File) => Promise<void>;
  searchCsvData: (query: string) => void;
  setSearchTerm?: (term: string) => void;
  loading?: boolean; 
  error?: string | null;
  clearSearch?: () => void;
  uploadLogs: LogEntry[];
}

export interface CsvDataProviderProps {
  children: ReactNode;
}

export interface LogEntry {
  id: string;
  message: string;
  date: string; 
}