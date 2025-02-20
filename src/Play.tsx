import { useNavigate } from "react-router";

export const Play = () => {

  const nav = useNavigate();

    return (
      <>
        <h3 className='text-2x1 font-bold'>
          Play
        </h3>
        <button 
          className="btn btn-active btn-success btn-lg mt-4"
          onClick={
            () => nav(-2) // Back to the top
          }  
        >
          Done
        </button>
      </>
    );
  };