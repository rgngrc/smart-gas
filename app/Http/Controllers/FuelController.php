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
}