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

  datas$: Observable<Contributor[]> = this.contributorsService.getAll();
  contributors: Contributor[] = [];

  slicedArray: Contributor[] = [];

  itemsPerPage: number = 25;
  nextPagePercentLimit: number = 70;
  numberOfCurrentItems: number = 0;

  constructor(
    private contributorsService: ContributorsService,
    private toastr: ToastrService,
  ) {

    this.numberOfCurrentItems = this.itemsPerPage;

    this.datas$.subscribe(
      data => {
        this.contributors = data
          .sort( (a, b) => b['contributions'] - a['contributions'] );
      },
      error => this.showError(error)
    );

    setTimeout(() => {
      this.slicedArray = this.contributors.slice(0, this.numberOfCurrentItems);
    }, 800);

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
      this.numberOfCurrentItems += this.itemsPerPage;
      this.slicedArray = this.contributors.slice(0, this.numberOfCurrentItems);
    }

    if(currentStartOfElement === conditionOfRemove) {
      console.log("End of the onScroll method.");
      // div.removeEventListener("scroll", this.onScroll, true);
      // delete this.onScroll(event);
    }

  }

}
