import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable()

export class MatchService {
    constructor(private http: HttpClient){

    }


    getMatches(page?):Observable<any[]>{
        if (!page) return this.http.get<any[]>('/api/matches')
        return this.http.get<any[]>(`/api/matches?page=${page}`)
    }

    getListOfCompetitions():Observable<any[]> {
        return this.http.get<any[]>('/api/competitions')
    }

    getSortedListOfMatches(params: any):Observable<any[]> {
        return this.http.get<any[]>(`/api/sorted`, {params})
    }

    saveMatch(formData) {
        const {competitionName, seasonName, awayTeamName, homeTeamName, score, date} = formData
        return this.http.post('/api/add-match', {
            competition: competitionName,
            season: seasonName,
            awayTeamName,
            homeTeamName,
            score,
            date
        })
    }
}