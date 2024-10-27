<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderSeeder extends Seeder
{
    public function run()
    {
        DB::transaction(function () {
            // Create 10 orders
            Order::factory(10)->create()->each(function ($order) {
                $totalPrice = 0;

                // Create 1-5 order items per order
                $items = OrderItem::factory(rand(1, 5))->make();

                foreach ($items as $item) {
                    $product = Product::find($item->product_id);

                    // Ensure there is enough stock
                    if ($product->stock_quantity >= $item->quantity) {
                        $product->decrement('stock_quantity', $item->quantity);

                        // Save the item and update the total price
                        $item->order_id = $order->id;
                        $item->save();
                        $totalPrice += $item->price * $item->quantity;
                    }
                }

                // Update the order's total price
                $order->update(['total_price' => $totalPrice]);
            });
        });
    }
}
