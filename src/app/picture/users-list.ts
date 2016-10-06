/**
 * Created by Lilith on 05/10/2016.
 */
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { User } from '../picture/user';


export class UsersList {

  static PROVIDERS = [
    UsersList
  ];


  constructor(private http: Http) {

  }

  checkUser(user: User): Promise<User> {
    console.log('Sending user infos : ', user);

    let body = JSON.stringify(user);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post('/api/v1/users/', body, options)
      .toPromise()
      .then(this._checkStatus)
      .then(this._extractData)
      .catch(this._handleError);
  }

  private _checkStatus(response: Response) {
    if (response.status < 200 || response.status >= 300) {
      throw new Error('TODO');
    }
    return response;
  }

  private _extractData(res: Response) {
    let body = res.json();
    let userToCheck = {userId: body.userId, userPwd: body.userPwd};
    return userToCheck || {};
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