<?php 
require_once('dbConnect.php');

function getSolarSystem($id) {
  $link = mysqli_connect(HOST, USER, PASSWORD, DATABASE);
  $query = "SELECT solarsystem_name FROM eve_map_solarsystems WHERE solarsystem_id = '$id'";
  $result = mysqli_fetch_array(mysqli_query($link, $query));
  mysqli_close($link);
  return $result[0];
}

function getItem($id) {
  $link = mysqli_connect(HOST, USER, PASSWORD, DATABASE);

  $mainItem = getItemName( $id, $link);
  $schematic = getItemSchematic($link, $mainItem['name']);
  for ($i = 0, $size = count($schematic); $i < $size; $i++) {
    $arr[ $schematic[$i][0] ] = getItemName($schematic[$i][0], $link);
    $arr[ $schematic[$i][0] ]['quantity'] = $schematic[$i][1];
  }
  mysqli_close($link);
  return $arr;
}

function getItemName($id, $link) {
  if (!$link){
    $link = mysqli_connect(HOST, USER, PASSWORD, DATABASE);
  }
  $query = "SELECT name FROM eve_inv_types WHERE type_id = '$id'";
  $result = mysqli_fetch_assoc(mysqli_query($link, $query));
  return $result;
}

function getItemSchematic($link, $itemName) {
  if (!$link){
    $link = mysqli_connect(HOST, USER, PASSWORD, DATABASE);
  }

  $arr = array();

  $query = "SELECT schematicID FROM planetSchematics WHERE schematicName = '$itemName'";
  $schematicID = mysqli_fetch_assoc(mysqli_query($link, $query));

  $schematicID = $schematicID['schematicID'];
  $query = "SELECT typeID,quantity FROM planetSchematicsTypeMap WHERE schematicID = '$schematicID'";
  
  $response = mysqli_query($link, $query);
  while ( $result = mysqli_fetch_row($response) ) {
    array_push($arr, $result);
  }

  return $arr;
}