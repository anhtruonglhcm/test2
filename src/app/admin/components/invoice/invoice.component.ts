import { Component, OnInit, ViewChild } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  isLoading = false;
  isHaveData = false;
  resultLength = 0;
  sortField: string;
  sortDir: string;
  page = 1;
  perPage = 10;
  filter: string;
  displayedColumns: string[] = [
    'index',
    'item',
    'price',
    'qty',
    'date',
    'action',
  ];
  dataSource2: Invoice[];
  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.getInvoice();
  }
  getInvoice() {
    this.isLoading = true;
    return this.invoiceService
      .getInvoice({
        page: 1,
        perPage: 10,
        sortField: this.sortField,
        sortDir: this.sortDir,
        filter: this.filter,
      })
      .subscribe(
        (data) => {
          this.dataSource2 = data.docs;
          this.resultLength = data.totalDocs;
          this.isHaveData = true;
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.snackbar.open('false', 'Load Data', { duration: 3000 });
        }
      );
  }
  createInvoice() {
    this.router.navigate(['admin/invoice/create']);
  }
  deleteInvoice(id: string) {
    return this.invoiceService.deleteInvoice(id).subscribe(
      (data) => {
        const data2 = this.dataSource2.filter((item) => item._id !== data._id);
        this.dataSource2 = [...data2];
        this.resultLength = this.resultLength - 1;
      },
      (error) => {
        this.snackbar.open('false', 'Delete Invoice', { duration: 3000 });
      }
    );
  }
  updateInvoice(id) {
    this.router.navigate(['admin', 'invoice', id]);
  }
  onPageChanged(e) {
    this.isLoading = true;
    this.page = ++e.pageIndex;
    this.perPage = e.pageSize;
    return this.invoiceService
      .getInvoice({
        page: this.page,
        perPage: this.perPage,
        sortField: this.sortField,
        sortDir: this.sortDir,
        filter: this.filter,
      })
      .subscribe(
        (data) => {
          this.isLoading = false;
          this.dataSource2 = data.docs;
        },
        (error) => {
          this.isLoading = false;
          this.snackbar.open('false', 'Get Invoice', { duration: 3000 });
        }
      );
  }
  sortData(sort: Sort) {
    this.sortField = sort.active;
    this.sortDir = sort.direction;
    return this.invoiceService
      .getInvoice({
        page: this.page,
        perPage: this.perPage,
        sortField: this.sortField,
        sortDir: this.sortDir,
        filter: this.filter,
      })
      .subscribe(
        (data) => {
          this.dataSource2 = data.docs;
        },
        (error) => {
          this.snackbar.open('false', 'Get Invoice', { duration: 3000 });
        }
      );
  }
  filterChange(filter: string) {
    this.filter = filter.trim();
    return this.invoiceService
      .getInvoice({
        page: this.page,
        perPage: this.perPage,
        sortField: this.sortField,
        sortDir: this.sortDir,
        filter: this.filter,
      })
      .subscribe(
        (data) => {
          this.dataSource2 = data.docs;
          this.resultLength = data.totalDocs;
        },
        (error) => {
          this.snackbar.open('false', 'Get Invoice', { duration: 3000 });
        }
      );
  }
}
