<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\FuelEntry;

class FuelController extends Controller
{
    public function index()
    {
        $entries = auth()->user()->fuelEntries;

        return Inertia::render('Dashboard', [
            'entries' => $entries
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'station_name' => 'required|string|max:255',
            'fuel_type' => 'required|in:Diesel,Unleaded,Premium',
            'price_per_liter' => 'required|numeric|min:0.01',
        ]);

        auth()->user()->fuelEntries()->create([
            'station_name' => $request->station_name,
            'fuel_type' => $request->fuel_type,
            'price_per_liter' => $request->price_per_liter,
        ]);

        return redirect()->back();
    }
}