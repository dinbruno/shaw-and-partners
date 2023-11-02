"use client";

import { FolderPlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { TableComponentProps } from "./types";
import { useCsvData } from "@/context/CsvContext";
import TableSkeleton from "@/components/Skeleton";
import Image from "next/image";
import notFound from "@/assets/gifs/not-found.gif";
import { useState } from "react";

const TableComponent: React.FC<TableComponentProps> = ({ openModal }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { loading, csvData, deleteAllFiles } = useCsvData();

  const handleDeleteAll = async () => {
    setShowConfirmModal(false);
    await deleteAllFiles();
  };

  return (
    <>
      {!loading ? (
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto"></div>
            <div className="mt-4 sm:ml-16 sm:mt-0 flex gap-4 justify-end md:justify-normal">
              <button
                type="button"
                onClick={openModal}
                className="flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                ADD CSV
                <FolderPlusIcon className="h-6 w-6" />
              </button>
              <button
                type="button"
                disabled={!csvData.length}
                onClick={() => setShowConfirmModal(true)}
                className={`flex items-center hover:opacity-50 gap-2 rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                  csvData.length
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-gray-500 opacity-50 cursor-not-allowed"
                }`}
              >
                Delete All
                <TrashIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
          {csvData.length ? (
            <>
              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              City
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Country
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Favorite Sport
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {csvData?.map((person, key) => (
                            <tr key={key}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                {person.name}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {person.city}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {person.country}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {person.favorite_sport}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {showConfirmModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white p-4 rounded-lg shadow-lg">
                    <h2 className="font-bold text-lg">Confirm Delete</h2>
                    <p className="my-4">
                      Are you sure you want to delete all items?
                    </p>
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={() => setShowConfirmModal(false)}
                        className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                      >
                        No
                      </button>
                      <button
                        onClick={handleDeleteAll}
                        className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700"
                      >
                        Yes, Delete All
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex justify-center items-center">
                <div>
                  <h1 className="mt-6 text-lg leading-8 text-gray-900">
                    Sorry, we couldn&#39;t find the result you were looking
                    for...
                  </h1>
                  <Image src={notFound} alt="Not found" />
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <TableSkeleton />
      )}
    </>
  );
};

export default TableComponent;
