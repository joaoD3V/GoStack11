import React, { useState, useEffect } from 'react';
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [ids, setIds] = useState([]);
  const { uuid } = require('uuidv4');

   useEffect(() => {
    api.get('repositories').then(response => {
        const repositories = response.data
        setRepositories(repositories);
       
      });
    }, [repositories]);

   
    // useEffect(() => {
    //   api.get('repositories').then(response => {
    //     const repositories = response.data
    //     const ids = repositories[0].id        
    //     setIds(ids);
    //     console.log(ids);        
    //   });

    // }, []);

   
  
  async function handleAddRepository() {
    const id = uuid();
    await api.post('repositories', {
      "id": id,
      "title": `Novo projeto ${Date.now()}`,
      "url": "https://",	
      "techs": ["Node.js", "React.js", "React Native"]
      
    });   
    setIds([...ids, id]);
 
  }

 

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`); 
    setIds(ids.filter(identifiyer => identifiyer !== id));
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id}>{repository.title}</li>)}
        <li>
          Repositório 1

          <button onClick={() => handleRemoveRepository(ids[ids.length - 1])}>
            Remover
          </button>
        </li>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
      
    </div>
  );
}

export default App;
