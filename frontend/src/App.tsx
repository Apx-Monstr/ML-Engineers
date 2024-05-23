import './App.css'
import Graph from './components/Graph'
import Table from './components/Table'
import { useState } from 'react'
function App() {
  const [year, setYear] = useState<number|null>(null);
  const handleYearChange = (year: number) => {
    setYear(year);
  };
  return (
    <div className="bg-green-500 w-full h-screen flex gap-12 justify-center items-center">
      <Table onRowClick = {handleYearChange}/>
      <Graph year = {year}/>
    </div>
  )
}
export default App;
