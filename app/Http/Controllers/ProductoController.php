<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource. (Read - Todos)
     */
    public function index()
    {
        // Recupera todos los productos de la base de datos
        $productos = Producto::all();
        // Retorna la lista con un código 200 (OK)
        return response()->json($productos, 200);
    }

    /**
     * Store a newly created resource in storage. (Create)
     */
    public function store(Request $request)
    {
        // Validación básica de los datos recibidos
        $request->validate([
            'nombre' => 'required|string|max:255',
            'precio' => 'required|numeric',
            'stock' => 'required|integer',
        ]);

        // Crea el producto en la base de datos
        $producto = Producto::create($request->all());

        // Retorna el producto creado con un código 201 (Created)
        return response()->json($producto, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Producto $producto)
    {
        return response()->json($producto, 200);
    }

    /**
     * Update the specified resource in storage. (Update)
     */
    public function update(Request $request, $id)
    {
        // Buscamos el producto por ID, si no existe lanza un error 404 de forma automática
        $producto = Producto::findOrFail($id);

        // Validación de los datos a actualizar
        $request->validate([
            'nombre' => 'sometimes|required|string|max:255',
            'precio' => 'sometimes|required|numeric',
            'stock' => 'sometimes|required|integer',
        ]);

        // Actualiza el producto con los nuevos datos
        $producto->update($request->all());

        // Retorna el producto modificado con un código 200 (OK)
        return response()->json($producto, 200);
    }

    /**
     * Remove the specified resource from storage. (Delete)
     */
    public function destroy($id)
    {
        // Buscamos el producto por ID
        $producto = Producto::findOrFail($id);

        // Elimina el registro
        $producto->delete();

        // Retorna una respuesta vacía con un código 204 (No Content)
        return response()->json(null, 204);
    }
}