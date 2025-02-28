import { useNavigate } from "react-router";
import { LeaderboardEntry } from "./GameResults";

interface HomeProps {
  totalGameCount: number;
  leaderboardData: LeaderboardEntry[];
}

export const Home: React.FC<HomeProps> = ({
  totalGameCount
  , leaderboardData
}) => {
  console.log(leaderboardData);
  // Use a react hook for button navigation...
  const nav = useNavigate();

    return (
      <>
        <h3 className='text-2x1 font-bold'>
          Home ({totalGameCount} games played)
        </h3>
        <button 
          className="btn btn-active btn-success btn-lg mt-4"
          onClick={
            () => nav("/Setup")
          }
        >
          Play Okey 101
        </button>
        <div className="card w-full bg-base-100 card-md shadow-lg mt-4">
          <div 
            className="card-body"
          >
            <h2 
              className="card-title"
            >
              Leaderboard
            </h2>
            <p>
              Leaderboard goes here!!!
            </p>
          </div>
        </div>
      </>
    );
  };