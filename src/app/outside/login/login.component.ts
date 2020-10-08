import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  sttAdd: boolean = true;
  sttNotifi = false;
  sttTextNotifi = 'toast-success';
  sttLoading: boolean = false;
  textNotifi: string;

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

  dismissToast() {
    this.sttNotifi = false;
  }

  doLogin() {
    const data = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.service.doLogin(data).then(() => {
      window.location.href = "/dashboard";
        this.sttLoading = false;
        this.sttNotifi = true;
        this.textNotifi = "ggg";
        this.sttTextNotifi = 'toast-success';
    }).catch(error => {
      this.sttLoading = false;
      this.sttNotifi = true;
      this.textNotifi = "!!!";
      this.sttTextNotifi = 'toast-error';
    })
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
