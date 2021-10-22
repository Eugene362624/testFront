import { Component, Input, OnInit, Output } from "@angular/core";
import {HttpClient} from '@angular/common/http'
import { Observable } from "rxjs";
import { MatchService } from "./shared/match.service";

@Component({
    styleUrls: ['./matches.component.scss'],
    templateUrl: './matches.component.html',
    selector: 'match-list'
})

export class MatchesListComponent {
    @Input() match: any
    competitions: any[]
    constructor() {
    }

}
