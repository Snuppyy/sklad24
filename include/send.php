<?php

$tg_user = '1355725555';
// $tg_user = '559929719';
$bot_token = '5909885510:AAEuMUShLRuSeZCGiDmkxc2Ev73U5ZVQ62c';
$name = $_POST['name'];
$tel = $_POST['tel'];
$quest = $_POST['quest'];

var_dump($_POST);

$text = "<b>Новая заявка!</b>
Сайт: http://sklad24.uz/";
isset($name) ? $text .= "\nИмя: $name" : '';
$text .= "\nТелефон: $tel";
isset($quest) ? $text .= "\nВопрос: $quest" : '';


$params = array(
   'chat_id' => $tg_user,
   'text' => $text,
   'parse_mode' => 'HTML',
);

$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, 'https://api.telegram.org/bot' . $bot_token . '/sendMessage');
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_TIMEOUT, 10);
curl_setopt($curl, CURLOPT_POSTFIELDS, $params);
$result = curl_exec($curl);
curl_close($curl);
