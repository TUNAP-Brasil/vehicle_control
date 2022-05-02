<?php

use Illuminate\Support\Facades\Route;


Route::group([
                 'prefix'     => 'company',
                 'middleware' => [ 'jwt.verify', 'user' ],
             ], function(){

    Route::post('/', [
        'uses' => 'CompanyController@store',
    ]);

    Route::group([
                     'middleware' => [ 'company' ],
                 ], function(){


        Route::get('vehicles', [
            'uses' => 'CompanyController@vehicles',
        ]);

    });
});
