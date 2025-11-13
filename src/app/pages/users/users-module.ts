import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing-module';
import { UsersList } from './users-list/users-list';

@NgModule({
  declarations: [UsersList],
  imports: [CommonModule, UsersRoutingModule],
})
export class UsersModule {}
