import { useNavigate } from "react-router";
import { GeneralFacts, GoOutsLeaderboardEntry, HighestSingleHandScoreLeaderboardEntry, LeaderboardEntry } from "./GameResults";
import { useEffect } from "react";

export const AppTitle = "Okey 101"

interface HomeProps {
  leaderboardData: LeaderboardEntry[];
  setTitle: (t: string) => void;
  generalFacts: GeneralFacts;
  goOutsLeaderboardData: GoOutsLeaderboardEntry[];
  highestSingleHandScoreLeaderboardData: HighestSingleHandScoreLeaderboardEntry[]; // Updated name
  gameDurationData: any; // : - (
  gamesByMonthData: Array<[string, number]>
}

export const Home: React.FC<HomeProps> = ({
  leaderboardData
  , setTitle
  , generalFacts
  , goOutsLeaderboardData
  , highestSingleHandScoreLeaderboardData
  , gameDurationData
  , gamesByMonthData
}) => {

  useEffect(
    () => setTitle(AppTitle)
    , [setTitle]
  );

  // Use a react hook for button navigation...
  const nav = useNavigate();

  return (
    <>
      
      <button
        className="btn btn-active btn-success btn-lg mt-4"
        onClick={() => nav("/Setup")}
      >
        Play Okey 101
      </button>
      <div
        className="card w-full bg-base-100 card-md shadow-lg mt-4"
      >
        <div
          className="card-body"
        >
          <h2
            className="card-title"
          >
            General
          </h2>
          <div
            className="overflow-x-auto"
          >
            <table
                className="table"
            >
              <tbody>
                <tr>
                  <td>
                    Last Played
                  </td>
                  <th>
                    {generalFacts.lastPlayed}
                  </th>
                </tr>
                <tr>
                  <td>
                    Total Games
                  </td>
                  <th>
                    {generalFacts.totalGames}
                  </th>
                </tr>
                <tr>
                  <td>
                    Shortest Game
                  </td>
                  <th>
                    {generalFacts.shortestGame}
                  </th>
                </tr>
                <tr>
                  <td>
                    Longest Game
                  </td>
                  <th>
                    {generalFacts.longestGame}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div 
        className="card w-full bg-base-100 card-md shadow-lg mt-4"
      >
        <div 
          className="card-body"
        >
          <h2 
            className="card-title"
          >
            Leaderboard
          </h2>
          {
            leaderboardData.length > 0
              ? (
                  <div 
                    className="overflow-x-auto"
                  >
                    <table 
                      className="table"
                    >
                      {/* head */}
                      <thead>
                        <tr>
                          <th>
                            W
                          </th>
                          <th>
                            L
                          </th>
                          <th>
                            AVG
                          </th>
                          <th>
                            PLAYER
                          </th>
                        </tr>
                      </thead>
                      <tbody>

                        {
                          leaderboardData.map(
                            x => (
                              <tr
                                key={x.player}
                              >
                                <td>
                                  {x.wins}
                                </td>
                                <td>
                                  {x.losses}
                                </td>
                                <td>
                                  {x.average}
                                </td>
                                <td>
                                  {x.player}
                                </td>
                              </tr>
                            )
                          )
                        }  

                      </tbody>
                    </table>
                  </div>
              )
              : (
                  <p>
                    Play a game of Okey 101 to see the Leaderboard!!!
                  </p>
              )
          }
                  
        </div>
      </div>
      <div
        className="card w-full bg-base-100 card-md shadow-lg mt-4 border-t-4 border-secondary"
      >
      <div
          className="card-body p-0"
      >
          <h2
              className="card-title ml-3 mt-3"
          >
              "Go Outs" Leaderboard
          </h2>
          <p className="text-sm ml-3 -mt-2 mb-2 text-gray-500">
            Measures how often players go out per game
          </p>
          {
              goOutsLeaderboardData.length > 0 
                  ? (
                      <div 
                          className="overflow-x-auto"
                      >
                        <table 
                            className="table"
                        >
                          <thead>
                            <tr>
                              <th>
                                PLAYER
                              </th>
                              <th>
                                AVG 'GO OUTS' PER GAME
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                              {
                                goOutsLeaderboardData.map(
                                    x => (
                                        <tr
                                            key={x.player}
                                        >
                                            <td>
                                                {x.player}
                                            </td>
                                            <td>
                                                {x.goOutsPerGame}
                                                <span className="text-xs font-light ml-4">
                                                    {x.totalGoOuts} in {x.gamesPlayed} {`game${x.gamesPlayed === 1 ? "" : "s"}`}
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                )
                              }
                          </tbody>
                        </table>
                      </div>
                  )
                  : (
                      <p
                          className="mx-3 mb-3"
                      >
                          Play a game of Okey 101 to see the leaderboard ! ! !
                      </p>
                  )
          }
          </div>
      </div>
      <div
          className="card w-full bg-base-100 card-md shadow-lg mt-4 border-t-4 border-secondary"
      >
          <div
              className="card-body p-0"
          >
              <h2
                  className="card-title ml-3 mt-3"
              >
                  Game Durations
              </h2>
              <p className="text-sm ml-3 -mt-2 mb-2 text-gray-500">
                Average game time grouped by player count
              </p>
              <p className="text-sm ml-3 -mt-2 mb-2 text-gray-500">Average duration by number of players</p>
              {
                  gameDurationData.length > 0 
                      ? (
                          <div 
                              className="overflow-x-auto"
                          >
                              <table 
                                  className="table"
                              >
                                  <thead>
                                      <tr>
                                          <th>
                                              PLAYERS
                                          </th>
                                          <th>
                                              AVG DURATION
                                          </th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {
                                        gameDurationData.map(
                                            (x: any) => (
                                                <tr
                                                    key={x.numberOfPlayers}
                                                >
                                                    <td>
                                                        {x.numberOfPlayers}
                                                    </td>
                                                    <td>
                                                        {x.avgGameDuration}
                                                        <span className="text-xs font-light ml-4">
                                                            {x.gameCount} {`game${x.gameCount === 1 ? "" : "s"}`}
                                                        </span>                                                                
                                                    </td>
                                                </tr>
                                            )
                                        )
                                      }
                                  </tbody>
                              </table>
                          </div>
                      )
                      : (
                          <p
                              className="mx-3 mb-3"
                          >
                              Play some Okey-101 to see : - O
                          </p>
                      )
              }
          </div>
      </div>
      <div
        className="card w-full bg-base-100 card-md shadow-lg mt-4 border-t-4 border-secondary"
      >
        <div
          className="card-body p-0"
        >
          <h2
            className="card-title ml-3 mt-3"
          >
            Worst Hands
          </h2>
          <p className="text-sm ml-3 -mt-2 mb-2 text-gray-500">
            Highest single-hand penalties recorded
          </p>
          {
            highestSingleHandScoreLeaderboardData.length > 0 
              ? (
                  <div 
                    className="overflow-x-auto"
                  >
                    <table 
                      className="table"
                    >
                      <thead>
                        <tr>
                          <th>
                            PLAYER
                          </th>
                          <th>
                            SCORE
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          highestSingleHandScoreLeaderboardData.map(
                            x => (
                                <tr
                                    key={x.player}
                                >
                                    <td>
                                        {x.player}
                                    </td>
                                    <td>
                                        {x.highestSingleHandScore}
                                    </td>
                                </tr>
                            )
                          )
                        }
                      </tbody>
                    </table>
                  </div>
                )
                : (
                    <p
                        className="mx-3 mb-3"
                    >
                        Play a game with scores to see the highest single hand score leaderboard!
                    </p>
                  )
          }
        </div>
      </div>
      <div
                className="card w-full bg-base-100 card-md shadow-lg mt-4 border-t-4 border-secondary"
            >
                <div
                    className="card-body p-0"
                >
                    <h2
                        className="card-title ml-3 mt-3"
                    >
                        Games by Month
                    </h2>
                    <p className="text-sm ml-3 -mt-2 mb-2 text-gray-500">
                      Total games played each month
                    </p>
                    {
                        leaderboardData.length > 0 
                            ? (
                                <div 
                                    className="overflow-x-auto"
                                >
                                    <table 
                                        className="table"
                                    >
                                        <thead>
                                            <tr>
                                                <th>
                                                    MONTH
                                                </th>
                                                <th>
                                                    # OF GAMES
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                gamesByMonthData.map(
                                                    x => (
                                                        <tr
                                                            key={x[0]}
                                                        >
                                                            <td>
                                                                {x[0]}
                                                            </td>
                                                            <td>
                                                                {x[1]}
                                                            </td>
                                                        </tr>
                                                    )
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            )
                            : (
                                <p
                                    className="mx-3 mb-3"
                                >
                                    Yeah right, play a game to see : - O
                                </p>
                            )
                    }
                </div>
      </div>
    </>
  );
};
