<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    public function companies()
    {
        $companies = Company::whereHas('users', function($query){
            return $query->where('users.id', '=', \Auth::user()->id);
        })
                            ->get();

        return response()->json([
                                    'msg'  => '¡Success!',
                                    'data' => $companies,
                                ],
                                Response::HTTP_OK
        );
    }

    public function store(Request $request)
    {
        $validator = validate($request->all(), User::rules());

        if($validator->fails())
        {
            return response()->json([
                                        'msg'    => '¡Invalid Data!',
                                        'errors' => $validator->errors(),
                                    ],
                                    Response::HTTP_BAD_REQUEST
            );
        }

        $user = new User($request->only(User::getFillables()));

        if(secureSave($user))
        {
            return response()
                ->json([
                           'msg'  => '¡Success!',
                           'user' => $user,
                       ],
                       Response::HTTP_CREATED
                );
        }
        else
        {
            return response()
                ->json([
                           'msg' => '¡Error!',
                       ],
                       Response::HTTP_INTERNAL_SERVER_ERROR
                );
        }
    }

    public function whoami()
    {
        return response()
            ->json([
                       'msg'  => '¡Success!',
                       'user' => \Auth::user()->toArray(),
                   ],
                   Response::HTTP_CREATED
            );
    }
}
