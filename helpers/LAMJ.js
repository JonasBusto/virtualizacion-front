const arrayLAMJ = [
  {
    id: "1",
    numPaso: "1",
    descripcion:
      "Iniciar sesión con el usuario 'root' (Para disponer de todos los permisos) y la contraseña del CT previamente definida en la creación del mismo.",
    urlImagen:
      "http://drive.google.com/uc?export=view&id=1buT7LwmXI-cnnLq20T_ikaWtAuhIcWUd",
  },
  {
    id: "2",
    numPaso: "2",
    descripcion:
      "Ejecutar el comando 'apt update' para actualizar los paquetes disponibles del sistema. Esto evitara problemas de dependencia o incompatibilidades con otros paquetes.",
    urlImagen:
      "http://drive.google.com/uc?export=view&id=1LHJFJCoEaTKtyTzDK6WkgHP2p2jT5YGl",
  },
  {
    id: "3",
    numPaso: "3",
    descripcion:
      "Ejecutar el comando 'apt install apache2' para instalar apache en el CT. Nos pedira confirmación, y presionamos 'y'.",
    urlImagen:
      "http://drive.google.com/uc?export=view&id=1FpCLOV4rhPEZ2m73qMXLeis-HgA9qARt",
  },
  {
    id: "4",
    numPaso: "4",
    descripcion:
      "Ejecutar el comando 'apache2 -v' para verificar la existencia y versión de apache en el CT. Si no aparece como en la imagen, volver al paso 3. Caso contrario, continuar al siguiente.",
    urlImagen:
      "http://drive.google.com/uc?export=view&id=12eGLGAcy9twDT05Fi1chUzroMhTDjkSL",
  },
  {
    id: "5",
    numPaso: "5",
    descripcion:
      "Ejecutar el comando 'systemctl status apache2' para verificar el estado actual del servicio apache2. Debe aparecer 'Running', sino ejecutar 'systemctl enable apache2'. Y volver a verificar.",
    urlImagen:
      "http://drive.google.com/uc?export=view&id=1tLIi8eCT7voHIaGKlOIJZZQt1UxjvWrq",
  },
  {
    id: "6",
    numPaso: "6",
    descripcion:
      "Ejecutar el comando 'apt install mariadb-server' para instalar MariaDB en el CT.",
    urlImagen:
      "http://drive.google.com/uc?export=view&id=122HJfgWoShvP1uvGFK_N3lS17k43P1Xz",
  },
  {
    id: "7",
    numPaso: "7",
    descripcion:
      "Ejecutar el comando 'mariadb -v' para verificar si la instalación es correcta. Debe mostrarse como en la imagen, caso contrario repetir 'Paso 2' y 'Paso 7'.",
    urlImagen:
      "http://drive.google.com/uc?export=view&id=1IrGwfuNQocJe-SOj0jFdiHmiR1J_RmWn",
  },
  {
    id: "8",
    numPaso: "8",
    descripcion:
      "Ejecutar comando 'systemctl status mariadb' para verificar si el servicio se esta ejecutando. Caso contrario ejecutar 'systemctl enable mariadb' y volver a verificar el estado de MariaDB.",
    urlImagen:
      "http://drive.google.com/uc?export=view&id=1hPm0FelsVEocpTDUW6lSilPGLGTAO1N5",
  },
  {
    id: "8",
    numPaso: "8",
    descripcion:
      "Ejecutar el comando 'apt install curl', el cual nos permitira realizar transferencias y descargas de datos/archivos a través desde una URL dada.",
    urlImagen:
      "http://drive.google.com/uc?export=view&id=1PUuAB7v21kwGEjf4sb--uu0cf7oAJE4o",
  },
  {
    id: "9",
    numPaso: "9",
    descripcion:
      "Ejecutar el comando 'curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash' y luego el comando 'source ~/.bashrc', el cual nos servira para descargar el archivo 'install.sh' usando 'curl' e instalar nvm en el CT.",
    urlImagen:
      "http://drive.google.com/uc?export=view&id=1vHN5r-Gr8n7nDkWZR18J6y-0lrh3-t32",
  },
  {
    id: "10",
    numPaso: "10",
    descripcion:
      "Con NVM (Node Version Manager) instalado, ejecutamos el comando 'nvm install node', el cual nos descargara e instalara la última version disponible de NodeJS en el CT.",
    urlImagen:
      "http://drive.google.com/uc?export=view&id=1bUJ8Qj6CSKwhBW3Wgc96QeQC6B9Ef6IY",
  },
  {
    id: "11",
    numPaso: "11",
    descripcion:
      "Ejecutar el comando 'apt-get install git-all' para instalar Git en el CT y asi poder gestionar repositorios, realizar commits, clonar repos, etc. Lo utilizaremos para los repositorios del back y front",
    urlImagen:
      "http://drive.google.com/uc?export=view&id=1ikEkrCW79EwpX5f9CmOkRguo62KAKMOE",
  },
  {
    id: "12",
    numPaso: "12",
    descripcion:
      "Ejecutar el comando 'git version' para verificar si Git se instalo correctamente, como muestra la imagen. Sino repetir 'Paso 2' y 'Paso 11'.",
    urlImagen:
      "http://drive.google.com/uc?export=view&id=1sSLPc1mkNgzSaZMa1JLqK1J2F4eIdhUP",
  },
];

export default arrayLAMJ;
