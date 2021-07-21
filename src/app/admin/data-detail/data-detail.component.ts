import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-data-detail',
  templateUrl: './data-detail.component.html',
  styleUrls: ['./data-detail.component.scss']
})
export class DataDetailComponent implements OnInit {
  dialogref: any;

  constructor(
    public dialogRef:MatDialogRef<DataDetailComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any,
   public api:ApiService

  ) { }

  ngOnInit(): void {
  }
loading:boolean | undefined;
  saveData()
  {
    this.loading=true;
   if(this.data.id == undefined)
   {
   this.api.post('books',this.data).subscribe(result=>{
    this.dialogRef.close(this.data);
    this.loading=false;
   },eror=>{
     this.loading=false;
     alert('Tidak dapat menyimpan data');
   });
 }else{
   this.api.put('books/'+this.data.id,this.data).subscribe(result=>{
     this.dialogRef.close(result);
     this.loading=false;
   },eror=>{
    this.loading=false;
    alert('Tidak dapat memperbaharui data');
   })
  }
}
}
