import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formCreated: FormGroup;
  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
  }

  doLogin() {
    this.router.navigate(['/dashboard']);
  }

  async ngAfterViewInit() {
    await this.loadScript('../../assets/js/vendor/modernizr-2.8.3.min.js');
    await this.loadScript('../../assets/js/vendor/jquery-2.2.4.min.js');
    await this.loadScript('../../assets/js/popper.min.js');
    await this.loadScript('../../assets/js/bootstrap.min.js');
    await this.loadScript('../../assets/js/owl.carousel.min.js');
    await this.loadScript('../../assets/js/metisMenu.min.js');
    await this.loadScript('../../assets/js/jquery.slimscroll.min.js');
    await this.loadScript('../../assets/js/jquery.slicknav.min.js');
    await this.loadScript('../../assets/js/plugins.js');
    await this.loadScript('../../assets/js/scripts.js');
  }

  loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    })
  }
}
