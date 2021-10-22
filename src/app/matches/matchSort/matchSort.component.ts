import { Component, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ICompetition, IMatch, ISeason } from "../shared/match.model";
import { MatchService } from "../shared/match.service";


@Component({
    selector: 'match-sort',
    templateUrl: './matchSort.component.html',
    styleUrls: ['./matchSort.component.scss']
})

export class MatchSort implements OnInit{
    competitions: ICompetition[]
    seasons: ISeason[] = []
    selectedCompetition: ICompetition
    selectedSeason: boolean = false
    matches: IMatch[] = []

    sortMatchForm: FormGroup
    competitionName: FormControl
    seasonName: FormControl

    constructor( private matchService: MatchService, private router: Router, private route: ActivatedRoute ) {
    }
    ngOnInit() {
        
        this.competitionName = new FormControl(null, Validators.required)
        this.seasonName = new FormControl('', Validators.required)


        this.sortMatchForm = new FormGroup({
            competitionName: this.competitionName,
            seasonName: this.seasonName,
        })

            console.log(this.sortMatchForm)
        this.matchService.getListOfCompetitions().subscribe(data => this.competitions = data)

        if (this.route.snapshot.queryParams && this.route.snapshot.queryParams['season']) 
        {this.matchService.getSortedListOfMatches({
            competition: this.route.snapshot.queryParams.competition,
            season: this.route.snapshot.queryParams.season})
        .subscribe((data: any)=> {
            // this.competitionName = data.competition.name
            // this.seasonName = data.season.name
            data.season.matchId?.forEach(e => this.matches.push(e))
            this.competitionName.setValue(data.competition.name)
            this.selectCompetition(data.competition.name)
            this.seasonName.setValue(data.season.name)
        }) 
        } else {
            this.router.navigate(['/'])
            this.competitionName.setValue(null)
        }
    }

    selectCompetition(value: any) {
        this.router.navigate(['/'], {queryParams: {competition: this.sortMatchForm.value.competitionName}})
        this.seasons = []
        this.selectedSeason = false
        this.selectedCompetition = this.sortMatchForm.value.competitionName
        this.matchService.getSortedListOfMatches({competition: this.sortMatchForm.value.competitionName}).subscribe(
            (data:any) => {
                data.competition.seasonId?.forEach(
                    (season:any) => this.seasons.push(season.name)
                )
                this.seasons = this.seasons.reverse()
                // if (!this.route.snapshot.queryParams['season']) {
                this.seasonName.setValue(this.seasons[0])
                this.selectSeason(this.seasons[0])
                // } else {
                // this.seasonName.setValue(this.route.snapshot.queryParams['season'])
                // this.selectSeason(this.route.snapshot.queryParams['season'])
                // }
            }
            
        )
    }

    selectSeason(value: any) {
        this.matches = []
        this.selectedSeason = this.sortMatchForm.value.seasonName
        this.matchService.getSortedListOfMatches({competition: this.selectedCompetition, season: this.sortMatchForm.value.seasonName}).subscribe(
            (data: any) => {
                data.season.matchId?.forEach(
                    (match:any) => this.matches.push(match)
                )
                console.log(this.matches)
                this.router.navigate(['/'], {queryParams: {competition: this.selectedCompetition, season: this.sortMatchForm.value.seasonName}})
            }
        )
        this.selectedSeason = true
    }
}