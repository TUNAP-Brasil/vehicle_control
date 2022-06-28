<?php

namespace App\Models;

use Illuminate\Validation\Rule;

class ClientVehicle extends Base
{
    protected $table = 'client_vehicles';

    protected $fillable = [
        'chasis',
        'vehicle_id',
        'company_id',
        'color',
        'number_motor',
        'renavan',
        'plate',
        'mileage',
    ];

    public static function rules($id = null, $company_id = null)
    {
        $uniqueRule = self::getUniqueRule($id, [ 'company_id' => $company_id ]);

        return [
            'chasis'       => [ 'nullable', 'string', 'regex:/^[a-zA-Z0-9]*$/', $uniqueRule ],
            'color'        => 'nullable|string',
            'number_motor' => [ 'nullable', 'string', 'regex:/^[a-zA-Z0-9]*$/', $uniqueRule ],
            'renavan'      => [ 'nullable', 'integer', $uniqueRule ],
            'plate'        => [ 'required', 'string', 'regex:/^[A-Z0-9]*$/', $uniqueRule ],
            'mileage'      => 'nullable|numeric',
        ];
    }

    #belongs to
    public function vehicle()
    {
        return $this->belongsTo('App\Models\Vehicle', 'vehicle_id', 'id')->withTrashed();
    }

    #belongs to
    public function company()
    {
        return $this->belongsTo('App\Models\Company', 'company_id', 'id');
    }
}

