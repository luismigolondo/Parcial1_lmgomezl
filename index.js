/*
Luis Miguel Gomez Lodno;o 201729597
Parcial 1
*/

let menu = [];

fetch('https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json')
.then(response => response.json())
.then(data => {
    menu = data;
    console.log(menu);
})

var clear = () => {
    document.getElementById("title").innerHTML = "";
    document.getElementsByClassName("menu").innerHTML = ""; 
}

var loadBurger = () => {
    clear();
    let rest = menu[0];
    document.getElementById("title").innerHTML = rest.name;
    let items = [];
    rest.products.forEach((item) => {
        items.push([
            '<div class="card" style="width: 18rem;">',
            '<img src="', item.image,'" class="card-img-top" alt="...">',
            '<div class="card-body">',
            '<h5 class="card-title">', item.name, '</h5>',
            '<p class="card-text">', item.description, '</p>',
            '<h5 class="card-title">$', item.price, '</h5>',
            '<a href="#" class="btn btn-secondary">Add to cart</a></div></div>' 

        ].join('\n'))
    })
    document.getElementsByClassName("menu").innerHTML = items.join('\n');
}

var loadTacos = () => {
    
}

var loadSalads = () => {
    
}

var loadDesserts = () => {
    
}

var loadDrinks = () => {
    
}