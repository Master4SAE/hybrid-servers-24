import { MediaItem } from '@sharedTypes/DBTypes';
import { fetchAllMedia, fetchMediaById, fetchMediaByTag, postMedia, putMedia, postTagToMedia, deleteMedia } from '../models/mediaModel';

export default {
    Query: {
        mediaItems: async () => {
            return await fetchAllMedia();
        },
        mediaItem: async (_parent: undefined, args: { media_id: string }) => {
            const id = Number(args.media_id);
            return await fetchMediaById(id);
        },
        mediaItemsByTag: async (_parent: undefined, args: { tag: string }) => {
            return await fetchMediaByTag(args.tag);
        },
    },
    Mutation: {
        createMediaItem: async (_parent: undefined, args: { input: Omit<MediaItem, 'media_id' | 'created_at' | 'thumbnail'> },) => {
            return postMedia(args.input);
        },
        addTagToMediaItem: async (_parent: undefined, args: { input: { media_id: string; tag_name: string } }, ) => {
        const str = args.input.tag_name;
        const modStr = str[0].toUpperCase() + str.slice(1);
        console.log(str); // name
        console.log(modStr); // Name

            return await postTagToMedia( modStr, Number(args.input.media_id), );

        },

        updateMediaItem: async (
            _parent: undefined,
            args: {input: Pick<MediaItem, 'title' | 'description'>; media_id: string;},) => {
            return await putMedia(args.input, Number(args.media_id));
        },
        deleteMediaItem:async (_parent: undefined, args: {input:string}) => {
            return await deleteMedia(Number(args.input));
        },
    },
};