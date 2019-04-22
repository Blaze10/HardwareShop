export class CartItem {
  productName: string;
  mainCategory: string;
  subCategory: string;
  productImage: string;
  price: number;
  companyName: string;
  count: string;
  total: number;
}

export class Order {
  orderId: string;
  userId: string;
  userName: string;
  address: string;
  contact: string;
  orders: CartItem[];
  totalPrice: number;
  orderStatus: string;
  paymentMethod: string;
  paymentStatus: string;
  cardNumber: string;
  cvv: string;
  data: Date;
}
