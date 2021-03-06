<?php

use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'checklist-version',
                 'middleware' => [ 'jwt.verify', 'user' ],
             ], function(){
    Route::get('active-checklist-versions', [
        'uses' => 'ChecklistVersionController@activeVersions',
    ]);

    Route::group([
                     'prefix' => '{id}',
                     'middleware' => [ 'checklistVersion' ],
                 ], function(){
        Route::get('/', [
            'uses' => 'ChecklistVersionController@show',
        ]);

        Route::get('items', [
            'uses' => 'ChecklistVersionController@items',
        ]);

        Route::post('print', [
            'uses' => 'ChecklistVersionController@print',
        ]);

        Route::post('send', [
            'uses' => 'ChecklistVersionController@send',
        ]);

        Route::post('generate-report', [
            'uses' => 'ChecklistVersionController@generateReport',
        ]);
    });

    Route::group([
                     'middleware' => [ 'admin' ],
                 ], function(){
        Route::get('/', [
            'uses' => 'ChecklistVersionController@index',
        ]);

        Route::post('/', [
            'uses' => 'ChecklistVersionController@store',
        ]);

        Route::group([
                         'prefix' => '{id}',
                         'middleware' => [ 'checklistVersion' ],
                     ], function(){

            Route::post('report', [
                'uses' => 'ChecklistVersionController@storeReport',
            ]);

            Route::post('duplicate', [
                'uses' => 'ChecklistVersionController@duplicate',
            ]);

            Route::put('/', [
                'uses' => 'ChecklistVersionController@update',
            ]);

            Route::delete('/', [
                'uses' => 'ChecklistVersionController@destroy',
            ]);

            Route::delete('report/{reportId}', [
                'uses' => 'ChecklistVersionController@destroyReport',
            ]);
        });
    });


});
