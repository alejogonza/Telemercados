# Telemercados API

<p align="center">
  <img src="https://pbs.twimg.com/profile_images/486248529451421696/WOkdmmVi_400x400.png" | width=300 />
</p>

## Descripción del proyecto :page_facing_up:

API REST para Telemercados.

## Requisitos e instalación :memo:

- Node.js instalado.
- MongoDB instalado.

### Modo de desarrollo :construction_worker:

Ejecutar:

```
npm install && npm run dev
```

### Modo de producción :sunglasses:

Ejecutar:
```
npm install && npm start
```

## Rutas :motorway:

Para ejemplos e información más detallada consulta la sección de postman

| **Ruta** | **Método** | **Descripción** |
| ---------------- | --------------- | --------------- |
| /api/login | POST | Inicio de sesión del usuario previamente registrado.
/api/register | POST | Registrar un usuario.
/api/username-validate | POST | Valida en la base de datos que el usuario no existe en el momento del registro.
/api/email-validate | POST | Valida en la base de datos que el correo electrónico no existe en el momento del registro.
| /store | GET | Obtiene el listado de productos de la API de telemercados **requiere autenticación**.
| /api | GET | Obtiene el estado de la api.

## Enlace API :globe_with_meridians:

[Enlace a la API de Heroku](https://telemercados-api.herokuapp.com/api)

## Autor :copyright:

Alejandro González Serna - alejo.1996.2001@gmail.com