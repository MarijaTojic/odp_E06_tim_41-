import express from 'express';
import cors from 'cors';
import { IAuthService } from './Domain/services/auth/IAuthService';
import { AuthService } from './Services/auth/AuthService';
import { IUserRepository } from './Domain/repositories/users/IUserRepository';
import { UserRepository } from './Database/repositories/users/UserRepository';
import { AuthController } from './WebAPI/controllers/AuthController';
import { IUserService } from './Domain/services/users/IUserService';
import { UserService } from './Services/users/UserService';
import { UserController } from './WebAPI/controllers/UserController';
import { IContentRepository } from './Domain/repositories/users/IContentRepository';
import { ContentRepository } from './Database/repositories/content/ContentRepository';
import { IRatingRepository } from './Domain/repositories/users/IRatingRepository';
import { RatingRepository } from './Database/repositories/rating/RatingRepository';
import { ITriviaRepository } from './Domain/repositories/users/ITriviaRepository';
import { TriviaRepository } from './Database/repositories/trivia/TriviaRepository';
import { IContentService } from './Domain/services/content/IContent';
import { ContentService } from './Services/content/ContentService';
import { IRatingService } from './Domain/services/rating/IRating';
import { RatingService } from './Services/rating/RatingService';
import { ITriviaService } from './Domain/services/trivia/ITrivia';
import { TriviaService } from './Services/trivia/TriviaService';
import { ContentController } from './WebAPI/controllers/ContentController';
import { RatingController } from './WebAPI/controllers/RatingController';
import { TriviaController } from './WebAPI/controllers/triviaController';

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Repositories
const userRepository: IUserRepository = new UserRepository();
const contentRepository: IContentRepository = new ContentRepository();
const ratingRepository: IRatingRepository = new RatingRepository();
const triviaRepository: ITriviaRepository = new TriviaRepository();

// Services
const authService: IAuthService = new AuthService(userRepository);
const userService: IUserService = new UserService(userRepository);
const contentService: IContentService = new ContentService(contentRepository);
const ratingService: IRatingService = new RatingService(ratingRepository);
const triviaService: ITriviaService = new TriviaService(triviaRepository);

// WebAPI routes
const authController = new AuthController(authService);
const userController = new UserController(userService);
const contentController = new ContentController(contentRepository, contentService);
const ratingController = new RatingController(ratingRepository, ratingService);
const triviaController = new TriviaController(triviaRepository, triviaService);


// Registering routes
app.use('/api/v1', authController.getRouter());
app.use('/api/v1', userController.getRouter());

export default app;