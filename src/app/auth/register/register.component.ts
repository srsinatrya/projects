import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    public api: ApiService,
    public router:Router
  ) { }

  ngOnInit(): void {
  }

  user:any={};

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.minLength(6), Validators.required]);
  
  hide:boolean=true;
  loading!:boolean;
  register()
  {
    this.loading=true;
    this.api.register(this.user.email, this.user.password).subscribe((res: any)=>{
      console.log(res);
      this.loading=false;
      alert('Registrasi berhasil');
      this.router.navigate(['auth/login']);
    },(err: any)=>{
      this.loading=false;
      alert('Ada masalah..')
    });

  }
}
