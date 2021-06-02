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
  // numberOfCurrentItems: number = 0;

  datas$: Observable<Contributor[]> =
    this.contributorsService.getPerPage(this.currentPage, this.itemsPerPage);
  contributors: Contributor[] = [];

  // slicedArray: Contributor[] = [];

  constructor(
    private contributorsService: ContributorsService,
    private toastr: ToastrService,
  ) {

    // this.numberOfCurrentItems = this.itemsPerPage;

    this.datas$.subscribe(
      data => {
        this.contributors = data
          .sort( (a, b) => b['contributions'] - a['contributions'] );
      },
      error => this.showError(error)
    );

    // setTimeout(() => {
    //   this.slicedArray = this.contributors.slice(0, this.numberOfCurrentItems);
    // }, 500);


  }

  ngOnInit(): void {
  }

  showError(message: string) {
    this.toastr.error(message);
  }

  onScroll(div: HTMLDivElement): void {
    const currentHeightOfElement = div.scrollHeight;
    const currentStartOfElement = div.scrollTop;

    const nextPageHeightLimit = currentHeightOfElement * (this.nextPagePercentLimit / 100);

    console.log("this.currentPage: ", this.currentPage);
    console.log("currentStartOfElement: ", currentStartOfElement);
    console.log("nextPageHeightLimit: ", nextPageHeightLimit);

    if( currentStartOfElement >= nextPageHeightLimit ) {
      this.currentPage++;

      this.contributorsService
        .getPerPage(this.currentPage, this.itemsPerPage)
        .subscribe(
          data => {
            this.contributors.concat( data
              .sort( (a, b) => b['contributions'] - a['contributions'] ) );
          },
          error => this.showError(error)
        );
    }
    // if(this.numberOfCurrentItems === this.contributors.length) {
    //   console.log("Vége! :)");
    // }
  }

  // onScroll(div: HTMLDivElement): void {
  //   const currentHeightOfElement = div.scrollHeight;
  //   const currentStartOfElement = div.scrollTop;

  //   const nextPageHeightLimit = currentHeightOfElement * (this.nextPagePercentLimit / 100);

  //   if( currentStartOfElement >= nextPageHeightLimit ) {
  //     this.numberOfCurrentItems += this.itemsPerPage;
  //     this.slicedArray = this.contributors.slice(0, this.numberOfCurrentItems);
  //   }
  //   if(this.numberOfCurrentItems === this.contributors.length) {
  //     console.log("Vége! :)");
  //   }
  // }

}
