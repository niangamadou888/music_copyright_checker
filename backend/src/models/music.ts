import { Schema, Document, model } from "mongoose";


export interface Music extends Document {
    video_id: string;
    user_id: string;
    url: string;
    thumbnail?: string;
}

const MusicSchema = new Schema<Music>({
    video_id: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
    }
});

const MusicModel = model<Music>("Music", MusicSchema);
export default MusicModel;