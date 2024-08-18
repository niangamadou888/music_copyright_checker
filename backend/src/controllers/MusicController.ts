import { MusicService } from "../services/muiscService";
import { Request, Response } from "express";
import { buildQuery } from '../utils/queryBuilder';
import { AuthRequest } from "../middleware/auth";
import MusicModel from "../models/music";



export class MusicController {
    private musicService: MusicService
    // write 3 methods for getting all musics by the user, getting a single music by the user, and creating a music

    constructor() {
        this.musicService = new MusicService()
    }
    async getAllMusicesByUser (req: AuthRequest, res: Response): Promise<void> {
        try{
            const { query, options} = buildQuery(MusicModel, req.query)
        query.user_id = req.user._id

        const musics = await this.musicService.getAllMusicsByUser(query, options)
        res.status(200).json(musics)
        } catch (error) {
            res.status(500).json({ message: error })
        }
            
    }

    // get musics of all users
    async getAllMusics (req: Request, res: Response): Promise<void> {
        try {
            const musics = await this.musicService.getAllMusics()
            res.status(200).json(musics)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }


    async getMusicById (req: AuthRequest, res: Response): Promise<void> {
        try {
            const musicId = req.params.id
            const music = await this.musicService.getMusicById(musicId)

            if (!music) {
                res.status(404).json({ message: "Music not found" })
                return
            }
            if (music.user_id.toString() !== req.user._id) {
                res.status(403).json({ message: "You are not authorized to view this music" })
                return
            }
            res.status(200).json(music)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    async createMusic (req: AuthRequest, res: Response): Promise<void> {
        try {
            const musicData = req.body
            musicData.user_id = req.user._id

            const music = await this.musicService.createMusic(musicData)
            res.status(201).json(music)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }


}