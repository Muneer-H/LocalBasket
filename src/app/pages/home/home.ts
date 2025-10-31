import { Component, inject } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { PageHeading } from '../../components/page-heading/page-heading';
import { Store } from '@ngrx/store';
import { Products as ProductService } from '../../services/products';
import * as Actions from '../../store/app.actions';
@Component({
  selector: 'app-home',
  imports: [Hero, PageHeading],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  categories = [
    {
      name: 'Fruits & Vegetables',
      subTag: 'Fresh Pick',
      imageURL: 'https://www.halfyourplate.ca/wp-content/uploads/2024/02/Heart-Fruit-Smaller-1024x1024.jpg',
    },
    {
      name: 'Dairy & Eggs',
      subTag: 'Farm Fresh',
      imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdGUz7Nx4YJ-nIT4KO8ON7YaccridZ4woKDQ&s',
    },
    {
      name: 'Bakery',
      subTag: 'Daily Baked',
      imageURL: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFrZXJ5JTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000',
    },
    {
      name: 'Meat & Seafood',
      subTag: 'Butcher\'s Choice',
      imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZbiM72uLieZgbZGJplHz4PyK68KyRkorPTCN0nEF6YNpWHLqRMOJHpmpbaP8QDQG4xsg&usqp=CAU',
    },
    {
      name: 'Pantry Staples',
      subTag: 'Everyday Essentials',
      imageURL: 'https://familystylefood.com/wp-content/uploads/2019/03/pantry-essentials-familystylefood.jpg',
    },
    {
      name: 'Beverages',
      subTag: 'Sip & Refresh',
      imageURL: 'https://vaya.in/wp-content/uploads/2019/03/5-protein-drinks-and-beverages-to-have-post-work-out.jpg',
    },
    {
      name: 'Snacks',
      subTag: 'Quick Bites',
      imageURL: 'https://cablevey.com/wp-content/uploads/2020/11/The-Complete-Guide-on-Snack-Foods.jpg',
    },
    {
      name: 'Household Essentials',
      subTag: 'Home Care',
      imageURL: 'https://images.stockcake.com/public/e/8/e/e8eaaa9c-63de-4629-ac68-d4481806f68c_large/modern-kitchen-tools-stockcake.jpg',
    }
  ];
  store = inject(Store);
  ngOnInit(){
    this.store.dispatch(Actions.loadCartStart());
  }
}
