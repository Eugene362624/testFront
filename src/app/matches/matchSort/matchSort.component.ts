import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IconService } from 'carbon-components-angular';
import { ICompetition, IMatch, ISeason } from '../shared/match.model';
import { MatchService } from '../shared/match.service';
import { Menu24, Earth24, Close24 } from '@carbon/icons';

@Component({
  selector: 'match-sort',
  templateUrl: './matchSort.component.html',
  styleUrls: ['./matchSort.component.scss'],
})
export class MatchSort implements OnInit {
  competitions: ICompetition[];
  seasons: ISeason[] = [];
  selectedCompetition: ICompetition;
  isSeasonSelected: boolean = false;
  selectedSeason: ISeason;
  matches: IMatch[] = [];

  queryParams: { competition: string; season: string };
  seasonUrl: string;

  sortMatchForm: FormGroup;
  competitionName: FormControl;
  seasonName: FormControl;

  constructor(
    private matchService: MatchService,
    private router: Router,
    private route: ActivatedRoute,
    protected iconService: IconService
  ) {}
  ngOnInit() {
    this.iconService.register(Menu24);
    this.iconService.register(Earth24);
    this.iconService.register(Close24);
    this.competitionName = new FormControl(null, Validators.required);
    this.seasonName = new FormControl(null, Validators.required);

    this.sortMatchForm = new FormGroup({
      competitionName: this.competitionName,
      seasonName: this.seasonName,
    });

    this.matchService
      .getListOfCompetitions()
      .subscribe((data) => (this.competitions = data));

    this.route.queryParams.subscribe((data: any): any => {
      (this.queryParams = data), (this.seasonUrl = data.season);
    });
    if (this.queryParams && this.seasonUrl) {
      this.matchService
        .getSortedListOfMatches({
          competition: this.queryParams?.competition,
          season: this.queryParams?.season,
        })
        .subscribe((data: any) => {
          data.season.matchId?.map((e) => this.matches.push(e));
          this.competitionName.setValue(data.competition.name);
          this.selectCompetition(data.competition.name);
          this.seasonName.setValue(data.season.name);
        });
    } else {
      this.router.navigate(['/']);
      this.competitionName.setValue(null);
    }
  }

  cleanUpCompetition() {
    this.selectedCompetition = null;
    this.seasons = [];
    this.competitionName.setValue(null);
    this.seasonName.setValue(null);
    this.selectCompetition(null);
    this.selectSeason(null);
  }

  cleanUpSeason() {
    this.selectedSeason = null;
    this.isSeasonSelected = false;
    this.seasonName.setValue(null);
    this.selectSeason(null);
  }

  selectCompetition(value: any) {
    this.router.navigate(['/'], {
      queryParams: { competition: this.sortMatchForm.value.competitionName },
    });
    this.seasons = [];
    this.selectSeason(null);
    this.isSeasonSelected = false;
    this.selectedCompetition = this.sortMatchForm.value.competitionName;
    this.matchService
      .getSortedListOfMatches({
        competition: this.sortMatchForm.value.competitionName,
      })
      .subscribe((data: any) => {
        data.competition.seasonId?.map((season: any) =>
          this.seasons.push(season.name)
        );
        this.seasons = this.seasons.reverse();
        this.seasonName.setValue(this.seasons[0]);
        this.selectSeason(this.seasons[0]);
      });
  }

  selectSeason(value: any) {
    this.matches = [];
    this.selectedSeason = this.sortMatchForm.value.seasonName;
    this.matchService
      .getSortedListOfMatches({
        competition: this.selectedCompetition,
        season: this.sortMatchForm.value.seasonName,
      })
      .subscribe((data: any) => {
        data.season.matchId?.map((match: IMatch) => this.matches.push(match));

        this.router.navigate(['/'], {
          queryParams: {
            competition: this.selectedCompetition,
            season: this.sortMatchForm.value.seasonName,
          },
        });
      });
    this.isSeasonSelected = true;
  }
}
