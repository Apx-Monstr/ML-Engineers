import React, { useEffect, useState } from "react"
import axios from "axios"

interface Data{
    avgSalary: number,
    total_jobs:number,
    work_year:number,
}

const Table = () => {
    const [data,setData] = useState<Data[]>([])
    useEffect(()=>{
        axios.get("http://localhost:5000/maintable").then(
            (res)=>{
                setData(res.data)
                // console.log(res.data)
            }
        )
    }, [])

  return (
    <div className="text-xl p-8 rounded bg-white">
        <div className="text-4xl font-bold pb-6">
            ML Employee Table 💻
        </div>
      <table className="min-w-fit bg-white ">
        <thead className="">
          <tr>
            <th
              className="bg-green-500 rounded-tl py-4 px-8 cursor-pointer text-gray-700 font-semibold "
            //   onClick={() => requestSort('id')}
            >
              Year
            </th>
            <th
              className="bg-green-500 py-4 px-8 cursor-pointer text-gray-700 font-semibold "
            //   onClick={() => requestSort('name')}
            >
              Total Jobs
            </th>
            <th
              className="bg-green-500 rounded-tr py-4 px-8 cursor-pointer text-gray-700 font-semibold "
            //   onClick={() => requestSort('age')}
            >
              Average Salary (USD)
            </th>
          </tr>
        </thead>
        <tbody>
          {/* {sortedData.map((item) => ( */}
            {/* <tr key={item.id}>
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.age}</td>
            </tr> */}
            {
                data.map((item ,idx)=>(
                    <tr key = {idx}>
                        {/* <td className="border px-4 py-2">{new Intl.NumberFormat().format(123456789)}</td> */}
                        <td className="border px-8 py-4">{item.work_year}</td>
                        <td className="border px-8 py-4 text-center">{item.total_jobs}</td>
                        <td className="border px-8 py-4 text-right">{new Intl.NumberFormat().format(item.avgSalary.toString())}</td>
                    </tr>
                ))
            }
          {/* ))} */}
        </tbody>
      </table>
    </div>
  )
}

export default Table;