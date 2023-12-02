//sacando ruta de la url actual
//var ruta = window.location.pathname;

funcionalidadPaginas(fnInicio, fnProductos, fnVerCarrito, fnVerProducto);

function fnInicio() {
  console.log("inicio");

  obtenerProductos()
    .then((productos) => {
      let lstProductos = productos;
      console.table(lstProductos);
      cargarProductos(lstProductos);
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
    });

  function obtenerProductos() {
    return new Promise((resolve, reject) => {
      // Realizar la solicitud fetch al archivo JSON
      fetch("data/data.json")
        .then((response) => {
          // Verificar si la respuesta es exitosa (código de estado 200-299)
          if (!response.ok) {
            throw new Error(
              "Error en la carga del archivo JSON: " + response.status
            );
          }
          // Devolver la respuesta como JSON
          return response.json();
        })
        .then((data) => {
          // Resolver la Promise con los datos obtenidos
          resolve(data);
        })
        .catch((error) => {
          // Rechazar la Promise con el error
          reject(error);
        });
    });
  }

  function cargarProductos(productos) {
    let productosHTML = "";
    productos.forEach(function (producto) {
      productosHTML += `<div class='col-md-6 col-lg-4 my-4 row'>
                            <div class='col-4'>
                                <img class='img-fluid producto' src='${producto.imagen}' alt='${producto.nombre}'/>
                            </div>
                            <div class='col-8 d-flex flex-column'>
                                <h3 class='text-black fs-5 fw-bold text-uppercase'>
                                    ${producto.nombre}
                                </h3>
                                <p class='flex-grow-1'>
                                    ${producto.descripcion}
                                </p>
                                <p class='fs-3 text-black'>$${producto.precio}</p>
                                <a class='d-block bg-primary text-center p-2 text-uppercase text-decoration-none text-white btn-prod' href='paginas/verProducto.html?id=${producto.id}'>Ver Producto</a>
                            </div>
                        </div>`;
    });

    //Para poner los productos en el localstorage
    localStorage.setItem("lstProductos", JSON.stringify(productos));

    //Para pintar los productos en el inicio de la pagina
    document.querySelector("#idProductos").innerHTML = productosHTML;
  }
}

function fnProductos() {
  console.log("productos");
  let lstProductos = [];

  if (localStorage.getItem("lstProductos")) {
    lstProductos = JSON.parse(localStorage.getItem("lstProductos"));
  }

  cargarProductos(lstProductos);

  //Para los filtros y eventos
  document
    .querySelector("#txtNombre")
    .addEventListener("input", filtroPorNombre);
  document
    .querySelector("#txtDescripcion")
    .addEventListener("input", filtroPorDescripcion);

  function cargarProductos(productos) {
    //Recorrer los productos
    let productosHTML = "";
    productos.forEach(function (producto) {
      productosHTML += `<div class="col-md-6 col-lg-4 my-4 row">
                          <div class="col-4">
                            <img
                            class="img-fluid producto"
                            src="../${producto.imagen}"
                            alt="producto de ${producto.nombre}"/>
                          </div>
                          <div class="col-8 d-flex flex-column">
                            <h3 class="text-black fs-5 fw-bold text-uppercase">
                              ${producto.nombre}
                            </h3>
                            <p class="flex-grow-1">
                              ${producto.descripcion}
                            </p>
                            <p class="fs-3 text-black">$${producto.precio}</p>
                            <a
                              class="d-block bg-primary text-center p-2 text-uppercase text-decoration-none text-white btn-prod"
                              href="../paginas/verProducto.html?id=${producto.id}"
                              >Ver Producto</a>
                          </div>
                        </div>`;
    });
    document.querySelector("#lstProductos").innerHTML = productosHTML;
  }

  function filtroPorNombre() {
    if (document.querySelector("#txtDescripcion").value.length > 0) {
      let filtroXDescripcion = lstProductos.filter((producto) => {
        return producto.descripcion
          .toLowerCase()
          .includes(
            document.querySelector("#txtDescripcion").value.toLowerCase().trim()
          );
      });

      let filtroXnombre = filtroXDescripcion.filter((producto) => {
        return producto.nombre
          .toLowerCase()
          .includes(
            document.querySelector("#txtNombre").value.toLowerCase().trim()
          );
      });
      cargarProductos(filtroXnombre);
    } else {
      let filtroXnombre = lstProductos.filter((producto) => {
        return producto.nombre
          .toLowerCase()
          .includes(
            document.querySelector("#txtNombre").value.toLowerCase().trim()
          );
      });
      cargarProductos(filtroXnombre);
    }
  }

  function filtroPorDescripcion() {
    debugger;
    if (document.querySelector("#txtNombre").value.length > 0) {
      let filtroXnombre = lstProductos.filter((producto) => {
        return producto.nombre
          .toLowerCase()
          .includes(
            document.querySelector("#txtNombre").value.toLowerCase().trim()
          );
      });

      filtroXDescripcion = filtroXnombre.filter((producto) => {
        return producto.descripcion
          .toLowerCase()
          .includes(
            document.querySelector("#txtDescripcion").value.toLowerCase().trim()
          );
      });
      cargarProductos(filtroXDescripcion);
    } else {
      let filtroXDescripcion = lstProductos.filter((producto) => {
        return producto.descripcion
          .toLowerCase()
          .includes(
            document.querySelector("#txtDescripcion").value.toLowerCase().trim()
          );
      });
      cargarProductos(filtroXDescripcion);
    }
  }
}

function fnVerCarrito() {
  console.log("Ver Carrito");
  let carritoHTML = "";
  if (lstCarrito.productos.length > 0) {
    lstCarrito.productos.forEach(function (carrito) {
      carritoHTML += `<div class="carrito d-flex align-items-center">
                        <div class="p-2">
                          <input type="checkbox" checked data-id="${
                            carrito.id
                          }"/>
                        </div>                        
                        <img src="../${carrito.imagen}" alt="Producto 1" />
                        <p class="p-2">${carrito.descripcion}</p>
                        <div>
                          <h5>${carrito.nombre}</h5>
                          <p>Precio: $${carrito.precio}</p>
                          <p>Cantidad: ${carrito.cantidad}</p>
                        </div>
                        <div class="p-2">
                          ${carrito.cantidad * carrito.precio}
                        </div>
                        <span class="eliminar">
                          <i class="bi bi-trash"></i>
                        </span>
                      </div>`;
    });

    carritoHTML += `<div class="total">
                      <p>Total: $<span id="total">${lstCarrito.total}</span> </p>                      
                    </div>`;

    document.querySelector("#carrito").innerHTML = carritoHTML;
    detalleCarrito(lstCarrito.productos);

    //Agregar evento al checkbox
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');

    //recorrer los input checkbox
    checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener("change", function (event) {
        let idChecked = [];
        //Para obtener los checbox que tiene checked
        document
          .querySelectorAll('input[type="checkbox"]:checked')
          .forEach(function (checkbox) {
            let id = checkbox.getAttribute("data-id");
            idChecked.push(Number(id));
          });
        //Obtener la lista que contenga los checked
        let lstChecked = lstCarrito.productos.filter((carrito) =>
          idChecked.includes(carrito.id)
        );

        let total = carritoTotalPrecio(lstChecked);
        document.querySelector("#total").innerHTML = total;
        detalleCarrito(lstChecked);
      });
    });

    //Para poner en los productos seleccionados y total
    function detalleCarrito(lstChecked) {
      let detalleHTML = "";
      if (lstChecked.length > 0) {
        detalleHTML = `<p class="text-center">
                            Subotal(${
                              lstChecked.length
                            } producto(s)):<strong>$${
          document.querySelector("#total").innerHTML
        }</strong>
                        </p>`;

        detalleHTML +=
          '<div class="text-center"><button class="bg-primary text-center p-2 text-uppercase text-decoration-none text-white btn-prod">Proceder al pago</button></div>';
      } else {
        detalleHTML = `<h5 class="text-center">no hay productos seleccionados</h5>`;
      }
      document.querySelector("#detalleCarrito").innerHTML = detalleHTML;
    }
  }
}

function fnVerProducto() {
  console.log("Ver Producto");
  console.log("productos");
  //Para obtener le id del producto de la URL
  let queryString = window.location.search;
  let params = new URLSearchParams(queryString);
  let id = params.get("id");
  //Variable local para guardar los productos
  let lstProductos = [];

  //Verificar el localStorage
  if (localStorage.getItem("lstProductos")) {
    lstProductos = JSON.parse(localStorage.getItem("lstProductos"));
    let productoPorId = lstProductos.find((producto) => {
      return producto.id === Number(id);
    });
    console.table(lstProductos);
    console.table(productoPorId);

    let verProductoHTML = `<div class="row justify-content-center align-items-center">
                            <div class="col-md-7">
                              <div id="indicadores" class="carousel slide" data-bs-ride="carousel">
                              <div class="carousel-indicators">
                              <button
                                class="active"
                                type="button"
                                data-bs-target="#indicadores"
                                data-bs-slide-to="0">
                              </button>
                              <button
                                type="button"
                                data-bs-target="#indicadores"
                                data-bs-slide-to="1">
                              </button>
                              <button
                                type="button"
                                data-bs-target="#indicadores"
                                data-bs-slide-to="2">
                              </button>
                              <button
                                type="button"
                                data-bs-target="#indicadores"
                                data-bs-slide-to="3">
                              </button>
                              </div>
                              <div class="carousel-inner">
                              <div class="carousel-item active">
                                <img src="${productoPorId.galeria[0]}" alt="" class="d-block w-100" />
                              </div>
                              <div class="carousel-item">
                                <img src="${productoPorId.galeria[1]}" alt="" class="d-block w-100" />
                              </div>
                              <div class="carousel-item">
                                <img src="${productoPorId.galeria[2]}" alt="" class="d-block w-100" />
                              </div>
                              <div class="carousel-item">
                                <img src="${productoPorId.galeria[3]}" alt="" class="d-block w-100" />
                              </div>
                              <button
                                type="button"
                                class="carousel-control-prev"
                                data-bs-target="#indicadores"
                                data-bs-slide="prev">
                                <span class="carousel-control-prev-icon"></span>
                              </button>
                              <button
                                type="button"
                                class="carousel-control-next"
                                data-bs-target="#indicadores"
                                data-bs-slide="next">
                                <span class="carousel-control-next-icon"></span>
                              </button>
                              </div>
                            </div>
                            </div>
                            <div class="col-md-7 mt-5">
                                <h2 class="text-center fw-bold">${productoPorId.nombre}</h2>
                                <p class="mt-5 fs-5">
                                    ${productoPorId.descripcion}
                                </p>

                                <p class="mt-5 fs-5 fw-bold">
                                    ${productoPorId.titulo}
                                </p>
                                <p class="mt-5 fs-5">
                                    ${productoPorId.caracteristicas[0]}
                                </p>
                                <p class="mt-5 fs-5">
                                    ${productoPorId.caracteristicas[1]}
                                </p>
                                <p class="fw-bold text-primary fs-3 text-center">$${productoPorId.precio}</p>
                                <form class="row">
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label for="cbCantidad" class="form-label fw-bold">Cantidad</label>
                                            <select
                                                class="form-control"
                                                name="cboCantidad"
                                                id="cboCantidad">        
                                                    <option value="">--Seleccionar--</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                            </select>
                                        </div>                                        
                                    </div>
                                    <div class="col-12 mt-3 d-grid">
                                        <input
                                            type="submit"
                                            value="Agregar"
                                            id="btnAgregar"
                                            data-id="${productoPorId.id}"
                                            class="btn btn-primary px-4 text-white fw-bold"
                                        />                                        
                                    </div>
                                </form>
                            </div>                           
                            </div>`;
    document.querySelector("#verProductoDetail").innerHTML = verProductoHTML;
  }

  //Para agregar evento click al boton agregar
  let btnAgregar = document.querySelector("#btnAgregar");
  btnAgregar.addEventListener("click", function (event) {
    event.preventDefault();
    if (document.querySelector("#cboCantidad").value === "") {
      alert("Ingrese una cantidad");
      return;
    }
    let id = btnAgregar.getAttribute("data-id");
    let productoAdd = lstProductos.find((producto) => {
      return producto.id === Number(id);
    });
    if (productoAdd) {
      let productoExistente = lstCarrito.productos.find((producto) => {
        return producto.id === productoAdd.id;
      });

      if (productoExistente) {
        productoExistente.cantidad +=
          Number(document.querySelector("#cboCantidad").value) || 0;
        lstCarrito.cantidad +=
          Number(document.querySelector("#cboCantidad").value) || 0;
      } else {
        lstCarrito.productos.push({
          id: productoAdd.id,
          nombre: productoAdd.nombre,
          descripcion: productoAdd.descripcion,
          precio: productoAdd.precio,
          imagen: productoAdd.imagen,
          galeria: productoAdd.galeria,
          titulo: productoAdd.titulo,
          caracteristicas: productoAdd.caracteristicas,
          cantidad: Number(document.querySelector("#cboCantidad").value) || 0,
        });
        lstCarrito.cantidad +=
          Number(document.querySelector("#cboCantidad").value) || 0;
      }

      //Para sacar el total del carrito
      let total = 0;
      lstCarrito.productos.forEach((producto) => {
        total += producto.cantidad * producto.precio;
      });

      lstCarrito.total = total;

      //actualizando localstorage de carrito
      localStorage.setItem("lstCarrito", JSON.stringify(lstCarrito));

      //Para mostrar una notificacion que se agrego correctamente el producto
      alert(
        `Se agrego correctamente el producto:\nNombre: ${
          productoAdd.nombre
        }\nCantidad: ${Number(document.querySelector("#cboCantidad").value)}`
      );

      crearCoffeti();

      //Para actualizar la cantidad en el icono del carrito de compras
      document.querySelector("#cantidadCarrito").innerText =
        lstCarrito.cantidad;
    }
  });
}
