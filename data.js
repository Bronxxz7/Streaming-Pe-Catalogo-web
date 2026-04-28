// ============================
// 📲 CONFIGURACIÓN WHATSAPP
// ============================
const WHATSAPP_NUMBER = "51901738537";


// ============================
// 🧠 DATA PRINCIPAL DEL CATÁLOGO
// ============================
const catalogData = {

  // ============================
  // 🎬 CATEGORÍA: STREAMING
  // ============================
  streaming: {
    title: "Streaming Premium",
    description: "Cuentas streaming con diferentes tipos de plan.",

    products: [

      // 🔹 PRODUCTO 1 - NETFLIX
      {
        id: 1,
        name: "Netflix",
        badge: "+Combo",
        plans: [
          {
            name: "Premium",
            price: 15,
            stock: true,
            image: "./IMG/netflix.png",
            description: "1 mes | máxima calidad | Mejor experiencia.",
            details: [
              "Calidad Ultra HD en tus dispositivos favoritos 💻📱",
              "Máxima calidad",
              "Excelente estabilidad",
              "Atención prioritaria"
            ]
          }
        ]
      },

      // 🔹 PRODUCTO 2 - HBO MAX
      {
        id: 2,
        name: "MAX (HBO)",
        badge: "+Combo",
        plans: [
          {
            name: "Platino (4K)",
            price: 10,
            stock: true,
            image: "./IMG/HBO.JPG",
            description: "1 mes | 1 perfil personal | Excelente estabilidad.",
            details: [
              "MAX PLATINO 100% PREMIUM 4K",
              "FULL CALIDAD",
              "Perfil personal",
              "Entrega rápida"
            ]
          },
          {
            name: "Estándar",
            price: 7,
            stock: true,
            image: "./IMG/HBO.JPG",
            description: "1 mes | calidad estándar | Acceso estable.",
            details: [
              "Plan estándar",
              "Buena estabilidad",
              "Ideal para uso básico",
              "Soporte incluido"
            ]
          }
        ]
      },

      // 🔹 PRODUCTO 3 - DISNEY+
      {
        id: 3,
        name: "Disney+",
        badge: "+Combo",
        plans: [
          {
            name: "Premium",
            price: 8,
            stock: true,
            image: "./IMG/Disney.jpeg",
            description: "1 mes | 1 perfil personal | Incluye contenido variado.",
            details: [
              "🍿 Acceso Full: Disney, Pixar, Marvel, Star Wars",
              "🍿 ESPN (Fútbol y deportes en vivo)",
              "🍿 Hulu (Series exclusivas)",
              "🍿 Buena estabilidad"
            ]
          },
          {
            name: "Estándar",
            price: 8,
            stock: true,
            image: "./IMG/Disney.jpeg",
            description: "1 mes | plan estándar | Buena experiencia.",
            details: [
              "Plan estándar",
              "Buena calidad",
              "Soporte incluido",
              "Ideal para uso diario"
            ]
          }
        ]
      },

      // 🔹 PRODUCTO 4 - CRUNCHYROLL
      {
        id: 4,
        name: "Crunchyroll",
        badge: "+Combo",
        plans: [
          {
            name: "Mega Fan",
            price: 5,
            stock: true,
            image: "./IMG/CRUNCHY.png",
            description: "1 mes | 1 perfil personal | Excelente estabilidad.",
            details: [
              "Plan Mega Fan",
              "Ideal para anime",
              "Buena estabilidad",
              "Entrega rápida"
            ]
          }
        ]
      }

      
      ,
      {
        id: 5,
        name: "Prime Video",
        badge: "+Combo",
        plans: [
          {
            name: "Personal",
            price: 5,
            stock: true,
            image: "./IMG/Prime.jpeg",
            description: "1 mes | PERSONAL.",
            details: [
              ":🔥🍿 AMAZON PRIME VIDEO PREMIUM1 MES 🍿🔥",
              "Sin anuncios",
              "Modo offline",
              "Buena estabilidad"
            ]
          }
        ]
      }
       ,
      {
        id: 5,
        name: "Paramount",
        badge: "+Combo",
        plans: [
          {
            name: "Personal",
            price: 8,
            stock: true,
            image: "./IMG/Paramount.jpeg",
            description: "1 mes | UFC | AMPLIO CATALOGO .",
            details: [
              ":🔥🍿 AMAZON PRIME VIDEO PREMIUM1 MES 🍿🔥",
              "Sin anuncios",
              "Perfil Propio",
              "Buena estabilidad"
            ]
          }
        ]
      }
 ,
{
  id: 7,
  name: "Viki Rakuten",
  badge: "+Combo",
  plans: [
    {
      name: "Personal",
      price: 8,
      stock: true,
      image: "./IMG/viki.png",
      description: "1 mes | Dramas Asiáticos | Premium.",
      details: [
        "📺 Contenido coreano y asiático",
        "Sin anuncios",
        "Alta calidad",
        "Buena estabilidad"
      ]
    }
  ]
},

// 🔹 PRODUCTO - YOUTUBE PREMIUM
{
  id: 8,
  name: "YouTube Premium",
  badge: "+Combo",
  plans: [
    {
      name: "1 Mes",
      price: 12,
      stock: true,
      image: "./IMG/ytpre.jpeg",
      description: "1 mes | Sin anuncios | Música incluida.",
      details: [
        "🎵 YouTube Music incluido",
        "Sin anuncios",
        "Reproducción en segundo plano",
        "Descargas offline"
      ]
    },
    {
      name: "Familiar",
      price: 22,
      stock: true,
      image: "./IMG/ytpre.jpeg",
      description: "1 mes | Plan familiar | Hasta 6 perfiles.",
      details: [
        "👨‍👩‍👧‍👦 Hasta 5 miembros",
        "Sin anuncios",
        "YouTube Music incluido",
        "Uso simultáneo"
      ]
    },
    {
      name: "3 Meses",
      price: 30,
      stock: true,
      image: "./IMG/ytpre.jpeg",
      description: "3 meses | Ahorro incluido | Sin anuncios.",
      details: [
        "📆 Duración de 3 meses",
        "Sin anuncios",
        "YouTube Music incluido",
        "Descargas offline"
      ]
    }
  ]
}

,
{
  id: 9,
  name: "Apple TV+",
  badge: "+Combo",
  plans: [
    {
      name: "Personal",
      price: 9,
      stock: true,
      image: "./IMG/appletv.png",
      description: "1 mes | Series exclusivas | Alta calidad.",
      details: [
        "🍎 Contenido original Apple",
        "🍿🔥SOLO PARA ANDROID 🍿🔥 ",
        "Alta calidad",
        "Buena estabilidad"
      ]
    }
  ]
},

{
  id: 10,
  name: "ViX Premium",
  badge: "+Combo",
  plans: [
    {
      name: "Personal",
      price: 6,
      stock: true,
      image: "./IMG/vix.png",
      description: "1 mes | Novelas | Deportes.",
      details: [
        "📺 Contenido latino",
        "Películas y novelas",
        "Buena calidad",
        "Acceso estable"
      ]
    }
  ]
},

{
  id: 11,
  name: "IPTV",
  badge: "+TV",
  plans: [
    {
      name: "Cuenta Completa",
      price: 15,
      stock: true,
      image: "./IMG/iptv.png",
      description: "1 mes | Canales en vivo | Full contenido.",
      details: [
        "📡 Canales en vivo",
        "Películas y series",
        "Deportes premium",
        "Cuenta completa"
      ]
    }
  ]
}
,
{
  id: 12,
  name: "DGO + Liga 1 MAX",
  badge: "+Deportes",
  plans: [
    {
      name: "Personal",
      price: 25,
      stock: true,
      image: "./IMG/dgo.png",
      description: "1 mes | Plan Plata + Liga 1 MAX.",
      details: [
        "⚽ Liga 1 MAX en vivo",
        "📺 Canales deportivos",
        "🎬 Películas y series",
        "Cuenta personal"
      ]
    }
  ]
}
,
{
  id: 13,
  name: "Spotify Premium",
  badge: "Música",
  plans: [
    {
      name: "Personal",
      price: 12,
      stock: true,
      image: "./IMG/spotify.png",
      description: "3 meses | Plan Premium.",
      details: [
        "🎧 Música sin anuncios",
        "⬇️ Descarga offline",
        "🎶 Calidad alta",
        "Cuenta personal"
      ]
    }
  ]
},
{
  id: 14,
  name: "Deezer Premium",
  badge: "Música",
  plans: [
    {
      name: "Personal",
      price: 15,
      stock: true,
      image: "./IMG/deezer.png",
      description: "3 meses | Plan Premium.",
      details: [
        "🎧 Música sin anuncios",
        "⬇️ Descarga offline",
        "🎶 Sonido HiFi",
        "Cuenta personal"
      ]
    }
  ]
}
    ]
  },


  // ============================
  // 💼 OFFICE
  // ============================
  office: {
    title: "Office y Productividad",
    description: "Licencias y herramientas para trabajo y estudio.",

    products: [

  // ============================
  // 🔹 MICROSOFT OFFICE PERMANENTE
  // ============================
  {
    id: 101,
    name: "Microsoft Office Permanente",
    badge: "+Licencia",
    plans: [
      {
        name: "Full",
        price: 40,
        stock: true,
        image: "./IMG/office perma.png",
        description: "Activación permanente | Compatible con PC y Laptop.",
        details: [
          "Licencia permanente",
          "Compatible con PC y Laptop",
          "Activación rápida",
          "Incluye Word, Excel, PowerPoint"
        ]
      }
    ]
  },

  // ============================
  // 🔹 WINDOWS 10 RETAIL KEY
  // ============================
  {
    id: 102,
    name: "Windows 10 Retail Key",
    badge: "+Licencia",
    plans: [
      {
        name: "Retail",
        price: 20,
        stock: true,
        image: "./IMG/windows10.jpeg",
        description: "Clave original activable online | Transferible.",
        details: [
          "Clave original",
          "Activación online",
          "Transferible",
          "Compatible con Windows 10"
        ]
      }
    ]
  },

  // ============================
  // 🔹 WINDOWS 11 PERMANENTE
  // ============================
  {
    id: 103,
    name: "Windows 11 Permanente",
    badge: "+Licencia",
    plans: [
      {
        name: "OEM",
        price: 40,
        stock: true,
        image: "./IMG/windows11.jpeg",
        description: "Activación digital original | Compatible con equipos modernos.",
        details: [
          "Licencia original",
          "Activación digital",
          "Compatible con equipos modernos",
          "Instalación sencilla"
        ]
      }
    ]
  },

  // ============================
  // 🔹 OFFICE 365 PRO PLUS
  // ============================
 {
  id: 105,
  name: "Google Drive 5TB",
  badge: "+Cloud",
  plans: [
    {
      name: "1 Mes",
      price: 8,
      stock: true,
      image: "./IMG/drive.png",
      description: "5TB almacenamiento |📧 Gemini en Gmail, Docs y más.",
      details: [
        "⚡ Beneficios Google One AI Pro",
        "☁️ 5TB almacenamiento compartido",
        "🤖 Gemini 3.1 Pro",
        "🎥 Acceso limitado a Veo 3.1",
        "🎬 Flow mejorado",
        "🧪 Whisk con Veo 3",
        "💎 1,000 créditos IA mensuales",
        "📓 NotebookLM avanzado",
        "📧 Gemini en Gmail, Docs y más",
        "📞 Google Meet ilimitado",
        "📅 Calendario mejorado"
      ]
    },
    {
      name: "2 Meses",
      price: 15,
      stock: true,
      image: "./IMG/drive.png",
      description: "5TB almacenamiento | 2 meses | Google One AI Pro.",
      details: [
        "⚡ Beneficios Google One AI Pro",
        "☁️ 5TB almacenamiento compartido",
        "🤖 Gemini 3.1 Pro",
        "🎥 Acceso limitado a Veo 3.1",
        "🎬 Flow mejorado",
        "🧪 Whisk con Veo 3",
        "💎 1,000 créditos IA mensuales",
        "📓 NotebookLM avanzado",
        "📧 Gemini en Gmail, Docs y más",
        "📞 Google Meet ilimitado",
        "📅 Calendario mejorado"
      ]
    },
    {
      name: "6 Meses",
      price: 30,
      stock: true,
      image: "./IMG/drive.png",
      description: "5TB almacenamiento | 6 meses | Google One AI Pro.",
      details: [
        "⚡ Beneficios Google One AI Pro",
        "☁️ 5TB almacenamiento compartido",
        "🤖 Gemini 3.1 Pro",
        "🎥 Acceso limitado a Veo 3.1",
        "🎬 Flow mejorado",
        "🧪 Whisk con Veo 3",
        "💎 1,000 créditos IA mensuales",
        "📓 NotebookLM avanzado",
        "📧 Gemini en Gmail, Docs y más",
        "📞 Google Meet ilimitado",
        "📅 Calendario mejorado"
      ]
    },
    {
      name: "1 Año",
      price: 50,
      stock: true,
      image: "./IMG/drive.png",
      description: "5TB almacenamiento | 1 año | Google One AI Pro.",
      details: [
        "⚡ Beneficios Google One AI Pro",
        "☁️ 5TB almacenamiento compartido",
        "🤖 Gemini 3.1 Pro",
        "🎥 Acceso limitado a Veo 3.1",
        "🎬 Flow mejorado",
        "🧪 Whisk con Veo 3",
        "💎 1,000 créditos IA mensuales",
        "📓 NotebookLM avanzado",
        "📧 Gemini en Gmail, Docs y más",
        "📞 Google Meet ilimitado",
        "📅 Calendario mejorado"
      ]
    }
  ]
}

]
  },


  // ============================
  // 📱 APPS
  // ============================
  apps: {
    title: "Apps Premium",
    description: "Aplicaciones y herramientas digitales premium.",

    products: [
      {
        id: 201,
        name: "Canva Pro",
        badge: "+App",
        plans: [
          {
            name: "Personal",
            price: 12,
            stock: true,
            image: "./img/canva.jpeg",
            description: "1 mes | acceso premium.",
            details: [
              "Funciones premium",
              "Diseño profesional",
              "Plantillas exclusivas"
            ]
          }
        ]
      }
      ,{
  id: 202,
  name: "Duolingo Super",
  badge: "+App",
  plans: [
    {
      name: "Personal",
      price: 12,
      stock: true,
      image: "./img/duolingo.png",
      description: "1 mes | acceso premium.",
      details: [
        "🚫 Sin anuncios",
        "📚 Lecciones ilimitadas",
        "🔥 Práctica avanzada"
      ]
    }
  ]
},
{
  id: 203,
  name: "ChatGPT",
  badge: "+IA",
  plans: [
    {
      name: "Personal",
      price: 15,
      stock: true,
      image: "./img/chatgpt.png",
      description: "1 mes | acceso premium.",
      details: [
        "🤖 IA avanzada",
        "⚡ Respuestas rápidas",
        "🧠 Uso ilimitado"
      ]
    },
    {
      name: "APK",
      price: 8,
      stock: true,
      image: "./img/chatgpt-apk.png",
      description: "Acceso modificado.",
      details: [
        "📱 Versión APK",
        "💸 Económico",
        "⚠️ Funciones limitadas"
      ]
    }
  ]
},
{
  id: 204,
  name: "CapCut Pro",
  badge: "+App",
  plans: [
    {
      name: "APK",
      price: 8,
      stock: true,
      image: "./img/capcut.png",
      description: "Versión APK premium.",
      details: [
        "🎬 Edición sin marca de agua",
        "🎞️ Efectos premium",
        "📱 Uso completo"
      ]
    },
    {
      name: "personal",
      price: 15,
      stock: true,
      image: "./img/capcut.png",
      description: "Cuenta Personal 35 DÍAS.",
      details: [
        "📱 Cuenta Propia",
        "💸 Estabilidad",
        "⚠️ Funciones limitadas"
      ]
    }
  ]
},
{
  id: 205,
  name: "Perplexity Pro",
  badge: "+IA",
  plans: [
    {
      name: "Personal",
      price: 7,
      stock: true,
      image: "./img/perplexity.png",
      description: "1 mes | acceso pro.",
      details: [
        "🔍 Búsqueda con IA",
        "📚 Respuestas precisas",
        "⚡ Acceso rápido"
      ]
    }
  ]
},
{
  id: 206,
  name: "DramaBox",
  badge: "+Entretenimiento",
  plans: [
    {
      name: "Personal",
      price: 8,
      stock: true,
      image: "./img/dramabox.jpeg",
      description: "1 mes | acceso premium.",
      details: [
        "🎬 Series cortas",
        "📱 Contenido exclusivo",
        "🚫 Sin anuncios"
      ]
    }
  ]
},
{
  id: 207,
  name: "ReelShort",
  badge: "+Entretenimiento",
  plans: [
    {
      name: "Personal",
      price: 8,
      stock: true,
      image: "./img/reelshort.jpeg",
      description: "1 mes | acceso premium.",
      details: [
        "🎥 Historias cortas",
        "📱 Contenido viral",
        "🚫 Sin anuncios"
      ]
    }
  ]
},
{
  id: 209,
  name: "Discord Nitro",
  badge: "+Gaming",
  plans: [
    {
      name: "3 Meses",
      price: 25,
      stock: true,
      image: "./img/discord.jpeg",
      description: "3 meses + 2 server boosts.",
      details: [
        "🔥 Nitro completo",
        "🚀 2 Server Boosts",
        "🎮 Beneficios exclusivos"
      ]
    }
  ]
}
    ]
  },


 // ============================
// ⭐ XSERVICIO
// ============================
xservicio: {
  title: "Xservicio",
  description: "Servicios especiales o personalizados.",
  products: [
    
    {
      id: 301,
      name: "Investigación Rápida",
      badge: "+Especial",
      plans: [
        {
          name: "Servicio",
          price: 10,
          stock: true,
          image: "./img/simple.png",
          description: "⚡ INFORMACIÓN AL INSTANTE - SOLO PERÚ 🇵🇪 ⚡",
          details: [
            "🎯 SOLO NECESITO: 📞Teléfono, 👤Nombre completo o 🪪DNI.",
            "🎯 Ficha RENIEC ",
            "📄 Foto DN",
            "🌳 Árbol Genealógico"
          ]
        }
      ]
    },

    {
      id: 302,
      name: "Consulta General",
      badge: "+Especial",
      plans: [
        {
          name: "Servicio",
          price: 40,
          stock: true,
          image: "./img/consulta.png",
          description: "AVANZADO - CONSULTA CON DNI",
          details: [
            "📊 Análisis de información",
            "📄 RENIEC",
            "🔍 FAMILIAR",
            "⚖️ ANTECEDENTES",
            "⚖️ MÁS"
          ]
        }
      ]
    },

    {
      id: 303,
      name: "🩺 Descanso Medico en PDF 🩺",
      badge: "+Especial",
      plans: [
        {
          name: "Servicio",
          price: 20,
          stock: true,
          image: "./IMG/verificacion.jpg",
          description: "💉 Obten tu descanso medio minsa o essalud",
          details: [
            "🧾  RECENTA MEDICA",
            "🔍 MINSA ESSALUD O CLINICA",
            "📄  LIMA Y PROVINCIAS",
            "⚖️ LOS DIAS QUE DECEES"
          ]
        }
      ]
    }

  ]
},

  // ============================
// 🤖 BOTS Y SEGUIDORES
// ============================
bots: {
  title: "Bots y Seguidores",
  description: "Automatización y crecimiento en redes sociales.",

  products: [
    {
      id: 401,
      name: "TikTok",
      badge: "+TikTok",
      plans: [
        {
          name: "Likes",
          price: 10,
          stock: true,
          image: "./IMG/tiki.png",
          description: "Likes para tiki.png",
          details: ["❤️ Likes reales", "⚡ Entrega rápida", "📈 Más alcance"]
        },
        {
          name: "Vistas",
          price: 0,
          stock: true,
          image: "./IMG/tiki.png",
          description: "Vistas para TikTok.",
          details: ["👁️ Vistas inmediatas", "🔥 Para el FYP", "📈 Más alcance"]
        },
        {
          name: "Seguidores",
          price: 0,
          stock: true,
          image: "./IMG/tiki.png",
          description: "Seguidores para TikTok.",
          details: ["👥 Perfiles activos", "📈 Crecimiento real", "✅ Entrega gradual"]
        },
        {
          name: "Live",
          price: 0,
          stock: true,
          image: "./IMG/tiki.png",
          description: "Viewers en vivo TikTok.",
          details: ["🔴 Tiempo real", "💰 Aumenta monetización", "🚀 Trending en vivo"]
        }
      ]
    },
    {
      id: 402,
      name: "Instagram",
      badge: "+Instagram",
      plans: [
        {
          name: "Likes",
          price: 0,
          stock: true,
          image: "./IMG/instagram.jpeg",
          description: "Likes para Instagram.",
          details: ["❤️ Likes reales", "⚡ Entrega rápida", "📈 Más engagement"]
        },
        {
          name: "Vistas",
          price: 0,
          stock: true,
          image: "./IMG/instagram.jpeg",
          description: "Vistas para Reels/Stories.",
          details: ["👁️ Vistas rápidas", "🎬 Reels y Stories", "🔥 Página explorar"]
        },
        {
          name: "Seguidores",
          price: 0,
          stock: true,
          image: "./IMG/instagram.jpeg",
          description: "Seguidores para Instagram.",
          details: ["👥 Perfiles activos", "📈 Crecimiento real", "✅ Entrega gradual"]
        },
        {
          name: "Live",
          price: 0,
          stock: true,
          image: "./IMG/instagram.jpeg",
          description: "Viewers en vivo Instagram.",
          details: ["🔴 Tiempo real", "🔔 Más notificaciones", "🚀 Top lives"]
        }
      ]
    },
    {
      id: 403,
      name: "Facebook",
      badge: "+Facebook",
      plans: [
        {
          name: "Likes",
          price: 0,
          stock: true,
          image: "./IMG/face.jpeg",
          description: "Likes para Facebook.",
          details: ["👍 Perfiles reales", "⚡ Entrega rápida", "📈 Más alcance"]
        },
        {
          name: "Vistas",
          price: 0,
          stock: true,
          image: "./IMG/face.jpeg",
          description: "Vistas para videos Facebook.",
          details: ["👁️ Vistas rápidas", "🎬 Videos y Reels", "🔥 Recomendado"]
        },
        {
          name: "Seguidores",
          price: 0,
          stock: true,
          image: "./IMG/face.jpeg",
          description: "Seguidores para Facebook.",
          details: ["👥 Perfiles activos", "📈 Crecimiento real", "✅ Entrega gradual"]
        },
        {
          name: "Live",
          price: 0,
          stock: true,
          image: "./IMG/face.jpeg",
          description: "Viewers en vivo Facebook.",
          details: ["🔴 Tiempo real", "📢 Más alcance orgánico", "🚀 Trending"]
        }
      ]
    },
    {
      id: 404,
      name: "Twitch",
      badge: "+Twitch",
      plans: [
        {
          name: "Likes",
          price: 0,
          stock: true,
          image: "./IMG/twich.png",
          description: "Likes en clips Twitch.",
          details: ["💜 Boost tu clip", "⚡ Entrega rápida", "📈 Más engagement"]
        },
        {
          name: "Vistas",
          price: 0,
          stock: true,
          image: "./IMG/twich.png",
          description: "Vistas para clips/VODs.",
          details: ["👁️ Vistas rápidas", "🎮 Clips y VODs", "📈 Impulsa tu canal"]
        },
        {
          name: "Seguidores",
          price: 0,
          stock: true,
          image: "./IMG/twich.png",
          description: "Seguidores para Twitch.",
          details: ["👥 Perfiles activos", "🎮 Impulsa afiliado", "✅ Entrega gradual"]
        },
        {
          name: "Live",
          price: 0,
          stock: true,
          image: "./IMG/twich.png",
          description: "Viewers en stream Twitch.",
          details: ["🔴 Tiempo real", "🎮 Sube en rankings", "🚀 Top del directorio"]
        }
      ]
    }
  ]
},

// ============================
// 🌐 WEB
// ============================
web: {
  title: "Páginas Web",
  description: "Landing pages y webs profesionales.",

  products: [
    {
      id: 501,
      name: "Próximamente",
      badge: "+Web",
      plans: [
        {
          name: "En desarrollo",
          price: 0,
          stock: false,
          image: "./IMG/tipos-paginas-web.jpg",
          description: "Nuevos servicios web estarán disponibles pronto.",
          details: [
            "🚀 Catálogos digitales",
            "🛒 Tiendas virtuales",
            "📊 Dashboards y aplicativos",
            "✨ Mucho más en camino"
          ]
        }
      ]
    }
  ]
}
}