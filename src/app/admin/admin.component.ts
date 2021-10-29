import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { IMatch } from '../matches/shared/match.model';
import { MatchService } from '../matches/shared/match.service';

@Component({
  styleUrls: ['./admin.component.scss'],
  templateUrl: './admin.component.html',
  selector: 'admin',
})
export class AdminComponent implements OnInit {
  matches: IMatch[];
  count: number;
  page: number;
  maxPage: number;
  loading: boolean = false;
  isFormShown: boolean = false;

  ibmButton: 'secondary';
  isExpressive: false;
  size: 'normal';

  constructor(
    private matchService: MatchService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.matchService
      .getMatches(this.route.snapshot.queryParams['page'])
      .subscribe((data: any) => {
        this.matches = data.matches;
        this.count = data.count;
        this.maxPage = Math.ceil(this.count / 10);
        this.page = this.route.snapshot.queryParams['page'] || 1;
        if (this.page <= 0 || this.page > this.maxPage) {
          this.router.navigate(['/admin'], { queryParams: { page: 1 } });
        }
      });
  }

  showForm() {
    this.router.navigate(['/admin/add-match']);
  }

  toTheNextPage() {
    this.loading = true;
    this.matchService.getMatches(+this.page + 1).subscribe((data: any) => {
      this.matches = data.matches;
      this.count = data.count;
      this.maxPage = Math.ceil(this.count / 10);
      this.page = this.page > this.maxPage ? this.maxPage : +this.page + 1;
      this.router.navigate([`/admin`], { queryParams: { page: this.page } });
      this.loading = false;
    });
  }

  toThePrevPage() {
    this.loading = true;
    this.matchService.getMatches(+this.page - 1).subscribe((data: any) => {
      this.matches = data.matches;
      this.count = data.count;
      this.maxPage = Math.ceil(this.count / 10);
      this.page = this.page > 1 ? +this.page - 1 : 1;
      this.router.navigate([`/admin`], { queryParams: { page: this.page } });
      this.loading = false;
    });
  }
}
