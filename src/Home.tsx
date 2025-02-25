import { useNavigate } from "react-router";
export const Home = () => {

  // Use a react hook for button navigation...
  const nav = useNavigate();

    return (
      <>
        <h3 className='text-2x1 font-bold'>
          Home (0 games played)
        </h3>
        <button 
          className="btn btn-active btn-success btn-lg mt-4"
          onClick={
            () => nav("/Setup")
          }
        >
          Play Okey 101
        </button>
      </>
    );
  };