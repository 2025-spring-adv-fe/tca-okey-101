import './App.css'

function App() {

  return (
    <div>
      <h1
        className='text-2xl font-bold bg-base-300 p-4 text-secondary'
      >
        TCA Okey 101
      </h1>
      <button
        className='btn btn-success btn-soft btn-xl p-4 my-4'
      >
        Play Okey 101
      </button>
      <h2
        className='mt-3 text-xl font-semi-bold'
      >
        Leaderboard...
      </h2>   
      <div 
        className="card bg-base-100"
      >
        <div 
          className="card-body"
        >
          <h2 
            className="card-title"
          >
            Leaderboard...
          </h2>
          <p>
            Leaderboard comming soon
          </p>
        </div>
      </div>    
    </div>
  )
}

export default App
