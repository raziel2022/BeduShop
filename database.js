const mongoose = require("mongoose")
const db = 'BeduShop';
const dbUser = 'kain87';
const dbPass = '...qwe123';
const uri= `mongodb+srv://${dbUser}:${dbPass}@cluster0.obolh5v.mongodb.net/${db}?retryWrites=true&w=majority`;

mongoose.connect(uri);

const ProductoSchema=mongoose.Schema
({
    nombre: {type: String, require: true},
    caracteristica: {type: String},
    precio: Number,
    desc: String
},{
    collection: "Productos",
    timestamps: true
})


const Producto= mongoose.model("Producto",ProductoSchema);

//funcion para traer todos los productos
function obtenerProductos(){
Producto.find()
.then( data =>console.log(data) )
}

//creamos una nueva funcion para agrega producos
function crearProducto(producto){
    const prod= new Producto(producto);// nueva instanacia para crar un nuevo producto le pasamos el modelo
    prod.save()
    .then(res=>console.log(res))
}

//agregando informacion a la base de datos
const info=({
    nombre:"silla",
    caracteristica: "3 patas",
    precio: 200,
})

// crearProducto(info);//llamamos a la funcion crar protucos

//obtenerProductos() //obtiene todos los productos

//funcion de consulta con precio menor de 40
function queryProducto(precio){
    const query = {
        'precio': {
          '$lte': precio
        }
      }
Producto.find(query)
.then(data=> console.log(data))
    }

    // queryProducto(40);

/// consulta con  agregacion por precio y luego ordenado de mayor a menor 

function agregacion(precio){
    const agr =
    [
        {
          '$project': {
            '_id': -1, 
            'nombre': 1, 
            'precio': 1
          }
        }, {
          '$match': {
            'precio': {
              '$lte': precio
            }
          }
        }, {
          '$sort': {
            'precio': -1
          }
        }
      ]
      Producto.aggregate(agr)
      .then(data=>console.log(data))
}

agregacion(50);