<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // register() Valida y crea el usuario, retorna token [cite: 104]
    public function register(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255', 
            'email' => 'required|string|email|max:255|unique:users', 
            'password' => 'required|string|min:8|confirmed', 
        ]);

        $user = User::create([ 
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Genera el token API tipo Bearer [cite: 92, 113]
        $token = $user->createToken('auth-token')->plainTextToken; 

        return response()->json([
            'token' => $token, 
            'user' => $user 
        ], 201); 
    }

    // login() Verifica credenciales y retorna token [cite: 115, 118]
    public function login(Request $request) {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Intenta autenticar con las credenciales proporcionadas
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Credenciales incorrectas. Acceso no autorizado.'
            ], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();
        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user
        ], 200);
    }

    // logout() Elimina el token actual (requiere Auth middleware) [cite: 116, 119]
    public function logout(Request $request) {
        // Elimina el token que el usuario está utilizando en esta sesión específica
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Sesión cerrada exitosamente y token revocado.'
        ], 200);
    }

    // me() Retorna el usuario autenticado [cite: 117, 120]
    public function me(Request $request) {
        return response()->json($request->user(), 200);
    }
}