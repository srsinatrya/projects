import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  title:any;
  book:any={};
  books:any=[];
  constructor(
    public dialog:MatDialog
  ) { 

  }

  ngOnInit(): void {
    this.title='Daftar Anggota';
    this.book={
        Nim:'nama',
        Nama:'anjay',
        Fakultas:'Trilogi',
        Prodi:300,
    };
    this.getBooks();
  }

  getBooks()
  {
    //4. memperbarui koleksi books
    this.books=[
      {
        Nim:'1900016028',
        Nama:'Sri Rahmanda Sinatrya',
        Fakultas:'Sains dan Teknologi Terapan',
        Prodi:'Sistem Informasi',
      },
      {
        Nim:'1900016999',
        Nama:'Alexandro',
        Fakultas:'Sains dan Teknologi Terapan',
        Prodi:'Fisika',
      }
    ];
  }

  productDetail(data: any,idx: number)
 {
   let dialog=this.dialog.open(ProductDetailComponent, {
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
 deleteProduct(idx: any)
 {
   var conf=confirm('Delete item?');
   if(conf)
   this.books.splice(idx,1);
 }


}
