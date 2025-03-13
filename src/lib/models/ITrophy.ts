import { TTrophyIcon } from "@/ui/TrophiesGallery";

export default interface ITrophy {
    title: string,
    description: string,
    isGained: boolean,
    iconType: TTrophyIcon,
    hobbyId: string,
}