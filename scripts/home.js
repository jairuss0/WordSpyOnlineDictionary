// create array of object 
const reviews = [
    {
      id: 1,
      name: 'elijah jairus castalla',
      job: 'web developer',
      img: '/assets/person-1.jpg',
      text: "I'm baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry",
    },
    {
      id: 2,
      name: 'janhrey lazaro',
      job: 'web designer',
      img: '/assets/person-2.jpg',
      text: 'Helvetica artisan kinfolk thundercats lumbersexual blue bottle. Disrupt glossier gastropub deep v vice franzen hell of brooklyn twee enamel pin fashion axe.photo booth jean shorts artisan narwhal.',
    },
    {
      id: 3,
      name: 'carlo glico',
      job: 'intern',
      img: '/assets/person-3.jpg',
      text: 'Sriracha literally flexitarian irony, vape marfa unicorn. Glossier tattooed 8-bit, fixie waistcoat offal activated charcoal slow-carb marfa hell of pabst raclette post-ironic jianbing swag.',
    },
    {
      id: 4,
      name: 'rustom manalastas',
      job: 'the boss',
      img: '/assets/person-4.jpg',
      text: 'Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic. ',
    },
    {
        id: 5,
        name: 'tristan yu',
        job: 'the boss',
        img: '/assets/person-4.jpg',
        text: 'Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic. ',
    }
];

// buttons
const imgContainer = document.querySelector(".img-container");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const randomBtn = document.querySelector(".random-btn");

const img = document.getElementById("person-img");
const author = document.getElementById("author");
const job = document.getElementById("job");
const info = document.getElementById("info");
let currentItem = 0;
// load initial item
window.addEventListener('DOMContentLoaded', function(){
   showPerson(currentItem);
   
});


function showPerson(currentItem){
    
    let person = reviews[currentItem]; // access the object of the array 
    img.src = person.img;
    author.textContent = person.name;
    job.textContent = person.job;
    info.textContent = person.text;
   
}

// previous button
prevBtn.addEventListener("click",function(){
    currentItem--;
    if(currentItem < 0){
        currentItem = reviews.length - 1; // get the last person
    }
    showPerson(currentItem);
    
});
// next button
nextBtn.addEventListener("click",function(){
    currentItem++;
    if(currentItem > reviews.length - 1){
        currentItem = 0; // back to the first person
    }
    showPerson(currentItem);
    
});

randomBtn.addEventListener("click",function(){
    currentItem = Math.floor(Math.random() * reviews.length);
    showPerson(currentItem);

});



