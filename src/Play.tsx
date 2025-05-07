import { useNavigate } from "react-router";
import { useState, useEffect, useCallback } from "react";
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
  const [customPoints, setCustomPoints] = useState<Map<string, string>>(new Map());

  const addScore = useCallback((player: string, score: number) => {
    setScores((prev) => {
      const updated = new Map(prev);
      const current = updated.get(player) ?? [];
      current.push(score);
      updated.set(player, current);
      return updated;
    });
  }, []);

  const undoLastScore = (player: string) => {
    setScores((prev) => {
      const updated = new Map(prev);
      const current = [...(updated.get(player) ?? [])];
      current.pop();
      updated.set(player, current);
      return updated;
    });
  };

  const setGoOut = useCallback((player: string) => {
    setGoOuts((prev) => {
      if (prev.includes(player)) return prev;
      return [...prev, player];
    });
    addScore(player, 101);
  }, [addScore]);

  const getTotal = (player: string): number => {
    const list = scores.get(player) ?? [];
    return list.reduce((sum, x) => sum + (x === -1 ? 0 : x), 0);
  };

  const getWinners = (): string[] => {
    const playersWithScores: [string, number][] = currentPlayers.map((p) => [
      p,
      getTotal(p),
    ]);
    const validPlayers = playersWithScores.filter(([, total]) => total <= 101);

    if (validPlayers.length === 0) return []; // No valid winners

    const min = Math.min(...validPlayers.map(([, total]) => total));
    return validPlayers
      .filter(([, total]) => total === min)
      .map(([player]) => player);
  };

  const getOrderedByScore = (): string[] =>
    currentPlayers.slice().sort((a, b) => getTotal(a) - getTotal(b));

  const possibleWinners = getWinners();

  const finishGame = (winner: string) => {
    const totalScores: [string, number][] = currentPlayers.map((p) => [
      p,
      getTotal(p),
    ]);

    const orderedByScore = getOrderedByScore();

    addNewGameResult({
      winner,
      players: orderedByScore,
      start: startTimestamp,
      end: new Date().toISOString(),
      scores: Array.from(scores.entries()),
      totalScores,
      goOuts,
    });
    nav(-2);
  };

  return (
    <div className="p-2 space-y-6">
      <div className="card bg-base-100 shadow-md p-2">
        <div className="card-body">
          <h2 className="card-title">Okey 101 Score Tracker</h2>
          <p className="text-sm text-gray-500">
            Track players' scores hand by hand
          </p>
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
                    <td className="flex flex-wrap gap-1">
                      {(scores.get(player) ?? []).map((s, i) => (
                        <span key={i} 
                              className={`badge badge-sm text-xs ${goOuts.includes(player) ? "badge-secondary" : "badge"}`}>
                          {s}
                        </span>
                      ))}
                    </td>
                    <td>{getTotal(player)}</td>
                    <td>
                      <button
                        className="btn btn-xs btn-outline btn-success whitespace-nowrap px-3"
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

      <div className="card bg-base-100 shadow-md p-2">
        <div className="card-body">
          <h3 className="card-title">Add Score</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {getOrderedByScore().map((p) => (
              <div key={p} 
                   className={`flex flex-col items-start ${goOuts.includes(p) ? "opacity-50" : ""}`}>
                <span className="font-semibold mb-1">{p}</span>
                <div className="flex flex-wrap gap-1">
                  {[0, 5, 10, 20, 50, 101, 202].map((v) => (
                    <button
                      key={v}
                      className="btn btn-xs btn-outline"
                      onClick={() => addScore(p, v)}
                      disabled={goOuts.includes(p)}
                    >
                      {v > 0 ? "+" + v : v}
                    </button>
                  ))}
                  <input
                    type="number"
                    className="input input-xs input-bordered w-16"
                    placeholder="..."
                    onChange={(e) =>
                      setCustomPoints((prev) => new Map(prev).set(p, e.target.value))
                    }
                    value={customPoints.get(p) ?? ""}
                    disabled={goOuts.includes(p)}
                  />

                  <button
                    className="btn btn-xs btn-primary"
                    onClick={() => {
                      const raw = customPoints.get(p);
                      const val = Number(raw);
                      if (!isNaN(val) && raw !== "" && !goOuts.includes(p)) {
                        addScore(p, val);
                        setCustomPoints((prev) => new Map(prev).set(p, ""));
                      }
                    }}
                    disabled={goOuts.includes(p)}
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-md p-2">
        <div className="card-body">
          <h3 className="card-title">Finish Game</h3>

          {possibleWinners.length === 0 ? (
            <p className="text-warning text-sm mt-2 ml-1">
              No eligible winner — all players are over 101 points.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
              {possibleWinners.map((p) => (
                <button
                  key={p}
                  className="btn btn-success"
                  onClick={() => finishGame(p)}
                >
                  {p} Wins!
                </button>
              ))}
            </div>
          )}

          <div className="mt-4">
            <button className="btn btn-outline w-full" onClick={() => nav(-2)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};