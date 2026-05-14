<?php

namespace App\Models\Course;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseCoupon extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'code',
        'discount',
        'expiry',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeValid($query)
    {
        return $query->where('expiry', '>=', now());
    }

    // Check if a coupon is valid
    // $coupon = Coupon::where('code', 'DISCOUNT2024')->valid()->first();
    // if ($coupon) {
    //     echo "Valid Coupon!";
    // } else {
    //     echo "Coupon Expired!";
    // }
}
