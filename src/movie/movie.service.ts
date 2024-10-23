import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MovieDto } from 'src/Dto/MovieDto';
import { Movie } from './schema/movie.schema';

@Injectable()
export class MovieService {
    constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) { }
    async getAllMovies() {
        try {
           return await this.movieModel.find() 
        }catch (err) {
          throw new BadRequestException(err)  
        }
    }
    async getMovie(id:string) {
        try {
            return await this.movieModel.findById(id)
        } catch(err) {
            throw new NotFoundException({message:'movie not found'})
        }
    }
    async createMovie(movieDto: MovieDto) {
        try {
            return await this.movieModel.create(movieDto);
        } catch (err) {
            throw new BadRequestException(err)
        }
        
    }
    async updateMovie(id:string,updateMovieDto:MovieDto) {
        try {
            const movie = await this.movieModel.findById(id);
            if (movie)return  movie.updateOne(updateMovieDto) 
        } catch (err) {
            throw new NotFoundException({message:'movie not found with this id',err});
        }
    }
    async deleteMovie(id: string) {
        try {
            const deleteMovie = await  this.movieModel.findById(id);
            if (!deleteMovie) {
                throw new NotFoundException();
            }
            return  deleteMovie.deleteOne()
        } catch (err) {
            throw new NotFoundException({message:'movie not found with this id',err});
        }
    }
}
