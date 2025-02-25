import { useNavigate } from "react-router";

interface SetupProps {
  totalGameCount: number;
}

export const Setup: React.FC<SetupProps> = () => {

  const foobarcat = useNavigate(); //Just for fun :)

    return (
      <>
        <h3 className='text-2x1 font-bold'>
          Setup (0 games played)
        </h3>
        <button 
          className="btn btn-active btn-success btn-lg mt-4"
          onClick={
            () => foobarcat('/Play')
          }  
        >
          Start Playing
        </button>
      </>
    );
  };