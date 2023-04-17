const socket = io();

let user
Swal.fire({
    title: "Register",
    input: "text",
    text: "User email is required",
    inputValidator: (value)=>{
        return !value && 'User email is required'
    },
    // icon: "success"
    allowOutsideClick: false
}).then(resp => {
    console.log(resp)
    user = resp.value
    socket.emit('authenticated',user)
})



socket.on('allProducts', allProducts => {
    const ul = document.querySelector('ul');
    ul.innerHTML = ""; 
    allProducts.forEach((product) => {
        const li = document.createElement('li');
        li.innerText = "Title: " + product.title + " Code: " + product.code + " Price: " + product.price;
        ul.appendChild(li);
    });
});

socket.on('allMessages', allMessages => {
    const ul = document.querySelector('ul');
    ul.innerHTML = ""; 
    allMessages.forEach((message) => {
        const li = document.createElement('li');
        li.innerText = "Email(" + message.email + "): " + message.message;
        ul.appendChild(li);
    });
});

const addProduct = function () {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const thumbnail = document.getElementById('thumbnail').value;
    const code = document.getElementById('code').value;
    const stock =  document.getElementById('stock').value;
    socket.emit('addProduct', { title, description, price, thumbnail, code, stock });
};

socket.on('errorInsert', message => {
    alert(message);
});

const addMessage = function () {
    const email = user;
    const message = document.getElementById('message').value;
    socket.emit('addMessage', { email, message });
    document.getElementById('message').value = "";
};

socket.on('newUserConnected',data=>{
    if(!user) return;
    Swal.fire({
        toast:true,
        position: 'top-end',
        showConfirmButton:false,
        timer:3000,
        title:`${data} joined to chat`,
        icon:"success"
    })
})
