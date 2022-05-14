<?php

namespace App\Rules;

use App\Models\ChecklistItem;
use App\Models\VehicleBrandChecklistVersion as ChecklistVersion;
use Illuminate\Contracts\Validation\Rule;

class ChecklistResults implements Rule
{
    private $version_id;
    private $message;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($version_id)
    {
        $this->version_id = $version_id;
        $this->message    = trans('validation.exists');
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param string $attribute
     * @param mixed  $value
     *
     * @return bool
     */
    public function passes($attribute, $value)
    {
        if(!$this->version_id){
            return false;
        }

        $items = ChecklistItem::whereHas('versions', function($query){
            return $query->where(ChecklistVersion::getTableName().'.id', '=', $this->version_id);
        })->get();

        $itemsIds = $items->pluck('id')->toArray();
        $valueIds = collect($value)->pluck('id')->toArray();

        if(count(array_diff($itemsIds, $valueIds)) == 0 && count(array_diff($valueIds, $itemsIds)) == 0)
        {
            $itemsGroupById = $items->groupBy('id');
            $errors         = [];

            foreach($value as $checklist)
            {
                $item = $itemsGroupById[$checklist['id']][0];

                $validator = validate([ 'xxxxx' => $checklist['value'] ], [ 'xxxxx' => $item->validation['rule'] ]);

                if($validator->fails())
                {
                    $errors[] = [ $item->name => str_replace('xxxxx', $item->name, collect($validator->errors()->getMessages())->first()[0]) ];
                }
            }

            if(count($errors) > 0)
            {
                $this->message = $errors;

                return false;
            }
            else
            {
                return true;
            }
        }
        else
        {
            return false;
        }
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return $this->message;
    }
}