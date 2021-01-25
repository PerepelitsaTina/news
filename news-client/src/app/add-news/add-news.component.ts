import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { INews, NewsService } from '../services/news.service';


@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent {

  selectedFile!: File;
  isAllFilled: boolean = true;

  constructor(public dialogRef: MatDialogRef<AddNewsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: INews, public newsService: NewsService) { 
      
    }

    onCancel(): void {
      this.dialogRef.close();
    }

    onSave(): void {
      if(this.selectedFile && 
      Object.values(this.data)
      .filter(item => typeof item === 'string')
      .every(item => item.trim())) {
        this.dialogRef.close(this.data);
      } else {
        this.isAllFilled = false;
      }
    }

    onFileSelected(event: any) {
      this.selectedFile = <File>event.target.files[0];
      this.newsService.selectedFile = this.selectedFile;
      console.log(this.newsService.selectedFile);
    }

    

}
