import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from './../../models/client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  displayedColumns = ['firstName', 'lastName', 'email'];
  dataSource: Client[];
  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.getAllClient();
  }
  getAllClient() {
    return this.clientService.getAllClient().subscribe(
      (data) => {
        this.dataSource = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
