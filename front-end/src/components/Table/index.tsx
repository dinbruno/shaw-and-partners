import { FolderPlusIcon } from "@heroicons/react/24/outline";
import { TableComponentProps } from "./types";
import { useCsvData } from "@/context/CsvContext";
import TableSkeleton from "@/components/Skeleton";
import Image from "next/image";
import notFound from "@/assets/gifs/not-found.gif";

const TableComponent: React.FC<TableComponentProps> = ({
  openModal,
}) => {
  const { loading, csvData } = useCsvData();

  return (
    <>
      {csvData.length ? (
        <>
          {!loading ? (
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-base font-semibold leading-6 text-gray-900">
                    Users
                  </h1>
                  <p className="mt-2 text-sm text-gray-700">
                    A list of all users entered via the csv document with data
                    such as their name, city, country and favorite sport
                  </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 flex gap-4 justify-end md:justify-normal">
                  <button
                    type="button"
                    onClick={openModal}
                    className="flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    ADD CSV
                    <FolderPlusIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
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
            </div>
          ) : (
            <TableSkeleton />
          )}
        </>
      ) : (
        <>
          <div className="flex justify-center items-center">
            <div>
              <h1 className="mt-6 text-lg leading-8 text-gray-900">
                Sorry, we couldn&#39;t find the result you were looking for...
              </h1>
              <Image src={notFound} alt="Not found" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TableComponent;
