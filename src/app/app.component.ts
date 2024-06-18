import { Component, AfterViewInit } from '@angular/core';
import { StorageService } from './auth-services/storage-services/storage.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'FrontEnd';
  isAdminLoggedIn: boolean = false;
  isCustomerLoggedIn: boolean = false;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
        this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();
      });
  }

  logout(){
    StorageService.signout();
    this.router.navigateByUrl("/login");
  }
}
