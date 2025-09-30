export interface Game {
    id: number,
    name: string,
    cover: string,
    code: string,
    type: number
}

export interface GamePageProps {
    params: {
        id: string
    }
}