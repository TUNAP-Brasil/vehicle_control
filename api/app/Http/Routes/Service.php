<?php

use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'service',
                 'middleware' => [ 'jwt.verify', 'user' ],
             ], function(){

    Route::group([
                     'middleware' => [ 'company'],
                 ], function(){




        Route::get('/', [
            'uses' => 'ServiceController@index',
        ]);

        Route::post('/', [
            'uses' => 'ServiceController@store',
        ]);


    });

    Route::group([
                     'middleware' => [ 'service'],
                 ], function(){

        Route::get('{id}', [
            'uses' => 'ServiceController@show',
        ]);

        Route::put('{id}', [
            'uses' => 'ServiceController@update',
        ]);

        Route::delete('{id}', [
            'uses' => 'ServiceController@destroy',
        ]);
    });







});
