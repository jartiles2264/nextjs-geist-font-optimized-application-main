(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/lib/data.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "delay": (()=>delay),
    "mockForumPosts": (()=>mockForumPosts),
    "mockNotes": (()=>mockNotes),
    "mockQuizzes": (()=>mockQuizzes),
    "mockUsers": (()=>mockUsers),
    "subjects": (()=>subjects)
});
const mockUsers = [
    {
        id: '1',
        name: 'Ana García',
        email: 'ana@estudiante.com',
        reputation: 4.8,
        createdAt: new Date('2024-01-15')
    },
    {
        id: '2',
        name: 'Carlos López',
        email: 'carlos@estudiante.com',
        reputation: 4.2,
        createdAt: new Date('2024-02-10')
    },
    {
        id: '3',
        name: 'María Rodríguez',
        email: 'maria@estudiante.com',
        reputation: 4.9,
        createdAt: new Date('2024-01-20')
    }
];
const mockNotes = [
    {
        id: '1',
        title: 'Introducción al Cálculo Diferencial',
        content: 'Conceptos básicos de límites y derivadas. Incluye ejemplos prácticos y ejercicios resueltos.',
        subject: 'Matemáticas',
        authorId: '1',
        authorName: 'Ana García',
        rating: 4.7,
        ratingsCount: 23,
        createdAt: new Date('2024-03-01')
    },
    {
        id: '2',
        title: 'Leyes de Newton - Mecánica Clásica',
        content: 'Explicación detallada de las tres leyes de Newton con ejemplos del mundo real.',
        subject: 'Física',
        authorId: '2',
        authorName: 'Carlos López',
        rating: 4.5,
        ratingsCount: 18,
        createdAt: new Date('2024-03-05')
    },
    {
        id: '3',
        title: 'Tabla Periódica y Propiedades',
        content: 'Organización de elementos químicos y sus propiedades fundamentales.',
        subject: 'Química',
        authorId: '3',
        authorName: 'María Rodríguez',
        rating: 4.8,
        ratingsCount: 31,
        createdAt: new Date('2024-03-10')
    }
];
const mockQuizzes = [
    {
        id: '1',
        title: 'Derivadas Básicas',
        subject: 'Matemáticas',
        questions: [
            {
                id: '1',
                question: '¿Cuál es la derivada de x²?',
                options: [
                    'x',
                    '2x',
                    'x²',
                    '2'
                ],
                correctAnswer: 1
            },
            {
                id: '2',
                question: '¿Cuál es la derivada de una constante?',
                options: [
                    '1',
                    '0',
                    'La misma constante',
                    'x'
                ],
                correctAnswer: 1
            }
        ],
        authorId: '1',
        authorName: 'Ana García',
        rating: 4.6,
        ratingsCount: 15,
        createdAt: new Date('2024-03-12')
    },
    {
        id: '2',
        title: 'Fuerzas y Movimiento',
        subject: 'Física',
        questions: [
            {
                id: '1',
                question: '¿Cuál es la unidad de fuerza en el SI?',
                options: [
                    'Joule',
                    'Newton',
                    'Pascal',
                    'Watt'
                ],
                correctAnswer: 1
            },
            {
                id: '2',
                question: 'La segunda ley de Newton establece que F = ?',
                options: [
                    'mv',
                    'ma',
                    'mg',
                    'mv²'
                ],
                correctAnswer: 1
            }
        ],
        authorId: '2',
        authorName: 'Carlos López',
        rating: 4.4,
        ratingsCount: 12,
        createdAt: new Date('2024-03-15')
    }
];
const mockForumPosts = [
    {
        id: '1',
        title: '¿Cómo resolver integrales por partes?',
        content: 'Tengo dificultades para entender el método de integración por partes. ¿Alguien puede explicar el proceso paso a paso?',
        subject: 'Matemáticas',
        authorId: '2',
        authorName: 'Carlos López',
        replies: [
            {
                id: '1',
                content: 'La fórmula es ∫u dv = uv - ∫v du. Primero identifica u y dv, luego aplica la fórmula.',
                authorId: '1',
                authorName: 'Ana García',
                votes: 8,
                createdAt: new Date('2024-03-16')
            },
            {
                id: '2',
                content: 'Un truco es recordar LIATE: Logarítmicas, Inversas trigonométricas, Algebraicas, Trigonométricas, Exponenciales.',
                authorId: '3',
                authorName: 'María Rodríguez',
                votes: 12,
                createdAt: new Date('2024-03-17')
            }
        ],
        votes: 5,
        createdAt: new Date('2024-03-15')
    },
    {
        id: '2',
        title: 'Diferencia entre velocidad y aceleración',
        content: '¿Puede alguien explicar claramente la diferencia entre velocidad y aceleración con ejemplos?',
        subject: 'Física',
        authorId: '3',
        authorName: 'María Rodríguez',
        replies: [
            {
                id: '1',
                content: 'Velocidad es qué tan rápido te mueves, aceleración es qué tan rápido cambia tu velocidad.',
                authorId: '1',
                authorName: 'Ana García',
                votes: 6,
                createdAt: new Date('2024-03-18')
            }
        ],
        votes: 3,
        createdAt: new Date('2024-03-17')
    }
];
const subjects = [
    'Matemáticas',
    'Física',
    'Química',
    'Historia',
    'Literatura',
    'Inglés',
    'Biología',
    'Programación'
];
const delay = (ms)=>new Promise((resolve)=>setTimeout(resolve, ms));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/context/AuthContext.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "AuthProvider": (()=>AuthProvider),
    "useAuth": (()=>useAuth)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Simular persistencia de sesión
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            const savedUser = localStorage.getItem('currentUser');
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
        }
    }["AuthProvider.useEffect"], []);
    const login = async (email, password)=>{
        setLoading(true);
        try {
            // Simular delay de red
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["delay"])(1000);
            // Buscar usuario en datos simulados
            const foundUser = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockUsers"].find((u)=>u.email === email);
            if (foundUser && password.length >= 6) {
                setUser(foundUser);
                localStorage.setItem('currentUser', JSON.stringify(foundUser));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error en login:', error);
            return false;
        } finally{
            setLoading(false);
        }
    };
    const register = async (name, email, password)=>{
        setLoading(true);
        try {
            // Simular delay de red
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["delay"])(1000);
            // Verificar si el email ya existe
            const existingUser = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockUsers"].find((u)=>u.email === email);
            if (existingUser) {
                return false;
            }
            // Crear nuevo usuario
            const newUser = {
                id: Date.now().toString(),
                name,
                email,
                reputation: 0,
                createdAt: new Date()
            };
            // Agregar a la lista de usuarios simulados
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockUsers"].push(newUser);
            setUser(newUser);
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            return true;
        } catch (error) {
            console.error('Error en registro:', error);
            return false;
        } finally{
            setLoading(false);
        }
    };
    const logout = ()=>{
        setUser(null);
        localStorage.removeItem('currentUser');
    };
    const value = {
        user,
        login,
        register,
        logout,
        loading
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/AuthContext.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
}
_s(AuthProvider, "Vot/f62t7wRmBOt67JIN3/+eVxk=");
_c = AuthProvider;
function useAuth() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
}
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_d9a6ed8e._.js.map