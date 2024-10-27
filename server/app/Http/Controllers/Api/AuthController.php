<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends BaseController
{
    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|min:8',
            'c_password' => 'required|min:8|same:password',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors()->first(), $validator->errors());
        }

        $data = $request->all();
        $data['password'] = bcrypt($data['password']);
        unset($data['c_password']);

        $user = User::create($data);
        $success['token'] = $user->createToken('MyApp')->plainTextToken;
        $success['id'] = $user->id;
        $success['email'] = $user->email;
        $success['name'] = $user->name;
        return $this->sendResponse($success, 'User register successfully.');
    }

    /**
     * Login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request): JsonResponse
    {
        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($data)) {
            return $this->sendError('Unauthorised.', ['error' => 'Unauthorised']);
        }

        $user = Auth::user();
        $success['token'] = $user->createToken('MyApp')->plainTextToken;
        $success['id'] = $user->id;
        $success['email'] = $user->email;
        $success['name'] = $user->name;
        return $this->sendResponse($success, 'User login successfully.');
    }

    public function logout()
    {
        if (!auth()->user()) {
            return response()->json([
                "message" => "Unauthorized"
            ], 401);
        }

        auth()->user()->tokens()->delete();

        return response()->json([
            "message" => "logged out"
        ]);
    }

    public function getUser()
    {
        return Auth::user();
    }
}
