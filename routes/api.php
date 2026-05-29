<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductoController;

/*
|--------------------------------------------------------------------------
| RUTAS PÚBLICAS
|--------------------------------------------------------------------------
*/
// Rutas de autenticación inicial no protegidas
Route::post('/register', [AuthController::class, 'register']); 
Route::post('/login', [AuthController::class, 'login']); 


/*
|--------------------------------------------------------------------------
| RUTAS PROTEGIDAS (Requieren Token Bearer de Sanctum)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () { 

    // Obtener los datos del usuario logueado actualmente
    Route::get('/me', [AuthController::class, 'me']); 
    
    // Revocar el token y cerrar la sesión
    Route::post('/logout', [AuthController::class, 'logout']); 

    // CRUD de productos protegido (Operaciones de la Práctica 1)
    Route::apiResource('productos', ProductoController::class); 

});