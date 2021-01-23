<?php

/**
 * this is a mock to a function which perform a query and do some
 * calculations to get the top seller today
 * 
 * @return string
 */
function getTopSellerToday() {
    $sellers = ['Ahmed', 'Yasser', 'Ibrahim', 'Hussain', 'Hassan'];
    return $sellers[array_rand($sellers)];
}

header('Content-type: application/json'); 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With, content-type');

echo json_encode([
    'top_seller' => getTopSellerToday()
]);

# response example: {"top_seller":"Hassan"}