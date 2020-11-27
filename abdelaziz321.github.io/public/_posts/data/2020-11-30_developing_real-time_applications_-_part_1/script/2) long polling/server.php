<?php

/**
 * this is a mock to a function which perform a query and do some
 * calculations to get the top seller today
 * 
 * @return array
 */
function getTopSellerToday() {
    $sellers = ['Ahmed', 'Yasser', 'Ibrahim', 'Hussain', 'Hassan'];
    return $sellers[array_rand($sellers)];
}

header('Content-type: application/json'); 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With, content-type');

$clientTopSeller = $_GET['top_seller'] ?? null;

do {
    $serverTopSeller = getTopSellerToday();
    if ($clientTopSeller != $serverTopSeller) break;
    sleep(1);
} while (true);

echo json_encode([
    'top_seller' => $serverTopSeller
]);

# response example: {"top_seller":"Hassan"}