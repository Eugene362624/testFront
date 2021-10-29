import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { backend } from 'src/app/app.module';
import { ICompetition, IMatch } from './match.model';

@Injectable()
export class MatchService {
  constructor(private http: HttpClient) {}

  getMatches(page?): Observable<IMatch[]> {
    if (!page) return this.http.get<any[]>(`${backend}/api/matches`);
    return this.http.get<IMatch[]>(`${backend}/api/matches?page=${page}`);
  }

  getListOfCompetitions(): Observable<ICompetition[]> {
    return this.http.get<ICompetition[]>(`${backend}/api/competitions`);
  }

  getSortedListOfMatches(params: any): Observable<any[]> {
    return this.http.get<any[]>(`${backend}/api/sorted`, { params });
  }

  saveMatch(formData) {
    const {
      competitionName,
      seasonName,
      awayTeamName,
      homeTeamName,
      score,
      date,
    } = formData;
    return this.http.post(`${backend}/api/add-match`, {
      competition: competitionName,
      season: seasonName,
      awayTeamName,
      homeTeamName,
      score,
      date,
    });
  }
}
