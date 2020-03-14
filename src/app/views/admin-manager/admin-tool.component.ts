import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { LstClientService } from 'app/services/lstClient.service';
import { ClientProfile } from 'app/model/client-profile.model';

@Component({
  selector: 'app-admin-tool',
  templateUrl: './admin-tool.component.html',
  styleUrls: ['./admin-tool.component.scss']
})
export class AdminToolComponent implements OnInit {
  
  displayedColumns = ['userCode', 'username', 'firstName', 'lastName', 
  'phone', 'statusDisplay', 'rightDisplay', 'createdDate'];
  dataSource = new MatTableDataSource<ClientProfile>(ELEMENT_DATA);

  ngOnInit(){

  }

  constructor(private _lstClient: LstClientService){
    this.getLstUser(1);
  }

  private getLstUser(page: number) {
    this._lstClient.getLstUser(page).subscribe ( res => {
      this.dataSource.data = res.result.data;
    })
  }

}

const ELEMENT_DATA: ClientProfile[] = [
];
