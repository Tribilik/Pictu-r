import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Picture } from '../picture/picture';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class PictureStore {

  static PROVIDERS = [
    PictureStore
  ];

  // URL to web API

  private picturesUrl = '/api/v1/users/1/pictures';

  constructor(private http: Http) {
    console.log('hello `PictureStore` class');
  }

  uploadPicture(picture: Picture): Promise<Picture> {
    console.log('Upload : ', picture);

    let body = JSON.stringify(picture);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.picturesUrl, body, options)
      .toPromise()
      .then(this._extractData)
      .catch(this._handleError);
  }

  pictureList(): Promise<Picture[]> {
    return this.http.get(this.picturesUrl)
      .toPromise()
      .then(this._extractData)
      .catch(this._handleError);
  }


  private _extractData(res: Response) {

    let body = res.json();
    let pictureReceived =  {id: body.id, title: body.title, url: body.url};
    return pictureReceived || {};
  }

  /**
   *
   * @param file
   *
   */

  handleFileSelect(file) {

    // console.log('_handleFileSelect');

    if (!file) {
      return Promise.reject(null);
    }

    // Only process image files.

    if (!file.type.match('image.*')) {
      return Promise.reject(null);
    }

    let fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    return new Promise((resolve, reject) => {
      fileReader.addEventListener('load', () => {
        resolve(fileReader.result);
      },  false);
    });
  }


  private _handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Promise.reject(errMsg);
  }


}

