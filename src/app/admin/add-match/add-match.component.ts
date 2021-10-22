import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatchService } from "src/app/matches/shared/match.service";

@Component({
    styleUrls: ['./add-match.component.scss'],
    templateUrl: './add-match.component.html',
    selector: 'add-match'
})

export class AddMatchComponent implements OnInit{
    constructor(private matchService: MatchService, private route: ActivatedRoute, private router: Router, protected formBuilder: FormBuilder) {
        this.newMatchForm = this.formBuilder.group({
            
        })
    }

    newMatchForm: FormGroup
    competitionName: FormControl
    seasonName: FormControl
    homeTeamName: FormControl
    awayTeamName: FormControl
    score: FormControl
    date: FormControl

    ibmButton:  "secondary"
    isExpressive: true
    size: "normal"

    // theme: select("Theme", ["dark", "light"], "dark"
	// 		size: select("Size", ["sm", "md", "xl"], "md"),
	// 		disabled: boolean("Disabled", false),
	// 		invalid: boolean("Show form validation", false),
	// 		invalidText: text("Form validation content", "Validation message here"),
	// 		warn: boolean("Show the warning state", false),
	// 		warnText: text("Text for the warning", "This is a warning"),
	// 		label: text("Label", "Text Input label"),
	// 		helperText: text("Helper text", "Optional helper text."),
	// 		placeholder: text("Placeholder text", "Placeholder text"),
	// 		autocomplete: text("autocomplete", "on")

    ngOnInit () {
        this.competitionName = new FormControl('', Validators.required)
        this.seasonName = new FormControl(null, Validators.required)
        this.homeTeamName = new FormControl('', Validators.required)
        this.awayTeamName = new FormControl('', Validators.required)
        this.score = new FormControl('')
        this.date = new FormControl('', Validators.required)

        this.newMatchForm = new FormGroup({
            competitionName: this.competitionName,
            seasonName: this.seasonName,
            homeTeamName: this.homeTeamName,
            awayTeamName: this.awayTeamName,
            score: this.score,
            date: this.date,
        })
    }

    clearNewMatchForm() {
        this.newMatchForm.reset()
    }

    hideForm( ){
        this.router.navigate(['/admin'])
    }

    saveMatch(formData) {
        this.matchService.saveMatch(formData).subscribe()
    }
}