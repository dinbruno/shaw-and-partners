"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import useSWR from "swr";
import { CsvDataContextProps, CsvDataProviderProps, LogEntry } from "./types";
import { toast } from "react-toastify";
import { API_URL } from "@/api/config";

const CsvDataContext = createContext<CsvDataContextProps | undefined>(
  undefined
);

const LOG_KEY = 'uploadLogs';

const generateLogId = () => `log_${new Date().getTime()}`;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const CsvDataProvider: React.FC<CsvDataProviderProps> = ({
  children,
}) => {
  const [csvData, setCsvData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadLogs, setUploadLogs] = useState<LogEntry[]>(() => {
    const logs = localStorage.getItem(LOG_KEY);
    return logs ? JSON.parse(logs) as LogEntry[] : [];
  });

  const { data } = useSWR(`${API_URL}/users`, fetcher);

  const addLogEntry = (logEntry: LogEntry) => {
    const updatedLog = [logEntry, ...uploadLogs];
    localStorage.setItem(LOG_KEY, JSON.stringify(updatedLog));
    setUploadLogs(updatedLog);
  };

  const uploadCsv = async (file: File) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_URL}/files`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        const logEntry = {
          id: generateLogId(),
          message: "Upload de um arquivo feito em",
          date: new Date().toLocaleString(),
        };

        addLogEntry(logEntry);
        toast.success("Document successfully sent!");
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      console.error("Error uploading CSV:", err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const searchCsvData = useCallback(async (query: string) => {
    setLoading(true);
    try {
      const searchData = await fetcher(`${API_URL}/users?q=${query}`);
      setCsvData(searchData.data);
    } catch (error) {
      console.error("Error fetching CSV data:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, []);

  const clearSearch = useCallback(() => {
    if (data?.data) {
      setCsvData(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (data?.data) {
      setCsvData(data.data);
    }
  }, [data]);
  

  return (
    <CsvDataContext.Provider
      value={{ csvData, uploadCsv, searchCsvData, loading, clearSearch, uploadLogs  }}
    >
      {children}
    </CsvDataContext.Provider>
  );
};

export const useCsvData = () => {
  const context = useContext(CsvDataContext);
  if (!context) {
    throw new Error("useCsvData must be used within a CsvDataProvider");
  }
  return context;
};

export default CsvDataProvider;
