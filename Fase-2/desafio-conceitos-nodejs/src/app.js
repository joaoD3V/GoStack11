const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

// function validateRepositoryID(request, response, next){
//   const { id } = request.params;

//   if(!isUuid(id)){
//     return response.status(400).json({ error: 'Invalid repository ID.' });
//   }

//   return next();
// }

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { id, title, url, techs } = request.body;
  
  if (id === undefined){
    const repository = {  id: uuid(), title, url, techs, likes: 0 };
    repositories.push(repository);
    return response.status(201).json(repository);
  } else{
    const repository = { id, title, url, techs, likes: 0 };
    repositories.push(repository);
    return response.status(201).json(repository)
  }
 
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => 
    repository.id === id);
  
  if(repositoryIndex < 0){
    return response.status(400).json({ error: 'Repository not found' });
  }

  if(!(title === undefined)){
    repositories[repositoryIndex].title = title;
  };

  if(!(url === undefined)){
    repositories[repositoryIndex].url = url;
  };

  if(!(techs === undefined)){
     repositories[repositoryIndex].techs = techs;
  };


  return response.json(repositories[repositoryIndex]);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository =>
    repository.id === id);

    if(repositoryIndex < 0){
      return response.status(400).json({ error: 'Repository not found.' });
    }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  
  const repositoryIndex = repositories.findIndex(repository => 
    repository.id === id);
    
  if(repositoryIndex < 0){
    return response.status(400).json({ error: 'Repository not found.' });
  };

  repositories[repositoryIndex].likes += 1;
  
  return response.status(201).json(repositories[repositoryIndex]);
});

module.exports = app;
