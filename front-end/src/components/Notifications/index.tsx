"use client"
import React, { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useCsvData } from '@/context/CsvContext'
import { LogEntry } from '@/context/types'

export default function Notifications() {
  const { uploadLogs } = useCsvData()

  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
        <span>Notifications</span>
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 sm:px-0">
          <div className="w-screen max-w-sm flex-auto rounded-3xl bg-white p-4 text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            {uploadLogs.length === 0 ? (
              <div className="p-4 text-gray-500">No notifications</div>
            ) : (
              uploadLogs.map((log: LogEntry, index: number) => (
                <div key={index} className="relative rounded-lg p-4 hover:bg-gray-50">
                  <span className="font-semibold text-gray-900">{log.message}</span>
                  <p className="mt-1 text-gray-600">{log.date}</p>
                </div>
              ))
            )}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
