export interface ICompetition {
    name: string,
    seasons?: ISeason[]
}

export interface ISeason {
    name: string,
    matches?: IMatch[]
}

export interface IMatch {
    homeTeamName: string,
    awayTeamName: string,
    score?: string,
    date: Date
}