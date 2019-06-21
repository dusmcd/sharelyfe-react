const categories = [
  { name: 'Parking' },
  { name: 'Recreation' },
  { name: 'Music' },
  { name: 'Social' },
]

const users = [
  {
    username: 'dusmcd',
    firstName: 'Dustin',
    lastName: 'McDowell',
    password: '1234',
    phone: '555-5555',
    email: 'dustin@email.com',
  },
  {
    username: 'jradford',
    firstName: 'Jordan',
    lastName: 'Radford',
    password: '1234',
    phone: '444-44444',
    email: 'jordan@email.com',
  },
  {
    username: 'bobsmith',
    firstName: 'Bob',
    lastName: 'Smith',
    password: '1234',
    phone: '555-5555',
    email: 'bob@email.com',
  },
  {
    username: 'helgap',
    firstName: 'Helga',
    lastName: 'Petaki',
    password: '1234',
    phone: '777-7777',
    email: 'helga@email.com',
  },
  {
    username: 'jwindsor',
    firstName: 'Jane',
    lastName: 'Windsor',
    password: '1234',
    phone: '555-5555',
    email: 'mswindsor@email.com',
  },
]

const posts = [
  {
    imageUrl:
      'https://urbanmatter.com/chicago/wp-content/uploads/2015/07/Hotel-Parking.jpg',
    title: 'Parking for Something Else',
    description: "You're going to like the way you park. I guarantee it",
    price: 7,
    address: '351 E Center Street',
    city: 'Provo',
    state: 'UT',
    zipcode: '84606',
  },
  {
    imageUrl: 'http://www.carfab.com/wp-content/uploads/2017/04/parking.png',
    title: 'Parking for Concert',
    description: 'Only cool people park here. You are cool, right??',
    price: 6,
    address: '351 E Center Street',
    city: 'Provo',
    state: 'UT',
    zipcode: '84606',
  },
  {
    imageUrl:
      'http://cdntdreditorials.azureedge.net/cache/c/d/8/9/3/1/cd8931a86ea2b5b7a770ceae856c791942ab1e17.jpg',
    title: 'Parking for My House',
    description: 'Get of my lawn!',
    price: 8,
    address: '5020 S Lake Shore Drive',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60615',
  },
  {
    title: 'Parking for Festival',
    description: 'Call me for directions',
    price: 10,
    address: '5020 S Lake Shore Drive',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60615',
  },
  {
    title: 'Parking for Party',
    description: 'Park around the corner',
    price: 3,
    address: '5020 S Lake Shore Drive',
    city: 'Chicago',
    state: 'IL',
    zipcode: '60615',
  },
]
const endDate = new Date(2018, 10, 16)
const bookings = [
  {
    startDate: new Date(2018, 6, 15),
    endDate: endDate,
    payment: 'Cash',
    price: 7.0,
  },
  {
    startDate: new Date(2018, 6, 13),
    endDate: endDate,
    payment: 'Venmo',
    price: 7.0,
  },
  {
    startDate: new Date(2018, 6, 10),
    endDate: endDate,
    payment: 'Cash',
    price: 7.0,
  },
  {
    startDate: new Date(2018, 7, 9),
    endDate: endDate,
    payment: 'Credit Card',
    price: 7.0,
  },
  {
    startDate: new Date(2018, 8, 15),
    endDate: endDate,
    payment: 'Paypal',
    price: 7.0,
  },
]

module.exports = { categories, users, posts, bookings }
