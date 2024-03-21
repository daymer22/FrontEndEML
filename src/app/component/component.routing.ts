import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';

export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'users',
				component: UsersComponent
			}
		]
	}
];