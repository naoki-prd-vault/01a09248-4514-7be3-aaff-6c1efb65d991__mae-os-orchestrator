import React from 'react';

interface TableProps {
  headers: string[];
  data: (React.ReactNode)[][];
}

export const Table: React.FC<TableProps> = ({ headers, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600 bg-gray-50">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="py-2 px-4 border-b text-sm text-gray-800">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
