import './App.css'

interface AppProps {
  timestamp: string;
  magicNumber: number;
}
const App: React.FC<AppProps> = (
  {
    timestamp
    , magicNumber
  }
) => {

  console.log(
    "App Component Func Called"
    , timestamp
    , magicNumber
  );
  return (
    <div>
      <h1
        className='text-2xl font-bold'
      >
        TCA Okey 101
      </h1>
      <p>
        { timestamp} - {magicNumber}
      </p>
      <button
        className='btn btn-success btn-active btn-xl'
      >
        Play Okey 101
      </button>
    </div>
  )
}

export default App
