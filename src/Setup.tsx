import { useNavigate } from "react-router";

export const Setup = () => {

  const foobarcat = useNavigate(); //Just for fun :)

    return (
      <>
        <h3 className='text-2x1 font-bold'>
          Setup
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