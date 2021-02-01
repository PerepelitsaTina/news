import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { INews, NewsService } from '../services/news.service';


@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent {

  selectedFile!: File;
  isAllFilled: boolean = true;
  addNewsForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddNewsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: INews, public newsService: NewsService, private fb: FormBuilder) {
    this._createForm()
  }

  private _createForm() {
    this.addNewsForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      tags: ['', [Validators.required]]
    })
  }

  get _title() {
    return this.addNewsForm.get('title')
  }

  get _content() {
    return this.addNewsForm.get('content')
  }

  get _tags() {
    return this.addNewsForm.get('tags')
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (!this.selectedFile || this._title?.invalid || this._content?.invalid || this._tags?.invalid ||
      !this._title?.value.trim() || !this._content?.value.trim() || !this._tags?.value.trim()) {
      this.isAllFilled = false;
      return;
    }
    this.data = Object.assign(this.data, this.addNewsForm.value);
    this.dialogRef.close(this.data);
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    this.newsService.selectedFile = this.selectedFile;
    console.log(this.newsService.selectedFile);
  }

}
