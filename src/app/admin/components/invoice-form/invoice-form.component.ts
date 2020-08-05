import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InvoiceService } from '../../services/invoice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Invoice } from '../../models/invoice';
import { Client } from './../../models/client';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css'],
})
export class InvoiceFormComponent implements OnInit {
  invoice: Invoice;
  invoiceForm: FormGroup;
  title = 'Create Invoice';
  titlebtn = 'Create';
  clients: Client[];
  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private route: ActivatedRoute,
    private clientService: ClientService
  ) {
    this.invoiceForm = this.fb.group({
      item: ['', Validators.required],
      price: ['', Validators.required],
      qty: ['', Validators.required],
      date: ['', Validators.required],
      client: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.setInvoiceToForm();
    this.setClients();
  }
  onSubmit() {
    if (this.invoice) {
      this.invoiceService
        .updateInvoice(this.invoice._id, this.invoiceForm.value)
        .subscribe(
          (data) => {
            this.router.navigate(['admin', 'invoice']);
            this.matSnackBar.open('success', 'Update Invoice', {
              duration: 3000,
            });
          },
          (error) => {
            this.router.navigate(['admin', 'invoice']);
            this.matSnackBar.open('false', 'Update Invoice', {
              duration: 3000,
            });
          }
        );
    } else {
      this.invoiceService.createInvoice(this.invoiceForm.value).subscribe(
        (data) => {
          this.router.navigate(['admin', 'invoice']);
          this.matSnackBar.open('success', 'createInvoice', {
            duration: 3000,
          });
        },
        (error) => {
          this.router.navigate(['admin', 'invoice']);
          this.matSnackBar.open('false', 'createInvoice', {
            duration: 3000,
          });
        }
      );
    }
  }
  setInvoiceToForm() {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      if (!id) {
        return;
      }
      this.title = 'Edit Invoice';
      this.titlebtn = 'Update';
      this.invoiceService.getOneInvoice(id).subscribe((invoice) => {
        this.invoice = invoice;
        this.invoiceForm.patchValue(this.invoice);
      });
    });
  }
  setClients() {
    this.clientService.getAllClient().subscribe(
      (data) => {
        this.clients = data;
      },
      (error) => {
        this.matSnackBar.open('false', 'Get Clients', { duration: 3000 });
      }
    );
  }
}
