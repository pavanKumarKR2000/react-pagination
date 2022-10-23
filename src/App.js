import { useEffect, useState } from 'react';
import './App.css';
import Follower from './Follower';
import { useFetch } from './useFetch';

function App() {

  const { loading, data } = useFetch(false);
  const [page, setPage] = useState(0);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {

    if (loading) return
    setFollowers(data[page]);
  }, [loading,page]);


  const handlePage = (index) => {
    setPage(index);
  }

  const prevPage = () => {
    if (page > 0) {
      setPage(page-1)
    }
  }

  const nextPage = () => {
    
    if (page < data.length -1) {
      setPage(page + 1);
    }
  }

  return (
    <main>
      <div className='section-title'>
        <h1>{loading ?
          "loading"
        : "pagination"}</h1>  
        <div className='underline'></div>
      </div>
      <div className='container'>
        {followers.map(follower => {
          return <Follower key={follower.id} {...follower} />   
        })
       }
      </div>
      {
        !loading && (
          <div className='btn-container'>
            <button className='prev-btn' onClick={prevPage}>{"<<<"}</button>
            {
              data.map((item, index) => {
                return <button className={`page-btn ${index===page?"active-btn":null}`} key={index} onClick={() => handlePage(index)}>{index + 1}</button>
              })
            }
            <button className='next-btn' onClick={nextPage}>{">>>"}</button>
          </div>
        )
      }
    </main>
  );
}

export default App;
