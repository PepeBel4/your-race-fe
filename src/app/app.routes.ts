import { Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { CallbackComponent } from './callback/callback.component';

export const ROUTES: Routes = [{
  path: '', redirectTo: 'app', pathMatch: 'full'
  }, 
    { path: 'app',   loadChildren: './layout/layout.module#LayoutModule' },
    { path: 'callback', component: CallbackComponent },
    { path: 'login', loadChildren: './login/login.module#LoginModule' }, 
    { path: 'error', component: ErrorComponent }, 
    { path: 'presenter', loadChildren: './presenter/presenter.module#PresenterModule' },
    { path: '**',    component: ErrorComponent }
];
