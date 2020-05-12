import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { FormControl, FormGroup, Validators, FormControlDirective, FormBuilder } from '@angular/forms';
import { async } from '@angular/core/testing';
import { GeneratedFile } from '@angular/compiler';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'app works!';
  text=[]
  tweetsdata = [];
  tweetsform: FormGroup;
  palabra: FormGroup;
  formData = new FormControl("");
  datos = new FormControl("");
  nombre=new FormControl("");

  constructor(private http: Http, private formBuilder: FormBuilder) { }
  ngOnInit() {
      this.tweetsform = this.formBuilder.group({
      formData: this.formData,
      nombre:this.nombre,
      datos: this.datos
    });
  }

  async searchcall() {
    let searchquery = this.tweetsform.value;
    console.log(this.tweetsform.value.formData);

    this.http.get('http://localhost:3000/api/tweets/' + this.tweetsform.value.formData).subscribe(res => {
      this.tweetsdata.push(res.json());
      console.log(this.tweetsdata);
    });

  }

  async getFile() {
    let searchquery = this.tweetsform.value.datos;
    var data={
      "bucket": "os-educacion",
      "name": searchquery
    }


    /*this.http.post('http://localhost:3000/list', data).subscribe(res => {*/
    this.http.post('http://localhost:3000/list', data).subscribe(res => {
      this.text.push(res)
      console.log(this.text);
    });

  }
  /*respuesta=[]
  async NLUtext(){
    for (let resText of this.text){
      var textc= resText._body
    }
    var text_1 ={"text": textc}
     /* console.log(textc)*/
     /* this.http.post("http://localhost:3000/api/upload-text", text_1).subscribe(res=>{
      this.respuesta.push(res.json())
      console.log(this.respuesta)
    })
  }*/

  respuesta = []
  async NLUtext(){
    for(let texto of this.text ){
      var contenido = texto._body
    }
    var texto_1= {"text" : contenido}
    this.http.post('http://localhost:3000/api/upload-text', texto_1).subscribe(res =>{
      this.respuesta.push(res.json())
      console.log(this.respuesta)
    })
  }
}
