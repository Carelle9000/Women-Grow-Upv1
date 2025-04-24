<?php

return [
    'paths' => ['api/*'], // Chemins auxquels appliquer CORS
    'allowed_methods' => ['*'], // Méthodes HTTP autorisées (GET, POST, PUT, DELETE, etc.)
    'allowed_origins' => ['http://localhost:5173'], // Origines autorisées (URL de ton frontend)
    'allowed_origins_patterns' => [], // Schémas d'origine autorisés (regex)
    'allowed_headers' => ['*'], // Headers autorisés
    'exposed_headers' => [], // Headers exposés
    'max_age' => 0, // Durée de mise en cache des résultats CORS (en secondes)
    'supports_credentials' => true, // Autoriser les credentials (cookies, headers Authorization)
];
