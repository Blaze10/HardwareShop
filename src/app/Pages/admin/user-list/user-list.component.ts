import { SnackbarService } from './../../../_services/snackbar.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { User } from 'src/app/_models/user.model';
import { UserService } from './../../../_services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DeleteConfirmationDialogComponent } from 'src/app/delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  usersList: User[] = [];
  showSpinner = false;
  singleUser: User;
  constructor(private usersService: UserService, private snackBar: SnackbarService,
              private matDialog: MatDialog) { }
  displayedColumns = ['srno', 'name', 'email', 'contact', 'address', 'remove'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.showSpinner = true;
    this.usersService.getAllUsers().snapshotChanges().subscribe(item => {
      this.usersList = [];
      item.forEach(element => {
        this.singleUser = element.payload.toJSON() as User;
        this.singleUser.$key = element.key;
        this.usersList.push(this.singleUser);
      });
      this.dataSource = new MatTableDataSource(this.usersList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.showSpinner = false;
    }, err => {
      console.log(err);
      this.showSpinner = false;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDeleteUser(key) {
    const dialogRef = this.matDialog.open(DeleteConfirmationDialogComponent, {
      width: '300px',
      data: {title: 'User'}
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.showSpinner = true;
      if (result === 'Confirm') {
        this.usersService.removeUser(key)
        .then(() => {
          this.showSpinner = false;
          this.snackBar.showSnack('User removed successfully');
          this.usersList = [];
          this.getUserList();
        })
        .catch((err) => {
          this.showSpinner = false;
          console.log(err);
        });
      } else {
        this.showSpinner = false;
        this.snackBar.showSnack('Cancelled');
      }
    });
  }


}
