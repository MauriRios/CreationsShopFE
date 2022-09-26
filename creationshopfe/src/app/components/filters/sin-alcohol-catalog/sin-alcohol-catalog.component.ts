import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/models/products.model';

@Component({
  selector: 'app-sin-alcohol-catalog',
  templateUrl: './sin-alcohol-catalog.component.html',
  styleUrls: ['./sin-alcohol-catalog.component.css']
})
export class SinAlcoholCatalogComponent implements OnInit {

  products : Products[] = [
    {
      id: 1,
      name: "asddd",
      marca: "fsasdasdad",
      img: "assets/img/slide.jpg",
      category: "combos",
      price: 220,
      stock: 20,
      quantity: 0,
    },
    {
      id: 2,
      name: "addd",
      marca: "fsasdad",
      img: "assets/img/slide.jpg",
      category: "combos",
      price: 220,
      stock: 20,
      quantity: 0,
    },
    {
      id: 3,
      name: "asdd",
      marca: "fasdsad",
      img: "assets/img/slide.jpg",
      category: "combos",
      price: 220,
      stock: 20,
      quantity: 0,
    },
    {
      id: 4,
      name: "asd",
      marca: "fsad",
      img: "assets/img/slide.jpg",
      category: "combos",
      price: 220,
      stock: 20,
      quantity: 0,
    }
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
