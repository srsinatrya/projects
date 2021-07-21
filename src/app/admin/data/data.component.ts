import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { DataDetailComponent } from '../data-detail/data-detail.component';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  title:any;
  book:any={};
  books:any=[];
  constructor(
    public dialog:MatDialog,
    public api:ApiService
  ) { }

  ngOnInit(): void {
    this.title='Daftar Buku';
    this.book={
      title:'Angular untuk Pemula',
      author:'Farid Suryanto',
      publisher:'Sunhouse Digital',
      year:2020,
      isbn:'8298377474',
    };
    this.getBooks();
  }
  loading:boolean | undefined;
  getBooks()
  {
    this.loading=true;
    this.api.get('bookswithauth').subscribe(result=>{
    this.books=result;
    this.loading=false;
  },error=>{
    this.loading=false;
  })
  /*
    this.loading=true;
    this.api.get('books').subscribe(result=>{
      this.books=result; 
      this.loading=false;
    },error=>{
      this.loading=false;
      alert('Ada masalah saat pengambilan data, coba lagi!')
    })
    */
  }

  dataDetail(data: any,idx: number)
 {
   let dialog=this.dialog.open(DataDetailComponent, {
     width:'400px',
     data:data
   });
   dialog.afterClosed().subscribe(res=>{
    if(res)
    {
       //jika idx=-1 (penambahan data baru) maka tambahkan data
      if(idx==-1)this.books.push(res);      
       //jika tidak maka perbarui data  
      else this.books[idx]=data;
     }
   })
 }

 loadingDelete:any={};
deleteProduct(id: any,idx: any)
{
  
  var conf=confirm('Delete item?');
  if(conf)
  {
    this.loadingDelete[idx]=true;
    this.api.delete('books/'+id).subscribe(res => {
      this.books.splice(idx, 1);
      this.loadingDelete[idx]=false;
    },eror=>{
      this.loadingDelete[idx]=false;
      alert('Tidak dapat menghapus data');
    });

   }
 }

}
