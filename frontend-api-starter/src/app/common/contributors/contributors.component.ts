import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Contributor } from 'src/app/model/contributor';
import { ContributorsService } from 'src/app/service/contributors.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contributors',
  templateUrl: './contributors.component.html',
  styleUrls: ['./contributors.component.scss']
})
export class ContributorsComponent implements OnInit {

  currentPage: number = 1;
  itemsPerPage: number = 25;
  nextPagePercentLimit: number = 70;

  datas$: Observable<Contributor[]> =
    this.contributorsService.getPerPage(this.currentPage, this.itemsPerPage);
  contributors: Contributor[] = [];

  constructor(
    private contributorsService: ContributorsService,
    private toastr: ToastrService,
  ) {
    this.datas$.subscribe(
      data => {
        this.contributors = data
          .sort( (a, b) => b['contributions'] - a['contributions'] );
      },
      error => this.showError(error)
    );
  }

  ngOnInit(): void {
  }

  showError(message: string) {
    this.toastr.error(message);
  }

  onScroll(event: Event): any {
    const div = (event.target) as HTMLElement;

    const currentHeightOfElement = div.scrollHeight;
    const currentStartOfElement = div.scrollTop;
    const clientHeight = div.clientHeight;

    const nextPageHeightLimit = currentHeightOfElement * (this.nextPagePercentLimit / 100);

    const conditionOfRemove = currentHeightOfElement - clientHeight;

    if( currentStartOfElement >= nextPageHeightLimit ) {
      this.currentPage++;

      this.contributorsService
        .getPerPage(this.currentPage, this.itemsPerPage)
        .subscribe(
          data => {
            this.contributors = this.contributors.concat( data
              .sort( (a, b) => b['contributions'] - a['contributions'] ) );
          },
          error => this.showError(error)
        );
    }

    if(currentStartOfElement === conditionOfRemove) {
      console.log("End of the onScroll method.");
      // div.removeEventListener("scroll", this.onScroll, true);
      // delete this.onScroll(event);
    }

  }

}
