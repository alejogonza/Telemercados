# GeoWork App

<p align="center">
  <img  src="https://res.cloudinary.com/dlqmpatgu/image/upload/v1612188605/60180b478b04c_1612188552_60180b478afe5_scarcp.png" | width=700 />
</p>

## Descripción del proyecto :page_facing_up:

Sitio web SPA y aplicación android con sistema de autenticación JWT, protección de rutas, y visualización de productos de la API de telemercados.

## Requisitos de instalación :memo:

- Node.js instalado.
- quasar cli instalado.
- android studio (opcional)

### Modo de desarrollo :construction_worker:

Para ejecutar SPA:

```
npm install && quasar dev
```

Para ejecutar la aplicación en android:

```
npm install && quasar dev -m cordova -T android
```

## Rutas :motorway:

| **Ruta** | **Descripción** |
| ---------------- | --------------- |
| / | Página principal para el login.
| /register | Página para registrar un usuario, tiene un validador de nombre de usuario y email en tiempo real que no permite registrar un usuario o email ya registrado.
| /products | Muestra la lista de productos consultados de API de telemercados.

## Descargar APK :iphone:

[GeoWork APK](https://github.com/alejogonza/Telemercados/raw/main/telemercados-app/Telemercados.apk)

## Link de la pagina :computer:

[Heroku page link](https://telemercados.herokuapp.com/)

## Autor :copyright:

Alejandro Gonzalez Serna - alejo.1996.2001@gmail.com