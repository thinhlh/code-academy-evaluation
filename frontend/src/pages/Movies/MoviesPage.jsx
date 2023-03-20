import './MoviesPage.scss'
import Header from "../../components/Header/Header";
import Movie from './Movie/Movie';
import useAxios from '../../hooks/use-axios';
import { useEffect, useState } from 'react';
import { HttpMethod } from '../../utils/http-method';

export default function MoviesPage() {

    const { data: getMoviesData, error: getMoviesError, loading: getMoviesLoading, operation } = useAxios()
    const [movies, setMovies] = useState([])

    useEffect(() => {
        operation('/movies', HttpMethod.GET)
    }, [])

    useEffect(() => {
        if (getMoviesData) {
            setMovies(getMoviesData.data)
        }
    }, [getMoviesData, getMoviesError, getMoviesLoading, setMovies])

    return (
        <div >
            <Header />
            <div style={{ display: "flex", justifyContent: "center" }}>
                {getMoviesLoading ? <p>Loading...</p> : <div className="movies-list">
                    {
                        movies.map((movie) => <Movie key={movie.id} movie={movie} />)
                    }
                </div >
                }
            </div>

        </div >
    )
}
