import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'; 
@Component({
  selector: 'app-users-list',
  standalone: false,
  templateUrl: './users-list.html',
  styleUrls: ['./users-list.scss'],
})
export class UsersList {
  constructor( private translate: TranslateService) {
     console.log(this.translate.instant('dashboard')); 
  }
}
