import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MovieDto } from 'src/Dto/MovieDto';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
    constructor(private readonly movieService: MovieService) { }
    @Get()
    getAllMovies() {
        return this.movieService.getAllMovies()
    }
    @Get('/:id')
    getMovie(@Param('id') id:string) {
        return this.movieService.getMovie(id)
    }
    @Post() 
    createMovie(@Body()movieDto: MovieDto) {
        return this.movieService.createMovie(movieDto);
    }
    @Put('/:id')
    updateMovie(@Param('id') id, @Body() updateMovieDto:MovieDto) {
        return this.movieService.updateMovie(id,updateMovieDto)
    }
    @Delete('/:id')
    deleteMovie(@Param('id') id:string) { 
        return this.movieService.deleteMovie(id)
    }
}
