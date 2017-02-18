<?php
require_once('db/dbQueries.php');

header('Access-Control-Allow-Origin: *');  
$systemId   = $_GET['systemId'];
$itemId     = explode(',', $_GET['itemId']);

if (isset($systemId)){
  echo(getSolarSystem($systemId));
}

if (isset($itemId)){
  /*foreach ($itemId as &$value) {
    $value = getItem($value);
  };*/
  $res = getItem($itemId[0]);
  echo(json_encode($res));
  //echo(getItemName($itemId));
}

?>