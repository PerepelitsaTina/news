import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddNewsComponent } from '../add-news/add-news.component';
import { INews, NewsService } from '../services/news.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  selectedFile!: File;

  constructor(public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { login: string }, public userService: UserService) { }

  ngOnInit(): void {
  }

  onSave() {
    if (this.data.login.trim()) {
      this.dialogRef.close(this.data);
    } else {
      this.dialogRef.close();
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    this.userService.selectedFile = this.selectedFile;
    console.log(this.userService.selectedFile);
  }
}
