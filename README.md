# animeTS


__animeTS__ es una aplicación de streaming hecha con TS y React que permite a los usuarios buscar, ver y explorar diferentes animes. La aplicación está construida con React y utiliza la API de __Jikan__ para scraper y obtener datos de los animes y tus personajes favoritos, en la vista se utiliza la api gratuita de vidsrc.

## Características

- **Búsqueda de Anime**: Los usuarios pueden buscar animes por nombre.
- **Exploración de Animes Populares**: Los usuarios pueden ver los animes más populares y mejor valorados.
- **Visualización de Detalles del Anime**: Los usuarios pueden ver detalles específicos de cada anime, incluyendo sinopsis, géneros, casting y trailers.
- **Reproducción de Anime**: Los usuarios pueden reproducir episodios de anime directamente en la aplicación.
- **Sistema de historial**: Tiene su propio sistema de historial guardado en localStorage que permite ver a los usuarios que animes __vieron__, en que episodio __quedaron__ y cuantos episodios __restantes__ le quedan para terminar sus animes. 
- **Cambio de temas** : Los usuarios puede decidir que temas les agrada a sus Ojos.
- **Interfaz amigable**: Los usuarios tienen una interfaz amigable que le permite ver y cambiar de episodios con un sistema de graficos basados en cuadriculas como en el Antiguo __AnimeOnline__.


## Links:

- [Cloudfare](https://animets.pages.dev/)
- [Vercel](https://animets.pages.dev/)


## Problemas - Isues

animeTs utiliza la API  de jinkan por lo cual siempre tiene que estar scrapeando los  datos de myanimelist lo cual a veces suele tener problemas con el codigo __429__ de parte de servidor lo cual aveces hace que los animes simplemente se quede en un render "Loading" lo cual aveces suele verce extraño en las interfaces.

## Posibles Soluciones
 
Darle tiempo a la web a que primero pueda tener los codigos de respuesta de los servidores y pasarlo por un render condicional en el cual se evaluen todos los codigos para ver si la web esta en estado de dar todo.


## Uso

1. Inicia el servidor de desarrollo:
    ```sh
    npm run dev
    ```

2. Abre tu navegador y navega a `http://localhost:3000` para ver la aplicación en funcionamiento.

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Compila la aplicación para producción.
- `npm run lint`: Ejecuta ESLint para encontrar y arreglar problemas en el código.
- `npm run preview`: Previsualiza la aplicación compilada.
- `npm start`: Inicia el servidor de producción.

## Dependencias

- **React y TS**: Biblioteca de JavaScript para construir interfaces de usuario.
- **React Router DOM**: Enrutador para aplicaciones React.
- **Vite**: Empaquetador de la app.
- **Express**: Donde ser sirve la aplicacion.
- **Tailwind CSS y DaysiUI**: Framework de CSS para diseñar interfaces de usuario.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request para contribuir al proyecto.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.