import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router,Params, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {ReqservicesService} from '../reqservices.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  constructor(public _route:ActivatedRoute,public router:Router,public reqservice:ReqservicesService,public toastr:ToastrService,
    public location:Location){ 
  }

 public details:any={}; 
public ppl(url){
  this.reqservice.ppl(url).subscribe(
    data=>{
      this.details=data;
      console.log(this.details);
      this.pplstarred(this.details.login);
      this.pplrepos(this.details.login);
        this.pplgist(this.details.login);
        this.pplfollowers(this.details.login);
        this.followings(this.details.login);
    },
    error=>{
      console.log(error);
      console.log(error.status);
      this.router.navigate(['/err'],{ queryParams: {e: error.status } });
    }
  )
}

public logout() {
  if(localStorage.getItem('mytoken')){
    localStorage.removeItem('mytoken');
    console.log(localStorage.getItem('mytoken'));
    this.toastr.success("You are log out from the GITAPP");
    this.router.navigate(['/login']);
  }  
  
}

public sl:any;
public pplstarred(n){
  this.reqservice.pplstarrred(n).subscribe(
    data=>{
      let stararray:any=[];
      stararray=data;
      this.sl=stararray.length;
    },
    error=>{
      console.log(error);
      console.log(error.status);
      this.router.navigate(['/err'],{ queryParams: {e: error.status } });
    }
  )
}

public reposarray:any=[];
public pplrepos(r):any {
  this.reqservice.pplrepos(r).subscribe(
    data=>{
      this.reposarray=data;
      //console.log(this.reposarray);
      console.log(this.reposarray.length);
      for(let i of this.reposarray){
        console.log(i.full_name);
      }
    },
    error=>{
      console.log("Error");
      console.log(error.status);
      this.router.navigate(['/err'],{ queryParams: {e: error.status } });
    }
  )
}

public g:any=[];
public gname=[];
public pplgist(t) {
  this.reqservice.pplgist(t).subscribe(
    data=>{
      this.g = data;
      for(let i of this.g){
        console.log(i.files);
        for(let f in i.files){
          console.log(i.files[f].filename);
          this.gname.push({"name":i.files[f].filename,"link":i.html_url});
        }
      }
      console.log(this.gname);
    },
    error=>{
      console.log("error:(");
      console.log(error.status);
        this.router.navigate(['/err'],{ queryParams: {e: error.status } });
    }
  )
}

public newuser(f) {
  this.ppl(f);
}

public f:any=[];
public pplfollowers(f) {
  this.reqservice.pplfollowers(f).subscribe(
    data=>{
      this.f=data;
    },
    error=>{
      console.log("error:(");
      console.log(error.status);
      this.router.navigate(['/err'],{ queryParams: {e: error.status } });
    }
  )
}

public fw:any=[];
public followings(n) {
  this.reqservice.followings(n).subscribe(
    data=>{
      this.fw=data;
    },
    error=>{
      console.log("error:(");
      console.log(error.status);
      this.router.navigate(['/err'],{ queryParams: {e: error.status } });
    }
  )
}

public opengist(n) {
  window.open(n);
}
public gotorepo(url){
  window.open(url);
}
public contact() {
  window.open('mailto:chauhanurmi2@gmail.com');

}

public user:any;
  ngOnInit() {
    
    this._route.queryParams.subscribe((params: Params) => {
      console.log(params.ul);
      this.user=params.ul;
   });
  this.ppl(this.user);
  }
 
}
