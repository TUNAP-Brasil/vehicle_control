<?php

namespace App\Models;

use Illuminate\Validation\Rule;

class TechnicalConsultant extends Base
{
    protected $table = 'technical_consultants';

    protected $casts = [
        'active' => 'boolean'
    ];

    protected $fillable = [
        'company_id',
        'user_id',
        'active',
    ];

    public static function boot(){
        parent::boot();

        self::bootJoinToData();
    }

    public static function bootJoinToData()
    {
        static::addGlobalScope('joinToData', function($query){
            return $query->select([
                                      'technical_consultants.*',
                                      'users.name',
                                      'users.email',
                                  ])
                         ->join('users', 'users.id', '=', 'technical_consultants.user_id', 'inner');
        });
    }

    public static function rules($company_id = null)
    {
        if($company_id){
            return [
                'user_id' => [
                    'required', 'integer',
                    Rule::exists('company_user', 'user_id')->where('company_id', $company_id)
                ],
                'active' => 'required|boolean',
            ];
        }
        else {
            return [
                'active' => 'required|boolean',
            ];
        }
    }

    #belongs to
    public function company()
    {
        return $this->belongsTo('App\Models\Company', 'company_id', 'id');
    }


    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id', 'id');
    }

}

