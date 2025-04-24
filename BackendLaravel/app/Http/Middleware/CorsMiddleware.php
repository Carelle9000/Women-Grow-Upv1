<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CorsMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $allowedOrigins = config('cors.allowed_origins');
        $allowedMethods = config('cors.allowed_methods');
        $allowedHeaders = config('cors.allowed_headers');
        $exposedHeaders = config('cors.exposed_headers');
        $supportsCredentials = config('cors.supports_credentials');

        $response = $next($request);

        $response->headers->set('Access-Control-Allow-Origin', implode(', ', $allowedOrigins));
        $response->headers->set('Access-Control-Allow-Methods', implode(', ', $allowedMethods));
        $response->headers->set('Access-Control-Allow-Headers', implode(', ', $allowedHeaders));
        if (!empty($exposedHeaders)) {
            $response->headers->set('Access-Control-Expose-Headers', implode(', ', $exposedHeaders));
        }
        $response->headers->set('Access-Control-Allow-Credentials', $supportsCredentials ? 'true' : 'false');

        // Handle preflight OPTIONS request
        if ($request->isMethod('OPTIONS')) {
            $response->headers->set('Access-Control-Max-Age', config('cors.max_age'));
            $response->headers->set('Content-Type', 'application/json');
            $response->setContent(json_encode(['message' => 'CORS preflight request successful']));
        }

        return $response;
    }
}
