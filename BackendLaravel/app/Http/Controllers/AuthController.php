<?php

namespace App\Http\Controllers;


use App\Models\User;
//use App\Models\Role;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rule;


class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {

        $request->validate([
            'prenom' => 'required|string|max:255',
            'nom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'telephone' => 'required|nullable|string|max:255',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'adresse' => 'required|nullable|string|max:255',
            'ville' => 'required|nullable|string|max:255',
            'age' => 'required|nullable|integer',
            'pays' => 'required|nullable|string|max:255',
            'password' => 'required|string|min:8|confirmed',
            'password_confirmation' => 'required|string|max:255',
        ]);


        $user = User::create([
            'prenom' => $request->prenom,
            'nom' => $request->nom,
            'email' => $request->email,
            'telephone' => $request->telephone,
            'adresse' => $request->adresse,
            'photo' => $request->hasFile('photo') ? $request->file('photo')->store('photos', 'public') : null,
            'ville' => $request->ville,
            'age' => $request->age,
            'pays' => $request->pays,
            'password' => Hash::make($request->password),
            'role_id' => 2, // Assignation du rôle
            
        ]);

          // Générer un token Sanctum
        $token = $user->createToken('api_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($credentials)) {
            $user = Auth::user();
            $request->session()->regenerate(); // Créer une session
            return response()->json([
                'message' => 'Identifiants invalides'
            ], 401);
        }

        $user = User::where('email', $request->email)
                  ->with('role') // Charger la relation
                  ->firstOrFail();

        return response()->json([
            'user' => $user,
            'token' => $user->createToken('auth_token')->plainTextToken
        ]);
    }

    // Le reste du contrôleur reste inchangé
    public function logout(Request $request): JsonResponse
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'Déconnexion réussie'
        ]);
    }

public function update(Request $request, $id): JsonResponse
{
    $user = User::findOrFail($id);

    $request->validate([
        'prenom' => 'required|string|max:255',
        'nom' => 'required|string|max:255',
        'email' => 'required|email|max:255|unique:users,email,' . $user->id,
        'telephone' => 'nullable|string|max:255',
        'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        'adresse' => 'nullable|string|max:255',
        'ville' => 'nullable|string|max:255',
        'age' => 'nullable|integer',
        'pays' => 'nullable|string|max:255',
        'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
    ]);

    // Stockage de la nouvelle photo si présente
    if ($request->hasFile('photo') && $request->file('photo')->isValid()) {
        $photoPath = $request->file('photo')->store('photos', 'public');
        $user->photo = $photoPath;
    }

    $user->prenom = $request->prenom;
    $user->nom = $request->nom;
    $user->email = $request->email;
    $user->telephone = $request->telephone;
    $user->adresse = $request->adresse;
    $user->ville = $request->ville;
    $user->age = $request->age;
    $user->pays = $request->pays;

    if ($request->filled('password')) {
        $user->password = Hash::make($request->password);
    }

    $user->save();

    return response()->json([
        'message' => 'Utilisateur mis à jour avec succès',
        'user' => $user,
    ]);
}

public function destroy($id): JsonResponse
{
    $user = User::findOrFail($id);

    // Si tu veux aussi supprimer la photo du stockage :
    if ($user->photo && \Storage::disk('public')->exists($user->photo)) {
        \Storage::disk('public')->delete($user->photo);
    }

    $user->delete();

    return response()->json([
        'message' => 'Utilisateur supprimé avec succès.',
    ]);
}
public function index()
{
    //$users = User::with('user')->latest()->get();
    return response()->json(User::all());
}
    
public function me()
{
    return response()->json(auth()->user());
}
}