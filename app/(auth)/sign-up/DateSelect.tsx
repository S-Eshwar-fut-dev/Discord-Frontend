"use client";

import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDown, Check } from "lucide-react";

type Option = { value: string; label: string };

function PillSelect({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  placeholder?: string;
}) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative w-full">
        {/* Selected Button */}
        <Listbox.Button className="w-full flex items-center justify-between rounded-2xl bg-[#2b2d31] ring-1 ring-[#3a3b3f] hover:ring-[#4b4d52] px-4 py-3 text-left text-sm cursor-pointer text-gray-200">
          <span
            className={`truncate ${value ? "text-white" : "text-gray-400"}`}
          >
            {value
              ? options.find((o) => o.value === value)?.label
              : placeholder}
          </span>
          <ChevronDown size={18} className="text-gray-300" />
        </Listbox.Button>

        {/* Dropdown List */}
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-50 mt-2 max-h-56 w-full overflow-auto rounded-md bg-[#323335] ring-1 ring-black/40 p-1 scrollbar-thin scrollbar-thumb-[#2f3136] scrollbar-track-transparent">
            {options.map((opt) => (
              <Listbox.Option key={opt.value} value={opt.value} as={Fragment}>
                {({ active, selected }) => (
                  <li
                    className={`flex items-center justify-between cursor-pointer px-3 py-3 text-sm rounded-md ${
                      active ? "bg-[#3b3d42] text-white" : "text-gray-200"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {selected ? (
                      <Check size={16} className="text-indigo-400" />
                    ) : null}
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

export default function DateSelect({
  day,
  month,
  year,
  onChange,
}: {
  day: string;
  month: string;
  year: string;
  onChange: (d: { day: string; month: string; year: string }) => void;
}) {
  // Months
  const months: Option[] = [
    { value: "", label: "Month" },
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  // Years (100 years backward)
  const currentYear = new Date().getFullYear();
  const years: Option[] = [
    { value: "", label: "Year" },
    ...Array.from({ length: 100 }, (_, i) => {
      const y = currentYear - i;
      return { value: String(y), label: String(y) };
    }),
  ];

  // Days adjust based on month/year (handles February, leap years)
  const selectedMonth = parseInt(month || "0", 10);
  const selectedYear = parseInt(year || "0", 10);

  const daysInMonth = (m: number, y: number) => {
    if (!m || !y) return 31;
    return new Date(y, m, 0).getDate();
  };

  const maxDay = daysInMonth(selectedMonth, selectedYear || currentYear);

  const dayOptions: Option[] = [
    { value: "", label: "Day" },
    ...Array.from({ length: maxDay }, (_, i) => ({
      value: String(i + 1),
      label: String(i + 1),
    })),
  ];

  return (
    <div className="flex gap-3">
      <div className="w-1/3">
        <PillSelect
          value={month}
          onChange={(v) => onChange({ day, month: v, year })}
          options={months}
          placeholder="Month"
        />
      </div>

      <div className="w-1/3">
        <PillSelect
          value={day}
          onChange={(v) => onChange({ day: v, month, year })}
          options={dayOptions}
          placeholder="Day"
        />
      </div>

      <div className="w-1/3">
        <PillSelect
          value={year}
          onChange={(v) => onChange({ day, month, year: v })}
          options={years}
          placeholder="Year"
        />
      </div>
    </div>
  );
}
