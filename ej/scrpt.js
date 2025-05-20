<script>

document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript cargado correctamente."); // Para probar que el script está funcionando

    document.getElementById("buscar").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            let query = this.value.trim().toLowerCase();

            // Lista de productos y sus enlaces
            let productos = {
                "pestañas nagaraku mix": "pestanas_nagaraku_mix.html",
                "pinzas nagaraku": "pinzas_nagaraku.html",
                "pegamento": "pegamento.html",
                "parches de hydrogel": "parches_hydrogel.html",
                "piedra jade": "piedrajade.html",
                "cepillo de pestaña": "cepillo_pestana.html"
            };

            if (productos[query]) {
                window.location.assign(productos[query]); // Redirige a la página del producto
            } else {
                alert("Producto no encontrado. Intenta nuevamente.");
            }
        }
    });
});
</script>