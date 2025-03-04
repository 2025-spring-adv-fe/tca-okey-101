import { useNavigate } from "react-router";

interface SetupProps {
  setTitle: (t: string) => void;
}

export const Setup: React.FC<SetupProps> = ({
  setTitle
}) => {

  setTitle("Setup");
  const foobarcat = useNavigate(); //Just for fun :)

    return (
      <>
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