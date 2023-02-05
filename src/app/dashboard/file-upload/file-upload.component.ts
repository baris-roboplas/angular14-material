import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { catchError, finalize, of } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  @Input() requiredFileType!: string;

  fileName = '';
  fileUploadError = false;
  uploadProgress!: number | null;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  byFileSelected(
    // caution: ChangeEvent is for React, not Angular. You can use Event instead
    e: Event
  ) {
    // advice: Events are propagating, target could be other elements in different type. Better to use e.currentTarget, which IS a HTMLInputElement

    const target = e.target as HTMLInputElement;
    // advice: You do not need to cast the files. When you cast the HTMLInputElement, it automatically infers the target.files type. Plus, it's dangerous to go around casting everything. The lesser you cast, the better
    const file = target.files![0];
    if (file) {
      this.fileName = file.name;

      // note: You can use the FormData API(standard browser functionality) to send files to the server. The FormData interface provides a way to construct a set of key/value pairs representing form fields and their values, which can be sent using the fetch() or XMLHttpRequest.send() method.
      // To sum up, the form data object can be used to create a form payload manually using the FormData API
      const formData = new FormData();

      // note: The append() method appends a new value onto an existing key inside a FormData object, or adds the key if it does not already exist.
      formData.append('thumbnail', file);

      this.fileUploadError = false;

      this.http
        .post('/api/thumbnail-upload', formData, {
          reportProgress: true,
          observe: 'events',
        })
        .pipe(
          catchError((err) => {
            this.fileUploadError = true;
            // semi-alternative: throwError
            return of(err);
          }),
          finalize(() => {
            this.uploadProgress = null;
          })
        )
        .subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(
              (100 * event.loaded) / event.total
            );
          }
        });
    }
  }
}
