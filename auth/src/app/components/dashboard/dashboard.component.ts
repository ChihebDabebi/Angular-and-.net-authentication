import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  public users : any = [];
  public fullname : string = "";
  status = false;
  addToggle()
  {
    this.status = !this.status;       
  }
constructor(private auth : AuthService, private api : ApiService , private userStore : UserStoreService){

}
ngOnInit(){
  this.api.getUsers()
  .subscribe(res=>{
    this.users = res ;
  })

  this.userStore.getFullNameFromStore()
  .subscribe(val=>{
    let fullNameFromToken = this.auth.getFullNameFromToken();
    this.fullname = val || fullNameFromToken
  })
}
logout(){
  this.auth.signOut();
}
}
