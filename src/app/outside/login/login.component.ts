import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private router: Router, private fb: FormBuilder, private service: AuthService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm () {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  doLogin() {
    const data = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.service.doLogin(data);
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
