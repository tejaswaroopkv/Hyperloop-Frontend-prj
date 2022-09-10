import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './root-components/about/about.component';

const routes: Routes = [
 { path: "admin", loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
 {path:"user", loadChildren: ()=> import("./modules/users/users.module").then(mod=>mod.UsersModule) },
 {path:"about",component:AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
