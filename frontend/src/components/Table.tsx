import React, { useEffect, useState } from "react"
import axios from "axios"

interface Data{
    avgSalary: number,
    total_jobs:number,
    work_year:number,
}
interface TableProps {
  onRowClick: (year: number) => void;
}

type Datakeys = keyof Data;
const Table : React.FC<TableProps> = ({onRowClick}) => {
    const [sortConfig, setSortConfig] = useState<{ key: Datakeys; direction: string } | null>(null);
    const [data,setData] = useState<Data[]>([])
    useEffect(()=>{
        axios.get("https://apxmonstr.pythonanywhere.com/maintable").then(
            (res)=>{
                setData(res.data)
                console.log(res.data)
            }
        )
    }, [])
    const sortedData = React.useMemo(() => {
      if (sortConfig !== null) {
        return [...data].sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      return data;
    }, [data, sortConfig]);
    const requestSort = (key: Datakeys) => {
      let direction = 'ascending';
      if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending';
      }
      setSortConfig({ key, direction });
    };
  return (
    <div className="text p-8 rounded bg-white">
        <div className="text-3xl font-bold pb-6 flex justify-between items-center">
            ML Employee Table 💻 

            <button onClick={()=>onRowClick(0)} className="p-2 text-sm font-normal bg-gray-200 rounded">
              Reset Graph
            </button>
        </div>
      <table className="min-w-fit bg-white ">
        <thead className="">
          <tr>
            <th
              className="bg-green-500 rounded-tl py-4 px-8 cursor-pointer text-gray-700 font-semibold "
              onClick={() => requestSort('work_year')}
            >
              Year
            </th>
            <th
              className="bg-green-500 py-4 px-8 cursor-pointer text-gray-700 font-semibold "
              onClick={() => requestSort('total_jobs')}
            >
              Total Jobs
            </th>
            <th
              className="bg-green-500 rounded-tr py-4 px-8 cursor-pointer text-gray-700 font-semibold "
              onClick={() => requestSort('avgSalary')}
            >
              Avg Salary (USD)
            </th>
          </tr>
        </thead>
        <tbody>
            {
              sortedData.map((item ,idx)=>(
                  <tr key = {idx} onClick={() => onRowClick(item.work_year)} className="cursor-pointer hover:bg-gray-100">
                      <td className="border px-8 py-4">{item.work_year}</td>
                      <td className="border px-8 py-4 text-center">{item.total_jobs}</td>
                      <td className="border px-8 py-4 text-right">$ {new Intl.NumberFormat().format(parseInt( item.avgSalary.toFixed()))}</td>
                  </tr>
              ))
            }
        </tbody>
      </table>
    </div>
  )
}
export default Table;