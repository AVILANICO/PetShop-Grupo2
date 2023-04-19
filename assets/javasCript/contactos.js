$(document).ready(function () {
  $("#contact-form").submit(function (event) {
    event.preventDefault();
    var nombre = $("#nombre").val();
    var email = $("#email").val();
    var especie = $("#especie").val();
    var nombreMascota = $("#nombre-mascota").val();
    var mensaje = $("#mensaje").val();
    $.ajax({
      url: "enviar.php",
      type: "POST",
      data: {
        nombre: nombre,
        email: email,
        especie: especie,
        nombreMascota: nombreMascota,
        mensaje: mensaje,
      },
      success: function () {
        // Mostrar SweetAlert con el mensaje de éxito
        swal(
          "Hola " + nombre + "!",
          "Ya recibimos la información que nos diste de " +
            nombreMascota +
            ". Tu mensaje ha sido enviado con éxito.",
          "success"
        );
        // Resetear el formulario
        $("#contact-form")[0].reset();
      },
      error: function () {
        // Mostrar SweetAlert con el mensaje de error
        swal(
          "Oops...",
          "Algo salió mal. Por favor, inténtalo de nuevo más tarde.",
          "error"
        );
      },
    });
  });
});
