import './App.css'
import Graph from './components/Graph'
import Table from './components/Table'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="bg-green-500 w-full h-screen flex gap-12 justify-center items-center">
      <Table/>
      <Graph/>
    </div>
  )
}

export default App
