/*
Luis Miguel Gomez Lodno;o 201729597
Parcial 1
*/

let menu = [];
let cart = [];

fetch('https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json')
    .then(response => response.json())
    .then(data => {
        menu = data;
    });

var clear = () => {
    document.getElementById("title").innerHTML = "";
    document.getElementById("menu").innerHTML = "";
}

var recalculateItems = () => {
    document.getElementById("numItems").innerHTML = numeroItems() + " Items";
}

var numeroItems = () => {
    return Object.keys(cart).length;
}

var load = (index) => {
    clear();
    let rest = menu[index];
    document.getElementById("title").innerHTML = rest.name;
    let items = [];
    rest.products.forEach((item) => {
        items.push([
            '<div class="col-3 card" style="width: 18rem;">',
            '<img src="', item.image, '" class="card-img-top" alt="...">',
            '<div class="card-body">',
            '<h5 class="card-title">', item.name, '</h5>',
            '<p class="card-text">', item.description, '</p>',
            '<h5 class="card-title">$', item.price, '</h5>',
            '<a href="', "javascript:agregar('", item.name, "',", index, ')" class="btn btn-secondary">Add to cart</a></div></div>'

        ].join('\n'))
    });
    document.getElementById("menu").innerHTML = items.join('\n');
}

var agregar = (name, index) => {
    let producto = buscar(name, index);
    if (buscarCart(name)) {
        producto.quantity = producto.quantity + 1;
    } else {
        producto.item = numeroItems() + 1;
    }
    cart[name] = producto;
    recalculateItems();
}

var buscarCart = (name) => {
    if (cart[name] != null) {
        return true;
    }
    return false;
}

var buscar = (name, index) => {
    let rest = menu[index];
    let producto = {};
    rest.products.forEach((item) => {
        if (item.name == name && cart[name] == null) {
            producto = {
                "item": 0,
                "quantity": 1,
                "description": item.name,
                "unitPrice": item.price,
            };
        } else if (item.name == name && cart[name] != null) {
            producto = cart[name];
        }
    });
    return producto;
}

var loadDetail = () => {
    clear();
    document.getElementById("title").innerHTML = "Order detail";
    let table = [
        '<table class="table table-striped"><thead><tr><th scope="col">Item</th><th scope="col">Qty</th><th scope="col">Description</th><th scope="col">Unit Price</th><th scope="col">Amount</th></tr></thead><tbody>'
    ];
    let sumTotal = 0;
    for (let i in cart) {
        let prod = cart[i];
        let total = prod.unitPrice * prod.quantity;
        table.push([
            '<tr>',
            '<th scope="row">', prod.item, '</th>',
            '<th>', prod.quantity, '</th>',
            '<th>', prod.description, '</th>',
            '<th>', prod.unitPrice, '</th>',
            '<th>', total , '</th>',
            '</tr>'
        ].join('\n'));
        sumTotal += total;
    }
    table.push('</tbody></table><p><b>Total: $' + sumTotal + '</b></p>');
    table.push('<button type="button" class="btn btn-danger" data-toggle="modal" data-target="#cancelModal">Cancel</button>');
    table.push('<button type="button" class="btn btn-success" onclick="logCart()">Confirm order</button>');
    table.push('<div class="modal fade" id="cancelModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title" id="exampleModalLabel">Cancel the order</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body"> Are you sure about canceling this order? </div> <div class="modal-footer"> <button type="button" class="btn btn-secondary" data-dismiss="modal">No, I want to continue adding products</button> <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="resetCart()">Yes, I want to cancel the order</button> </div> </div> </div></div>');
    document.getElementById("menu").innerHTML = table.join('\n');

}

var logCart = () => {
    console.log(cart);
}

var resetCart = () => {
    cart = [];
    loadDetail();
}