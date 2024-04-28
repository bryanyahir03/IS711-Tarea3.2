const express = require('express');
const app = express();
const movies = require('./movies.json')

app.get('/obtenerPeliculas', (req, res) => {
    res.json(movies);
});

app.get('/obtenerPelicula/:id', (req, res) => {
    const movieId = req.params.id;
    const movie = movies.find(movie => movie.id == movieId);
    if (movie) {
        res.json(movie);
    } else {
        res.status(404).json({ error: 'Pelicula no encontrada', message: 'No se encontro ninguna pelicula con el Id dado.'});
    }
});

app.post('/crearPelicula', (req, res) => {
    const newMovie = req.body;
    if (!newMovie.title || !newMovie.director || !newMovie.year) {
        return res.status(400).json({ error: 'Campos faltantes', message: 'Se requieren los siguientes campos: title, director, year.'});
    }
    movies.push(newMovie);
    res.status(201).json(newMovie);
});

app.put('/modificarPelicula/:id', (req, res) => {
    const movieId = req.params.id;
    const updatedMovie = req.body;
    const index = movies.findIndex(movie => movie.id == movieId);
    if (index !== -1) {
        movies[index] = updatedMovie;
        res.json(updatedMovie);
    } else {
        res.status(404).json({ error: 'Pelicula no encontrada', message: 'No se encontro ninguna pelicula con el id dado.'});
    }
});

app.delete('eliminarPelicula/:id', (req, res) => {
    const movieId = req.params.id;
    const index = movies.findIndex(movie => movie.id === movieId);
    if (index !== -1) {
        movies.splice(index, 1);
        res.json({ message: 'Pelicula eliminada exitosamente'});
    } else {
        res.status(404).json({ error: 'Pelicula no encontrada', message: 'Ninguna pelicula se econtro con el id dado.'});
    }
});

const PORT = 4200;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
