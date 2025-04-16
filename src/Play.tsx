import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { GameResult } from "./GameResults";

interface PlayProps {
  addNewGameResult: (r: GameResult) => void;
  setTitle: (t: string) => void;
  currentPlayers: string[];
}

export const Play: React.FC<PlayProps> = ({
  addNewGameResult,
  setTitle,
  currentPlayers,
}) => {
  useEffect(() => setTitle("Play"), [setTitle]);
  const nav = useNavigate();

  const [startTimestamp] = useState(new Date().toISOString());
  const [scores, setScores] = useState(new Map<string, number[]>());
  const [goOuts, setGoOuts] = useState<string[]>([]);

  const addScore = (player: string, score: number) => {
    setScores((prev) => {
      const updated = new Map(prev);
      const current = updated.get(player) ?? [];
      current.push(score);
      updated.set(player, current);
      return updated;
    });
  };

  const undoLastScore = (player: string) => {
    setScores((prev) => {
      const updated = new Map(prev);
      const current = [...(updated.get(player) ?? [])];
      current.pop();
      updated.set(player, current);
      return updated;
    });
  };

  const setGoOut = (player: string) => {
    setGoOuts((prev) => [...prev, player]);
  };

  const getTotal = (player: string): number => {
    const list = scores.get(player) ?? [];
    return list.reduce((sum, x) => sum + (x === -1 ? 0 : x), 0);
  };

  const getWinners = (): string[] => {
    const playersWithScores: [string, number][] = currentPlayers.map((p) => [p, getTotal(p)]);
    const min = Math.min(...playersWithScores.map(([, t]) => t));
    return playersWithScores.filter(([, t]) => t === min).map(([p]) => p);
  };

  const getOrderedByScore = (): string[] =>
  currentPlayers
    .slice()
    .sort((a, b) => getTotal(a) - getTotal(b));

  const possibleWinners = getWinners();

  const finishGame = (winner: string) => {
    addNewGameResult({
      winner,
      players: getOrderedByScore(),
      start: startTimestamp,
      end: new Date().toISOString(),
      scores: Array.from(scores.entries()),
      goOuts,
    });
    nav(-2);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <h2 className="card-title">Okey 101 Score Tracker</h2>
          <p className="text-sm text-gray-500">Track players' scores hand by hand</p>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Player</th>
                  <th>Scores</th>
                  <th>Total</th>
                  <th>Go Outs</th>
                  <th>Undo</th>
                </tr>
              </thead>
              <tbody>
                {getOrderedByScore().map((player) => (
                  <tr key={player}>
                    <td>{player}</td>
                    <td className="space-x-1">
                      {(scores.get(player) ?? []).map((s, i) => (
                        <span key={i} className="badge">
                          {s}
                        </span>
                      ))}
                    </td>
                    <td>{getTotal(player)}</td>
                    <td>
                      <button
                        className="btn btn-xs btn-outline btn-success"
                        onClick={() => setGoOut(player)}
                      >
                        Go Out
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-xs btn-outline btn-error"
                        onClick={() => undoLastScore(player)}
                      >
                        Undo
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <h3 className="card-title">Add Score</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {getOrderedByScore().map((p) => (
              <div key={p} className="flex flex-col items-start">
                <span className="font-semibold">{p}</span>
                <div className="join mt-1">
                  {[-10, -5, 0, 5, 10, 20, 50].map((v) => (
                    <button
                      key={v}
                      className="btn btn-sm btn-outline join-item"
                      onClick={() => addScore(p, v)}
                    >
                      {v > 0 ? "+" + v : v}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <h3 className="card-title">Finish Game</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {possibleWinners.map((p) => (
              <button
                key={p}
                className="btn btn-success"
                onClick={() => finishGame(p)}
              >
                {p} Wins!
              </button>
            ))}
            <button className="btn btn-outline" onClick={() => nav(-2)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};