import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
    public dialog:MatDialog
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

  getBooks()
  {
    //4. memperbarui koleksi books
    this.books=[
      {
        title:'Filsafat Ilmu',
        author:'Dr. H.M Zainudin, MA',
        publisher:'Trilogi',
        year:2020,
        isbn:'8298377474',
      },
      {
        title:'Sejarah Dunia Yang Disembunyikan',
        author:'Jonathan Black',
        publisher:'Global Elite',
        year:2020,
        isbn:'82983323455',
      }
    ];
  }

  dataDetail(data: any,idx: number)
 {
   let dialog=this.dialog.open(DataDetailComponent, {
     width:'400px',
     data:data
   });
   dialog.afterClosed().subscribe((res: any)=>{
     if(res)
     {
        //jika idx=-1 (penambahan data baru) maka tambahkan data
       if(idx==-1)this.books.push(res);      
        //jika tidak maka perbarui data  
       else this.books[idx]=res; 
     }
   })
 }
 deleteData(idx: any)
 {
   var conf=confirm('Delete item?');
   if(conf)
   this.books.splice(idx,1);
 }

}
