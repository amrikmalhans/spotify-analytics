import axios from 'axios';
import type { NextPage } from 'next'
import Router from 'next/router';

const Home: NextPage = () => {
   const handleOnClick = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const { data } = await axios.get('http://localhost:8000/login/spotify', {
      withCredentials: true,
    });
     Router.push(data);
    
  };
  return (
    <div>
        <button onClick={handleOnClick}>Login with spotify</button>
    </div>
  )
}

export default Home
 