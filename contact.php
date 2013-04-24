<?php

$emailTo   = "bia.inc@hotmail.com";
$emailFrom = $_POST["emailFrom"];
$fromName  = $_POST['fromName'];
$emailBody = $_POST['emailBody'];

$error = false;
if (!isset($emailFrom) || empty($emailFrom)) {
    $error = true;
}
if (!isset($fromName) || empty($fromName)) {
    $error = true;
}
if (!isset($emailBody) || empty($emailBody)) {
    $error = true;
}

if (!$error){
    $subject = "Website request from: $fromName";
    $message = $emailBody;
    $headers = 'From: ' .$emailFrom. "\r\n" .
        'Reply-To: ' .$emailFrom. "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    mail($emailTo, $subject, $message, $headers);

    $response = array('msg' =>
    '
        <div class="header">Thank you</div>
        <p> Your message has been sent </p>
    ');
}

echo json_encode($response);

?>