/* Despedida Lista — contenido del producto.
   {novia} y {novio} se reemplazan por los nombres que escribe la organizadora. */

const CATEGORIAS = {
  rompehielo: "Rompehielos",
  novia: "¿Quién conoce más a la novia?",
  mimica: "Mímica y adivinanzas",
  equipo: "Retos en equipo",
  novio: "El novio a distancia",
  recuerdo: "Recuerdos para la novia"
};

const T = ["tierno", "divertido", "atrevido"];
const TODOS_LUGARES = ["casa", "restaurante", "viaje"];

const JUEGOS = [
  {
    id: "bingo", cat: "rompehielo", emoji: "🎯", nombre: "Bingo de la novia",
    resumen: "Cada invitada tiene una tarjeta con casillas como «Conoce a {novia} desde la primaria». Hay que encontrar a alguien que cumpla cada casilla y conseguir su firma. Ideal para que se conozcan los grupos de amigas.",
    pasos: [
      "Antes de la fiesta, dibuja a mano una cuadrícula de 3×3 en cada hoja (una por invitada) y escribe una frase en cada casilla. Cambia el orden en cada tarjeta.",
      "Ideas de casillas: «La conoce desde hace más de 10 años», «Conoció a {novio} antes que {novia}», «Ha viajado con ella», «Sabe cómo se conocieron», «Tiene su mismo signo zodiacal», «Ha llorado con ella por un ex», «Sabe su canción favorita», «Fue a la escuela con ella», «Ya conoce a la familia de {novio}».",
      "Al llegar, cada una recibe su tarjeta y una pluma. Tienen que conversar con las demás y pedir una firma distinta en cada casilla.",
      "La primera que llena una línea dice «¡Bingo!» y gana un premio pequeño. Si quieren, sigan hasta llenar la tarjeta completa."
    ],
    materiales: ["Hojas o cartulina", "Plumas", "Premio pequeño"],
    compras: ["Hojas blancas o cartulina (1 por invitada)", "Plumas (1 por invitada)", "Premio pequeño para la ganadora (vela, dulces, labial)"],
    personas: "6 o más", duracion: 15, niveles: T, lugares: TODOS_LUGARES
  },
  {
    id: "palabra", cat: "rompehielo", emoji: "🚫", nombre: "La palabra prohibida",
    resumen: "Desde que llegan nadie puede decir «boda». Si alguien te escucha decirla, te quita tu pinza. Gana quien junte más pinzas al final de la noche. Corre en segundo plano toda la fiesta.",
    pasos: [
      "Al llegar, cada invitada recibe una pinza de ropa (o un listón) y se la pone en la ropa.",
      "Anuncia la palabra prohibida: «boda». En nivel Divertido o Atrevido puedes agregar una segunda: «novio».",
      "Si escuchas a otra decir la palabra, le quitas su pinza y te la pones tú. Se vale hacer preguntas tramposas para que caigan.",
      "Al cierre de la fiesta, la que tenga más pinzas gana un premio. {novia} también juega."
    ],
    materiales: ["Pinzas de ropa o listones", "Premio pequeño"],
    compras: ["Pinzas de ropa de colores (1 por invitada)"],
    personas: "5 o más", duracion: 5, niveles: T, lugares: TODOS_LUGARES
  },
  {
    id: "dosverdades", cat: "rompehielo", emoji: "🤥", nombre: "Dos verdades y una mentira (versión novia)",
    resumen: "Cada invitada cuenta tres anécdotas que vivió con {novia}: dos son reales y una es inventada. El grupo vota cuál es la mentira y {novia} confirma. Salen historias que nadie conocía.",
    pasos: [
      "Avísales a las invitadas en el grupo de WhatsApp que preparen tres frases cortas sobre su historia con {novia}.",
      "Por turnos, cada una dice sus tres frases en voz alta.",
      "Todas votan al mismo tiempo levantando 1, 2 o 3 dedos. {novia} no vota: ella confirma cuál era la mentira.",
      "Quien engañe a más personas gana un punto. Al final, la que más puntos tenga se lleva el título de «mejor mentirosa de la noche»."
    ],
    materiales: ["Nada"],
    compras: [],
    personas: "4 a 20", duracion: 20, niveles: T, lugares: TODOS_LUGARES
  },
  {
    id: "parejas", cat: "rompehielo", emoji: "💑", nombre: "Parejas famosas en la espalda",
    resumen: "Cada invitada lleva pegado en la espalda el nombre de un personaje de una pareja famosa. Tiene que adivinar quién es con preguntas de sí o no y después encontrar a su «media naranja».",
    pasos: [
      "Escribe en etiquetas los nombres de parejas famosas, uno por etiqueta: Romeo / Julieta, Shrek / Fiona, Frida Kahlo / Diego Rivera, Mickey / Minnie, Homero / Marge, Morticia / Homero Addams, Jack / Rose, Barbie / Ken, Cenicienta / el Príncipe, Ross / Rachel.",
      "Pega una etiqueta en la espalda de cada invitada sin que la vea.",
      "Todas caminan y hacen preguntas de sí o no a las demás («¿Soy de una película?», «¿Soy animado?»). Una pregunta por persona.",
      "Cuando adivines quién eres, busca a tu pareja. Las dos primeras parejas en encontrarse ganan."
    ],
    materiales: ["Etiquetas adhesivas", "Marcador"],
    compras: ["Etiquetas adhesivas (1 paquete)", "Marcador negro"],
    personas: "6 a 20 (número par)", duracion: 15, niveles: T, lugares: ["casa", "viaje"]
  },
  {
    id: "quiz", cat: "novia", emoji: "🧠", nombre: "El gran quiz: ¿Cuánto conoces a la novia?",
    resumen: "El clásico que nunca falla, pero listo para usar: eliges 10 a 15 preguntas del banco de 40, escribes las respuestas antes y en la fiesta la app las muestra en pantalla grande y lleva el marcador por equipos.",
    pasos: [
      "Ve a la pestaña «Quiz», elige entre 10 y 15 preguntas y escribe la respuesta correcta de cada una (pregúntale discretamente a {novio} o a la familia).",
      "En la fiesta, formen 2 a 4 equipos y escriban sus nombres en la app.",
      "Toca «Empezar quiz»: la pregunta aparece en grande. Cada equipo anota su respuesta en un papel.",
      "Toca «Revelar respuesta» y suma un punto a cada equipo que le atinó. {novia} es la jueza final si hay discusión."
    ],
    materiales: ["Celular con la app", "Hojas y plumas para cada equipo"],
    compras: ["Hojas y plumas para los equipos"],
    personas: "4 o más", duracion: 25, niveles: T, lugares: TODOS_LUGARES
  },
  {
    id: "quienlodijo", cat: "novia", emoji: "💬", nombre: "¿Quién lo dijo?",
    resumen: "Lees en voz alta frases que han dicho {novia} o {novio} (sacadas de chats, frases típicas o anécdotas). El grupo vota quién la dijo. Risas aseguradas con sus frases de siempre.",
    pasos: [
      "Antes de la fiesta, junta 12 a 15 frases reales: pídele a {novio} y a amigas cercanas las frases típicas de cada uno («Ya voy saliendo», «¿Y si pedimos tacos?»). Anótalas en las notas de tu celular con quién la dijo.",
      "En la fiesta, lee una frase a la vez.",
      "Todas votan al mismo tiempo: mano izquierda arriba si fue {novia}, mano derecha si fue {novio}.",
      "Quien acierte suma un punto. Para cerrar, pídele a {novia} que adivine las últimas tres ella sola."
    ],
    materiales: ["Lista de frases en tu celular"],
    compras: [],
    personas: "4 o más", duracion: 15, niveles: T, lugares: TODOS_LUGARES
  },
  {
    id: "lineatiempo", cat: "novia", emoji: "📅", nombre: "La línea del tiempo del amor",
    resumen: "Los equipos reciben tarjetas con momentos de la relación (primera cita, primer viaje, la propuesta…) revueltas, y tienen que ordenarlas. Gana el equipo que más se acerque a la historia real.",
    pasos: [
      "Antes, pregúntale a {novio} o a la familia 8 a 10 momentos clave de la pareja y escribe cada uno en una tarjeta: «Primera cita», «Primer «te quiero»», «Conocieron a los suegros», «Primer viaje», «Adoptaron a la mascota», «La propuesta»… Haz un juego de tarjetas por equipo.",
      "Revuelve las tarjetas y entrega un juego a cada equipo.",
      "Tienen 3 minutos para ordenarlas sobre la mesa de la más antigua a la más reciente.",
      "{novia} cuenta la historia real en orden. Cada tarjeta en la posición correcta vale un punto, y ella puede contar detalles de cada momento."
    ],
    materiales: ["Tarjetas o papelitos", "Marcador"],
    compras: ["Tarjetas blancas o fichas de cartulina (10 por equipo)"],
    personas: "4 o más", duracion: 15, niveles: T, lugares: TODOS_LUGARES
  },
  {
    id: "masprobable", cat: "novia", emoji: "👉", nombre: "¿Quién es más probable?",
    resumen: "Haces preguntas tipo «¿Quién es más probable que llore en la boda?» y todas votan al mismo tiempo por {novia} o por {novio}. Después {novia} dice la verdad. Las preguntas cambian según el nivel.",
    pasos: [
      "Lee una pregunta y cuenta «uno, dos, tres». Todas señalan a la vez: hacia {novia} si creen que es ella, o hacia arriba si creen que es {novio}.",
      "Tierno: ¿Quién llora primero en la boda? ¿Quién olvida los aniversarios? ¿Quién pide perdón primero? ¿Quién se pierde aun con GPS?",
      "Divertido: ¿Quién ronca más? ¿Quién se gasta la quincena en antojos? ¿Quién tarda más en el baño? ¿Quién stalkea a sus ex?",
      "Atrevido: ¿Quién dio el primer beso? ¿Quién es más celoso? ¿Quién propone los planes más atrevidos? ¿Quién manda mensajes coquetos en horario de trabajo?",
      "{novia} revela la respuesta verdadera. Si no quiere contestar alguna, dice «paso» y sigue la siguiente, sin castigo."
    ],
    materiales: ["Nada"],
    compras: [],
    personas: "4 o más", duracion: 15, niveles: T, lugares: TODOS_LUGARES
  },
  {
    id: "eldijo", cat: "novio", emoji: "🎧", nombre: "Él dijo, ella dijo",
    resumen: "{novio} graba en audio sus respuestas a 10 preguntas antes de la fiesta. En la fiesta, {novia} intenta adivinar qué contestó él y luego ponen el audio. El momento favorito de muchas despedidas.",
    pasos: [
      "Unos días antes, mándale a {novio} estas preguntas y pídele un audio por respuesta: ¿Qué fue lo primero que pensaste de {novia}? ¿Cuál es su comida favorita? ¿Qué es lo que más te desespera de ella? ¿Qué canción te recuerda a ella? ¿Quién dijo «te quiero» primero? ¿Cuál es su mayor manía? ¿Cómo imaginas su vida en 10 años? ¿Cuál fue su primera pelea? ¿Qué es lo que más te enamora de ella? ¿Qué le dirías hoy si pudiera escucharte?",
      "En nivel Atrevido puedes agregar: ¿Dónde fue su primer beso? ¿Qué fue lo primero que te gustó de ella físicamente? ¿Cuál es el apodo más cursi que le dices?",
      "Descarga los audios en tu celular antes de la fiesta (por si no hay señal).",
      "En la fiesta, lee la pregunta, {novia} responde lo que cree que dijo él y luego reproduces el audio. Si coinciden, aplausos. Si no, el grupo puede girar la ruleta de prendas (ella puede pasar)."
    ],
    materiales: ["Audios de {novio} en tu celular", "Bocina (opcional)"],
    compras: ["Bocina portátil (opcional)"],
    personas: "Cualquier número", duracion: 15, niveles: T, lugares: TODOS_LUGARES
  },
  {
    id: "llamada", cat: "novio", emoji: "📞", nombre: "Llamada en altavoz",
    resumen: "Llaman a {novio} en altavoz y tiene 2 minutos para responder 5 preguntas rápidas sobre {novia}. Antes, ella apuesta cuántas va a contestar bien. Corto, emocionante y muy divertido.",
    pasos: [
      "Avísale a {novio} que en algún momento de la noche lo van a llamar (así contesta y está de acuerdo).",
      "Antes de llamar, {novia} dice cuántas de las 5 preguntas cree que él va a contestar bien.",
      "Llama en altavoz. Haz las preguntas rápido, con cronómetro de 2 minutos: color favorito de ella, nombre de su mejor amiga de la infancia, qué pide siempre en su restaurante favorito, su talla de zapato, su película favorita.",
      "Si él supera la apuesta de {novia}, el grupo le manda un aplauso en vivo. Si no, ella elige una prenda de la ruleta para él (que cumplirá en la boda, si quiere)."
    ],
    materiales: ["Celular con señal", "Cronómetro"],
    compras: [],
    personas: "Cualquier número", duracion: 10, niveles: T, lugares: TODOS_LUGARES
  },
  {
    id: "mimica", cat: "mimica", emoji: "🎬", nombre: "Mímica de películas y telenovelas románticas",
    resumen: "Por equipos, una actúa sin hablar el título de una película o telenovela de amor y su equipo tiene un minuto para adivinar. Funciona con cualquier edad, por eso es perfecto con la familia presente.",
    pasos: [
      "Formen dos equipos. Escribe estos títulos en papelitos y dóblalos: Titanic, Cenicienta, La Bella y la Bestia, Mamma Mia, Diario de una pasión, Mujer bonita, Notting Hill, La boda de mi mejor amigo, Novia fugitiva, Shrek, Enredados, Encanto, Yo antes de ti, La La Land, Betty la fea, María la del Barrio, Café con aroma de mujer, Rubí, Orgullo y prejuicio, Simplemente amor.",
      "Por turnos, una del equipo saca un papelito y lo actúa sin hablar ni señalar objetos con letras.",
      "Su equipo tiene 60 segundos para adivinar. Si no lo logra, el otro equipo tiene un intento para robar el punto.",
      "Gana el equipo con más puntos después de que todas hayan actuado al menos una vez."
    ],
    materiales: ["Papelitos", "Pluma", "Cronómetro del celular"],
    compras: ["Papelitos o post-its"],
    personas: "6 o más", duracion: 20, niveles: T, lugares: TODOS_LUGARES
  },
  {
    id: "dibuja", cat: "mimica", emoji: "✏️", nombre: "Dibuja la boda en 30 segundos",
    resumen: "Pictionary con palabras de bodas y luna de miel. Una dibuja, su equipo adivina en 30 segundos. Nadie dibuja bien, y eso es justo lo divertido.",
    pasos: [
      "Escribe en papelitos: anillo, ramo, velo, pastel de bodas, luna de miel, suegra, mariachi, vals, lluvia de arroz, padrinos, Las Vegas, despedida, maleta, playa, iglesia, tacones, primer baile, invitada que llega tarde, novio nervioso, foto grupal.",
      "Formen dos equipos. Por turnos, una saca un papelito y lo dibuja en una hoja grande sin escribir letras ni números.",
      "Su equipo tiene 30 segundos para adivinar. Si acierta, punto; si no, el otro equipo puede robar.",
      "Al final, regálenle a {novia} los dibujos más chistosos como recuerdo."
    ],
    materiales: ["Hojas grandes", "Marcadores", "Papelitos"],
    compras: ["Hojas grandes o un block de dibujo", "Marcadores de colores"],
    personas: "6 o más", duracion: 15, niveles: T, lugares: TODOS_LUGARES
  },
  {
    id: "tararea", cat: "mimica", emoji: "🎶", nombre: "Tararea la canción",
    resumen: "Una invitada tararea (sin decir la letra) una canción de amor y las demás adivinan. Es más difícil de lo que parece y siempre termina con todas cantando.",
    pasos: [
      "Elige 15 canciones conocidas, por ejemplo: Bésame mucho, Si nos dejan, Me enamora, La bicicleta, Darte un beso, Vivir mi vida, Bailando, Hasta la raíz, Contigo, Corazón espinado, Bonito, La flaca, Sabor a mí, Tu falta de querer, Despacito.",
      "Dile en secreto el título a una invitada; ella tararea máximo 15 segundos, solo con «mmm» o «nanana».",
      "La primera que diga el título correcto gana un punto y le toca tararear la siguiente.",
      "Ronda final: todas tararean a la vez la canción de los novios y {novia} tiene que reconocerla."
    ],
    materiales: ["Lista de canciones en tu celular"],
    compras: [],
    personas: "4 o más", duracion: 15, niveles: T, lugares: TODOS_LUGARES
  },
  {
    id: "doblesentido", cat: "mimica", emoji: "😏", nombre: "Adivinanzas de doble sentido",
    resumen: "Adivinanzas que suenan a otra cosa, pero cuya respuesta es totalmente inocente. Solo gana punto quien diga la respuesta correcta… aunque la primera respuesta que todas piensan sea otra. Pícaro, nunca vulgar.",
    pasos: [
      "Lee una adivinanza en voz alta. Los equipos tienen 20 segundos para dar la respuesta inocente.",
      "«Entra duro y seco, sale blandito y mojado.» → El chicle.",
      "«Tiene pelos por fuera y agua por dentro.» → El coco.",
      "«Se mete en la boca, va de un lado a otro y sale con espuma.» → El cepillo de dientes.",
      "«Lo tomas con la mano, lo sacudes, le sale lo blanco y lo dejas en la mesa.» → El salero.",
      "«Antes de usarlo está duro y derechito; después de usarlo queda blandito y colgando.» → El espagueti.",
      "«Toda la noche entre tus piernas y en la mañana lo dejas a un lado.» → La cobija.",
      "Punto para el equipo que diga la respuesta inocente primero. Si alguien grita la «otra» respuesta, no hay castigo: solo risas."
    ],
    materiales: ["Esta lista en tu celular"],
    compras: [],
    personas: "4 o más", duracion: 10, niveles: ["atrevido"], lugares: TODOS_LUGARES
  },
  {
    id: "sombrero", cat: "mimica", emoji: "🎩", nombre: "El sombrero de las preguntas",
    resumen: "Cada invitada escribe en secreto una pregunta para {novia} y la echa en un sombrero o bolsa. {novia} saca una a la vez y decide si la contesta o dice «paso». Ella tiene el control siempre.",
    pasos: [
      "Reparte papelitos. Cada invitada escribe una pregunta para {novia}, sin firmarla, y la dobla.",
      "Tierno: ¿Qué es lo que más te ilusiona de casarte? Divertido: ¿Cuál fue la peor cita que tuviste antes de {novio}? Atrevido: ¿Qué es lo que más te gusta de {novio} cuando nadie lo ve?",
      "{novia} saca una pregunta, la lee en voz alta y responde… o dice «paso» y saca otra, sin castigo.",
      "Después de unas 8 preguntas, el grupo vota cuál fue la mejor respuesta de la noche."
    ],
    materiales: ["Papelitos", "Plumas", "Un sombrero, bolsa o frasco"],
    compras: ["Papelitos o post-its"],
    personas: "4 o más", duracion: 15, niveles: ["divertido", "atrevido"], lugares: TODOS_LUGARES
  },
  {
    id: "vestido", cat: "equipo", emoji: "👰", nombre: "Vestido de novia de papel higiénico",
    resumen: "Cada equipo diseña un vestido de novia con papel higiénico y cinta sobre una voluntaria de su equipo. Tienen 10 minutos. {novia} es la jueza de moda. Ideal para las fotos de la noche.",
    pasos: [
      "Formen equipos de 3 a 5. Cada equipo elige a una voluntaria que será la «modelo» (nunca se obliga a nadie).",
      "Entrega a cada equipo 3 rollos de papel higiénico y cinta adhesiva. Pueden usar servilletas, listones o flores si hay.",
      "Tienen 10 minutos para crear el vestido: velo, cola y ramo cuentan.",
      "Cada modelo desfila mientras su equipo narra el diseño como en un programa de moda. {novia} elige el ganador."
    ],
    materiales: ["Papel higiénico", "Cinta adhesiva", "Listones o servilletas (opcional)"],
    compras: ["Rollos de papel higiénico (3 por equipo)", "Cinta adhesiva transparente"],
    personas: "6 o más", duracion: 20, niveles: T, lugares: ["casa", "viaje"]
  },
  {
    id: "ramo", cat: "equipo", emoji: "💐", nombre: "Ramo exprés",
    resumen: "En 5 minutos cada equipo arma el mejor ramo de novia usando solo lo que tiene a la mano: servilletas, cubiertos, popotes, hojas. Perfecto para restaurante, donde casi no hay espacio para moverse.",
    pasos: [
      "Formen equipos (por lado de la mesa funciona perfecto).",
      "Explica la regla: solo se puede usar lo que hay en la mesa o en sus bolsas. Nada se rompe ni se pide prestado a otras mesas.",
      "Tienen 5 minutos. Al terminar, cada equipo presenta su ramo con un nombre elegante («Primavera en Cancún»).",
      "{novia} elige el ganador. Al final, ella hace el clásico lanzamiento del ramo ganador."
    ],
    materiales: ["Lo que haya en la mesa"],
    compras: [],
    personas: "4 o más", duracion: 10, niveles: T, lugares: TODOS_LUGARES
  },
  {
    id: "discurso", cat: "equipo", emoji: "🎤", nombre: "El discurso de las tres palabras",
    resumen: "Cada equipo recibe tres palabras al azar que no tienen nada que ver con bodas (ejemplo: «aguacate, dinosaurio, Excel») y debe crear un discurso de un minuto para {novia} que las incluya.",
    pasos: [
      "Escribe en papelitos palabras sueltas: aguacate, dinosaurio, Excel, karaoke, tamal, GPS, piñata, gimnasio, suegra, Netflix, tráfico, telenovela, mariachi, lavadora, aeropuerto.",
      "Cada equipo saca tres papelitos y tiene 5 minutos para preparar su discurso.",
      "Una representante de cada equipo da el discurso de pie, como si estuviera en la boda (con la bebida que quiera en la mano, puede ser agua).",
      "{novia} elige el discurso más chistoso y el más emotivo."
    ],
    materiales: ["Papelitos", "Pluma"],
    compras: ["Papelitos o post-its"],
    personas: "6 o más", duracion: 15, niveles: T, lugares: TODOS_LUGARES
  },
  {
    id: "cancion", cat: "equipo", emoji: "🎵", nombre: "La canción de los novios",
    resumen: "Cada equipo toma el coro de una canción famosa y le cambia la letra para contar la historia de {novia} y {novio}. Luego la presentan como en concurso de talentos.",
    pasos: [
      "Formen equipos de 3 a 5 y que cada uno elija una canción que todas conozcan (cumbias, reguetón, baladas o vallenatos funcionan muy bien).",
      "Tienen 10 minutos para escribir una nueva letra del coro con datos de la pareja: cómo se conocieron, sus manías, la propuesta.",
      "Cada equipo canta su versión; pueden usar el celular para poner la pista de karaoke.",
      "Si quieren guardar el recuerdo, graben solo con el permiso de todas las que salen en el video."
    ],
    materiales: ["Hojas", "Plumas", "Celular para la pista"],
    compras: ["Hojas y plumas para los equipos"],
    personas: "6 o más", duracion: 20, niveles: T, lugares: TODOS_LUGARES
  },
  {
    id: "tesoro", cat: "equipo", emoji: "🗺️", nombre: "Búsqueda del tesoro de su historia de amor",
    resumen: "Escondes 6 pistas por el lugar; cada una es una pregunta sobre la pareja y su respuesta indica dónde está la siguiente. El tesoro final es un regalo para {novia}.",
    pasos: [
      "Antes de la fiesta, escribe 6 pistas. Cada una tiene un dato de la pareja y apunta a un lugar: «Donde se conocieron había mucha comida… busca en el refri».",
      "Esconde las pistas en orden y deja la primera en manos de {novia}.",
      "{novia} y su equipo (o todas juntas) siguen las pistas; las demás pueden dar ayudas si se atoran.",
      "El tesoro final puede ser el frasco de consejos, una carta del grupo o un detalle pequeño."
    ],
    materiales: ["6 papelitos con pistas", "Un regalo pequeño para el final"],
    compras: ["Sobres o papelitos de colores (6)", "Detalle pequeño para la novia (el tesoro)"],
    personas: "Cualquier número", duracion: 25, niveles: T, lugares: ["casa", "viaje"]
  },
  {
    id: "juicio", cat: "equipo", emoji: "⚖️", nombre: "El juicio a la novia",
    resumen: "Un juicio de broma: {novia} está «acusada» de haberse enamorado perdidamente. Un equipo es la fiscalía y otro la defensa, y presentan «pruebas» (anécdotas). Siempre cariñoso, nunca para exhibirla.",
    pasos: [
      "Formen dos equipos: Fiscalía y Defensa. Una invitada es la jueza (con un cucharón como martillo).",
      "Cargos: «Enamorarse sin permiso del grupo», «Hablar de {novio} en cada plan», «Planear una boda con 47 tableros de Pinterest».",
      "Cada equipo tiene 5 minutos para preparar «pruebas»: anécdotas, imitaciones, mensajes que ella ya contó al grupo. Reglas: nada que la avergüence de verdad ni secretos que no quiera contar.",
      "La jueza dicta sentencia: «culpable de ser feliz», y la condena es un abrazo grupal o una prenda que ella elija."
    ],
    materiales: ["Un cucharón o cualquier objeto como martillo"],
    compras: [],
    personas: "6 o más", duracion: 20, niveles: T, lugares: TODOS_LUGARES
  },
  {
    id: "frasco", cat: "recuerdo", emoji: "🫙", nombre: "El frasco de consejos y deseos",
    resumen: "Cada invitada escribe un consejo para el matrimonio y un deseo para la pareja. Todo va a un frasco decorado que {novia} abrirá en su primer aniversario.",
    pasos: [
      "Reparte dos papelitos por invitada: uno para un consejo («Nunca se vayan a dormir enojados… mejor vayan a comer tacos») y otro para un deseo.",
      "Cada una lo dobla y lo mete en el frasco; pueden firmarlo o no.",
      "Cierren el frasco con un listón y una etiqueta: «Abrir el día de nuestro primer aniversario».",
      "Si sobra tiempo, cada invitada lee en voz alta su consejo más chistoso (no el deseo, ese queda secreto)."
    ],
    materiales: ["Frasco de vidrio", "Papelitos de colores", "Listón", "Plumas"],
    compras: ["Frasco de vidrio con tapa", "Papelitos de colores", "Listón dorado o rosa"],
    personas: "Cualquier número", duracion: 15, niveles: T, lugares: TODOS_LUGARES
  },
  {
    id: "capsula", cat: "recuerdo", emoji: "⏳", nombre: "Cápsula del tiempo: la pareja en 5 años",
    resumen: "Cada invitada predice cómo será la vida de {novia} y {novio} dentro de 5 años: dónde vivirán, cuántas mascotas tendrán, quién cocinará. Se guarda en un sobre que se abre en 5 años.",
    pasos: [
      "Entrega a cada invitada una hoja con estas preguntas: ¿Dónde vivirán? ¿Cuántos hijos o mascotas tendrán? ¿Quién mandará en la casa? ¿Cuál será su pelea más común? ¿A dónde habrán viajado?",
      "Tienen 5 minutos para responder con su mejor imaginación.",
      "Lean algunas en voz alta y luego guarden todas en un sobre grande cerrado.",
      "Escriban en el sobre la fecha de apertura y entréguenselo a {novia}."
    ],
    materiales: ["Hojas", "Plumas", "Sobre grande"],
    compras: ["Sobre grande", "Hojas y plumas"],
    personas: "Cualquier número", duracion: 15, niveles: T, lugares: TODOS_LUGARES
  },
  {
    id: "telarana", cat: "recuerdo", emoji: "🧶", nombre: "Telaraña de cariño",
    resumen: "En círculo, la primera invitada sostiene la punta de un estambre, dice un momento en que {novia} estuvo para ella y le lanza el ovillo a otra. Al final queda una telaraña que une a todas. Momento emotivo para cerrar.",
    pasos: [
      "Siéntense o párense en círculo con {novia} en el centro o como parte del círculo.",
      "La primera sostiene la punta del estambre, cuenta en una frase un recuerdo con {novia} y lanza el ovillo a otra sin soltar su parte.",
      "Así hasta que todas hablen. Si alguien prefiere no hablar, solo dice «gracias, amiga» y lanza.",
      "Al final, {novia} corta un pedacito del estambre para cada una como pulsera de recuerdo."
    ],
    materiales: ["Ovillo de estambre", "Tijeras"],
    compras: ["Ovillo de estambre rosa o dorado", "Tijeras"],
    personas: "5 o más", duracion: 15, niveles: T, lugares: TODOS_LUGARES
  },
  {
    id: "banderin", cat: "recuerdo", emoji: "🎏", nombre: "Banderín de firmas",
    resumen: "Cada invitada decora un triángulo de cartulina con un mensaje para {novia}. Se cuelgan en un cordón y forman una guirnalda que decora la fiesta y luego se va a casa con ella.",
    pasos: [
      "Antes, recorta triángulos de cartulina de unos 20 cm (uno por invitada) y hazles dos agujeros arriba.",
      "Al llegar, cada invitada decora el suyo con un mensaje, dibujo o recuerdo.",
      "Pásenlos por un cordón y cuelguen la guirnalda en la pared o detrás de {novia}.",
      "Al final de la noche, se la entregan doblada como recuerdo."
    ],
    materiales: ["Cartulina de colores", "Cordón o listón", "Marcadores", "Perforadora o tijeras"],
    compras: ["Cartulina de colores (2 o 3 pliegos)", "Cordón o listón (3 metros)", "Marcadores de colores"],
    personas: "Cualquier número", duracion: 15, niveles: T, lugares: ["casa", "viaje"]
  }
];

/* Banco del quiz. nivel: mínimo nivel en que aparece (tierno < divertido < atrevido) */
const PREGUNTAS = [
  { id: 1, nivel: "tierno", q: "¿Dónde se conocieron {novia} y {novio}?" },
  { id: 2, nivel: "tierno", q: "¿Quién dio el primer paso?" },
  { id: 3, nivel: "tierno", q: "¿Cómo fue la propuesta de matrimonio?" },
  { id: 4, nivel: "tierno", q: "¿A dónde fueron en su primera cita?" },
  { id: 5, nivel: "tierno", q: "¿En qué mes y año empezaron a salir?" },
  { id: 6, nivel: "tierno", q: "¿Cuál es la comida favorita de {novia}?" },
  { id: 7, nivel: "tierno", q: "¿Qué hace {novio} que a {novia} la desespera?" },
  { id: 8, nivel: "tierno", q: "¿Cuál es «la canción» de la pareja?" },
  { id: 9, nivel: "tierno", q: "¿Cuál fue su primer viaje juntos?" },
  { id: 10, nivel: "tierno", q: "¿Cómo le dice {novia} a {novio} de cariño?" },
  { id: 11, nivel: "tierno", q: "¿Cuál es la película favorita de {novia}?" },
  { id: 12, nivel: "tierno", q: "¿Qué quería ser {novia} de niña?" },
  { id: 13, nivel: "tierno", q: "¿A qué le tiene más miedo {novia}?" },
  { id: 14, nivel: "tierno", q: "¿Qué fue lo primero que pensó {novia} de {novio}?" },
  { id: 15, nivel: "tierno", q: "¿Quién cocina mejor de los dos?" },
  { id: 16, nivel: "tierno", q: "¿Quién tarda más en arreglarse?" },
  { id: 17, nivel: "tierno", q: "¿Cuál es el destino soñado de {novia}?" },
  { id: 18, nivel: "tierno", q: "¿Qué número de zapato usa {novia}?" },
  { id: 19, nivel: "tierno", q: "¿Cuál es el antojo que {novia} nunca rechaza?" },
  { id: 20, nivel: "tierno", q: "¿Qué hace {novia} cuando está enojada?" },
  { id: 21, nivel: "tierno", q: "¿Cuál es el talento oculto de {novia}?" },
  { id: 22, nivel: "tierno", q: "¿Cómo se llamaba la primera mascota de {novia}?" },
  { id: 23, nivel: "tierno", q: "¿Quién dijo «te quiero» primero?" },
  { id: 24, nivel: "tierno", q: "¿Cuántos hijos (o mascotas) quieren tener?" },
  { id: 25, nivel: "tierno", q: "¿Qué serie ha visto {novia} más de una vez?" },
  { id: 26, nivel: "tierno", q: "¿Qué es lo más romántico que {novio} ha hecho por {novia}?" },
  { id: 27, nivel: "tierno", q: "¿Quién es más desordenado de los dos?" },
  { id: 28, nivel: "tierno", q: "¿Cuál fue el primer trabajo de {novia}?" },
  { id: 29, nivel: "tierno", q: "¿Cuál es el plan de domingo perfecto para la pareja?" },
  { id: 30, nivel: "tierno", q: "¿Qué es lo que más va a extrañar {novia} de su vida de soltera?" },
  { id: 31, nivel: "tierno", q: "¿Qué app usa más {novia} en su celular?" },
  { id: 32, nivel: "tierno", q: "¿Quién de los dos pide perdón primero después de una pelea?" },
  { id: 33, nivel: "divertido", q: "¿Dónde fue su primer beso?" },
  { id: 34, nivel: "divertido", q: "¿Cuál fue su primera pelea seria y quién ganó?" },
  { id: 35, nivel: "atrevido", q: "¿Qué fue lo primero que a {novia} le gustó físicamente de {novio}?" },
  { id: 36, nivel: "atrevido", q: "¿Cuál es el apodo más cursi que se dicen en privado?" },
  { id: 37, nivel: "atrevido", q: "¿Cuál es el lugar más inesperado donde se han dado un beso?" },
  { id: 38, nivel: "atrevido", q: "¿Qué prenda de {novio} le encanta a {novia} que use?" },
  { id: 39, nivel: "atrevido", q: "¿Quién es más celoso de los dos?" },
  { id: 40, nivel: "atrevido", q: "¿Quién manda el mensaje más coqueto del día?" }
];

/* Ruleta: retos (para cumplir) y prendas (para quien pierde un juego). Todo se puede pasar. */
const RULETA = {
  tierno: {
    retos: [
      "Cuenta en 30 segundos cómo conociste a {novia}.",
      "Imita la risa de {novia} hasta que alguien la reconozca.",
      "Di tres cualidades de {novia} que empiecen con la inicial de tu nombre.",
      "Canta el coro de una canción de amor sin equivocarte en la letra.",
      "Dale a {novia} un consejo para el matrimonio en una sola frase.",
      "Haz tu mejor imitación de {novio} pidiéndole matrimonio a {novia}.",
      "Cuenta un recuerdo con {novia} que la haga reír.",
      "Baila 20 segundos la canción que elija {novia}.",
      "Describe a {novio} con solo tres palabras.",
      "Inventa un nombre de pareja combinando los nombres de {novia} y {novio}.",
      "Anuncia la boda como si fueras presentadora de noticias.",
      "Haz la pose de portada de revista de novias.",
      "Di qué canción pondrías en el primer baile de los novios y por qué.",
      "Dile a {novia} el piropo más bonito que se te ocurra.",
      "Durante un minuto, termina cada frase con «…y vivieron felices para siempre».",
      "Cuenta cuál ha sido tu peor cita (sin decir nombres).",
      "Da un discurso de 30 segundos como si fueras la madrina en la boda.",
      "Describe con las manos, en el aire, el vestido de novia ideal para {novia}.",
      "Dibuja a {novio} en 30 segundos con los ojos cerrados.",
      "Nombra cinco películas románticas en 15 segundos.",
      "Cuenta qué pensaste cuando supiste que {novia} se casaba.",
      "Imita a un mariachi dándole serenata a {novia}.",
      "Eres la organizadora de bodas: decide en 30 segundos dónde se sienta cada invitada.",
      "Cuenta cómo te imaginas a {novia} y {novio} dentro de 30 años.",
      "Hazle a {novia} una pregunta que siempre quisiste hacerle.",
      "Enséñale al grupo un paso de baile; todas lo tienen que repetir.",
      "Adivina cuántos años (o meses) llevan juntos {novia} y {novio}.",
      "Escribe en una servilleta un deseo para la pareja y léelo en voz alta.",
      "Haz un comercial de 20 segundos vendiendo a {novio} como el mejor esposo del mundo.",
      "Cuenta algo que {novia} te haya enseñado.",
      "Nombra cinco cosas que crees que hay en la bolsa de {novia}. Ella confirma.",
      "Canta una canción infantil cambiando la letra para que hable de la boda.",
      "Actúa en mímica la propuesta de matrimonio; el grupo adivina dónde fue.",
      "Di tres parejas famosas en 10 segundos.",
      "Imita a {novia} cuando tiene hambre.",
      "Cuenta el mejor consejo de pareja que te hayan dado.",
      "Di tres veces rápido: «Tres tristes tigres tragaban trigo en un trigal».",
      "Inventa la coreografía de la entrada de los novios a la fiesta.",
      "Di algo que admiras de {novia} mirándola a los ojos.",
      "Camina como florista lanzando pétalos imaginarios por el pasillo.",
      "Di qué cena le prepararías a la pareja en su primer aniversario.",
      "Di «Acepto» de la forma más dramática posible, sin reírte.",
      "Adivina la canción favorita de {novia}. Ella dice si le atinaste.",
      "Cuenta un dato curioso tuyo que nadie del grupo conozca.",
      "Organiza una foto grupal en 30 segundos (solo salen las que quieran).",
      "Adivina el color favorito de {novio}."
    ],
    prendas: [
      "Habla con acento argentino hasta tu próximo turno.",
      "Durante 5 minutos eres la mesera de lujo: sirves botanas y agua a todas.",
      "Llama a {novia} «Su Majestad» hasta el siguiente juego.",
      "Haz 10 sentadillas mientras cantas «Cielito lindo».",
      "Cuenta un chiste. Si nadie se ríe, tienes otra oportunidad.",
      "Ponte una corona de papel hasta que pierda otra persona.",
      "Hazle un cumplido sincero a cada persona del grupo.",
      "Habla en rima durante tu próximo turno.",
      "Imita a una gallina dando una vuelta en tu lugar.",
      "Di el abecedario al revés, de la Z hasta la M.",
      "Eres la DJ: elige las próximas tres canciones.",
      "Hazte un peinado chistoso y déjalo hasta el siguiente juego.",
      "Escribe un poema de cuatro versos para {novia} y léelo con mucho sentimiento.",
      "Durante tres minutos solo te puedes comunicar con mímica.",
      "Haz un desfile de pasarela de ida y vuelta.",
      "Repite como eco todo lo que diga {novia} durante un minuto.",
      "Ponte un moño en la cabeza como si fueras un regalo hasta el final del juego.",
      "Canta tu próxima frase como si fuera ópera."
    ]
  },
  divertido: {
    retos: [
      "Imita a {novio} intentando armar un mueble sin instructivo.",
      "Actúa una telenovela de 30 segundos: {novia} descubre que {novio} se comió su postre.",
      "Cuenta tu momento más vergonzoso en una cita (sin nombres).",
      "Baila reguetón como si fueras una abuelita.",
      "Inventa un baile viral para la canción que elija el grupo.",
      "Actúa a {novia} como estrella de reality show.",
      "Imita a {novia} después de su primera semana de casada.",
      "Cuenta la excusa más grande que hayas inventado para escapar de una cita aburrida.",
      "Improvisa una serenata para {novia} con la canción que te salga.",
      "Cambia la letra de una canción de despecho para que sea de boda.",
      "Imita la llegada de {novio} al altar en cámara lenta.",
      "Narra la propuesta de matrimonio como narradora de partido de fútbol.",
      "Cuenta tres red flags que hayas visto en una cita.",
      "Anuncia la boda como influencer con producto patrocinado.",
      "Bailen tú y una voluntaria del grupo el vals de los novios, versión exagerada.",
      "Imita la reacción de {novio} al ver a {novia} entrar a la ceremonia.",
      "Durante un minuto, todas tus frases deben incluir la palabra «aguacate».",
      "Pon tu cara de «me acaba de escribir mi ex». El grupo vota si convence.",
      "Muestra la última foto de tu galería (solo si quieres) y cuenta su historia.",
      "Inventa el hashtag oficial de la boda en 10 segundos.",
      "Lee lo que hay en tu bolsa como si fuera un poema épico.",
      "Defiende como abogada por qué debe haber tacos en la boda.",
      "Camina como modelo de pasarela al ritmo de una cumbia.",
      "Imita a {novia} pidiendo comida a domicilio.",
      "Di tres manías de {novia} que {novio} va a tener que aguantar.",
      "Haz sonido de alarma cada vez que alguien diga «amor» en los próximos 3 minutos.",
      "Actúa quién se va a quedar dormido primero en la fiesta de la boda.",
      "Cuenta el apodo más ridículo que te han puesto.",
      "Improvisa un rap de cuatro líneas sobre {novia} y {novio}.",
      "Interpreta a la tía que en cada boda pregunta «¿Y para cuándo los hijos?».",
      "Lee en voz alta el mensaje de WhatsApp que crees que {novio} le mandará a {novia} en la luna de miel.",
      "Traduce al «idioma de enamorados» la frase que te diga el grupo.",
      "Dirige al grupo bailando la Macarena.",
      "Recibe un premio imaginario como cantante famosa y agradécele todo a {novia}.",
      "Di el peor regalo de bodas que se te ocurra y defiéndelo como el mejor.",
      "Hazle a {novia} una entrevista exprés como reportera de chismes.",
      "Saluda al grupo como si fueras Miss Universo.",
      "Cuenta la historia de amor de los novios como si fuera una película de terror.",
      "Responde 5 preguntas rápidas del grupo sin decir «sí» ni «no».",
      "Haz en cámara lenta la entrada de las damas de honor.",
      "Actúa a {novio} intentando distinguir los 15 tonos de rosa de la decoración.",
      "Inventa el eslogan del matrimonio de {novia} y {novio}.",
      "Actúa como si acabaras de ganar la lotería y tienes que contárselo a {novia}.",
      "Haz de guía de museo mostrando el lugar de la fiesta.",
      "Cuenta la peor excusa que has dado para cancelar un plan.",
      "Imita el audio de WhatsApp más largo que te ha mandado alguien del grupo."
    ],
    prendas: [
      "Habla como robot hasta tu próximo turno.",
      "Ponte un bigote de papel o cinta hasta el siguiente juego.",
      "Confiesa tu crush famoso más inesperado.",
      "Durante 5 minutos, di «mi reina» antes de hablarle a cualquiera.",
      "Baila sola 15 segundos sin música.",
      "Aguanta 15 segundos en plancha mientras el grupo cuenta.",
      "Usa voz de locutora de radio romántica en tus próximas tres frases.",
      "Muestra el último emoji que usaste y actúalo.",
      "Narra en tercera persona todo lo que hagas durante 3 minutos.",
      "Quédate como estatua durante una ronda: sin moverte ni reírte.",
      "Cambia de lugar con quien elija {novia}.",
      "Ponte el velo de la novia (de papel o servilleta) hasta que pierda otra.",
      "Cuéntanos tu oso más reciente.",
      "Inventa y canta un jingle para una marca de papel higiénico.",
      "Camina como pingüino hasta la puerta y de regreso.",
      "Durante una ronda solo puedes hablar susurrando.",
      "Grita «¡Vivan los novios!» con todo tu corazón.",
      "Ponte los lentes de sol de otra invitada durante una ronda."
    ]
  },
  atrevido: {
    retos: [
      "Describe tu tipo ideal de pareja sin mencionar a nadie del grupo.",
      "Cuenta dónde fue tu primer beso y califícalo del 1 al 10.",
      "Lee la etiqueta de cualquier producto a la mano con la voz más seductora posible.",
      "Actúa la frase de ligue más mala que te hayan dicho.",
      "Lanza tu mejor mirada seductora a una cámara imaginaria.",
      "Hazle a {novia} una pregunta pícara sobre {novio}. Ella decide si contesta.",
      "Imita cómo crees que {novio} conquistó a {novia}.",
      "Describe en tres palabras la luna de miel ideal de {novia}.",
      "Inventa un piropo atrevido pero elegante para {novio} y díselo a {novia}.",
      "Haz un comercial de perfume con la voz más coqueta que tengas.",
      "Cuenta el mensaje más atrevido que mandaste (o casi mandaste) al chat equivocado. Puedes inventarlo.",
      "Baila 20 segundos como protagonista de video de reguetón.",
      "Di tres cosas que te parecen irresistibles en una pareja.",
      "Confiesa a qué famoso le darías un beso si pudieras.",
      "Haz una pasarela de supermodelo con la actitud más coqueta posible.",
      "Cuenta el lugar más raro donde te han pedido tu número.",
      "Adivina quién de los novios dio el primer beso. {novia} confirma.",
      "Lee un mensaje de amor para {novio} como si fueras {novia}, con la voz más melosa.",
      "Recrea en 20 segundos la escena más romántica de una película (los besos son al aire).",
      "Cuenta lo más atrevido que has hecho en una primera cita, versión apta para el grupo.",
      "Di una frase inocente que suene a doble sentido. El grupo califica.",
      "Di qué canción pondrías para una noche romántica.",
      "Describe a {novio} como si fuera un postre.",
      "Hazle a {novia} la pregunta más pícara que se te ocurra. Ella puede responder o decir «paso».",
      "Preséntate como agente secreta seductora con tu nombre clave.",
      "Dile a {novia} cuál crees que es su arma secreta para conquistar.",
      "Cuenta el apodo más cursi que le has dicho a una pareja.",
      "Muestra cómo coqueteas cuando alguien te gusta.",
      "Confiesa tu «green flag» favorita en una pareja.",
      "Escribe en una servilleta una frase coqueta para la tarjeta de luna de miel y léela.",
      "Di qué película romántica describe mejor tu vida amorosa y por qué.",
      "Imita a {novia} cuando le escribe a {novio} a las 2 de la mañana.",
      "Responde rápido: ¿besos o abrazos? ¿cena o desayuno en la cama? ¿playa o montaña? ¿romántica o aventurera?",
      "Cuenta tu amor de verano más divertido (o invéntalo).",
      "Di «Acepto» con la voz más seductora de tu vida.",
      "Elige entre tres famosos: con uno te casas, con otro tienes una cita y al otro lo mandas a la friendzone.",
      "Di cuál es el detalle más romántico que te gustaría que te hicieran.",
      "Dedícale a {novia} 15 segundos de bolero con mucho sentimiento.",
      "Describe en una frase cómo será la primera mañana de casados de {novia} y {novio}.",
      "Confiesa con qué prenda de ropa te sientes más irresistible.",
      "Muestra tu mejor «caminado de cuando tu ex te ve y se arrepiente».",
      "Hazle una declaración de amor dramática a un objeto de la mesa.",
      "Cuenta la peor frase de coqueteo que has usado tú.",
      "Di el emoji que mejor describe tu vida amorosa y explica por qué.",
      "Actúa a {novio} viendo a {novia} con el vestido por primera vez, versión telenovela.",
      "Haz una pregunta pícara al grupo que empiece con «¿Quién de aquí…?». Todas señalan a la vez."
    ],
    prendas: [
      "Habla con voz seductora de radio de medianoche hasta tu próximo turno.",
      "Ponle un apodo coqueto a cada persona del grupo.",
      "Cuenta un secreto de amor (que sí puedas contar).",
      "Durante una ronda, termina cada frase con «…en la cama».",
      "Baila 15 segundos como si nadie te estuviera viendo.",
      "Dile a {novia} un piropo de los buenos, de esos que dan risa.",
      "Escribe en tu celular la frase coqueta que te dicte el grupo y léela con drama (no la mandes).",
      "Imita a una diva de telenovela que descubre un engaño.",
      "Hazle una declaración de amor al primer objeto que toques.",
      "Confiesa quién fue tu crush de la adolescencia.",
      "Haz 10 sentadillas con pose de modelo.",
      "Pon tu cara más seductora en la próxima foto grupal (si hay foto).",
      "Durante 3 minutos, guiña un ojo cada vez que alguien diga tu nombre.",
      "Describe tu cita ideal como si fuera un anuncio de radio.",
      "Baila 15 segundos con {novia} la canción que elija el grupo (si ella quiere).",
      "Lanza besos al aire a todas como estrella de cine.",
      "Responde con total honestidad una pregunta del grupo (tienes derecho a vetar una).",
      "Habla con acento francés seductor hasta tu próximo turno."
    ]
  }
};

/* Checklist: días antes de la fiesta */
const CHECKLIST = [
  { grupo: "2 semanas antes", dias: 14, items: [
    "Pregúntale a {novia} qué nivel quiere (Tierno, Divertido o Atrevido). Ella decide.",
    "Define lugar, horario y presupuesto por persona.",
    "Crea el grupo de WhatsApp y manda la invitación (pestaña «Invitar»).",
    "Reserva el restaurante o el hospedaje, si aplica.",
    "Pídele a {novio} los audios para «Él dijo, ella dijo».",
    "Elige las preguntas del quiz y escribe las respuestas.",
    "Decide el dress code o la temática.",
    "Pregunta si alguien tiene alergias o restricciones de comida."
  ]},
  { grupo: "1 semana antes", dias: 7, items: [
    "Compra todo lo de la lista de compras.",
    "Confirma quién va y quién no.",
    "Junta las frases para «¿Quién lo dijo?» y los momentos para la línea del tiempo.",
    "Arma la playlist de la fiesta.",
    "Prepara un premio pequeño para las ganadoras.",
    "Reparte tareas: quién lleva comida, decoración y bocina.",
    "Abre esta app con internet e instálala en tu pantalla de inicio para usarla sin señal."
  ]},
  { grupo: "El día de la fiesta", dias: 0, items: [
    "Carga tu celular al 100 % y lleva cargador.",
    "Revisa que los audios de {novio} estén descargados en tu celular.",
    "Llega antes para acomodar decoración y materiales.",
    "Sube el brillo del celular para el modo fiesta.",
    "Recuérdale al grupo: {novia} manda, y cualquier reto se puede pasar.",
    "Organiza el regreso seguro: conductora designada, taxi o app de transporte."
  ]}
];

const COMPRAS_BASE = {
  casa: ["Botanas o pasabocas para {n} personas", "Bebidas variadas, con opciones sin alcohol", "Platos, vasos y servilletas desechables", "Globos y confeti rosa, lila y dorado", "Banda o corona de «Novia» para {novia}"],
  restaurante: ["Banda o corona de «Novia» para {novia}", "Confeti pequeño o un globo para la mesa (pregunta si el lugar lo permite)"],
  viaje: ["Botanas o pasabocas para {n} personas", "Bebidas variadas, con opciones sin alcohol", "Banda o corona de «Novia» para {novia}", "Bocina portátil", "Globos y confeti para el hospedaje", "Desayuno o brunch para la mañana siguiente"]
};
