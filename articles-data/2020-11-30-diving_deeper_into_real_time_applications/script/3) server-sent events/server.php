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

header("Cache-Control: no-cache");
header("Content-Type: text/event-stream");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With, content-type');

do {
    $oldTopSeller = $newTopSeller ?? null;
    $newTopSeller = getTopSellerToday();

    if ($newTopSeller != $oldTopSeller) {
        echo "event: newTopSeller\n";
        echo "data: " . json_encode(['top_seller' => $newTopSeller]) . "\n\n";
        
        if (ob_get_length()) {
            ob_end_flush();
            flush();
        }
    }

    if (connection_aborted()) break;

    sleep(1);
}
while (true);

/*
 * # message example:
 * event: newTopSeller
 * data: {"top_seller":"Hassan"}
 */