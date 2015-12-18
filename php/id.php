<?php
    header('Content-Type: text/html; charset=utf-8');

    $name = $_POST['name'];
    
    require_once 'config.php';

    $query = "SELECT road_id FROM tbl_roads WHERE road_name='$name'";
    $result = mysqli_query($con, $query);
    if(!$result)
    {
        //Error
    } else {
        if ($row = mysqli_fetch_assoc($result)){
            echo($row['road_id']);
        }
    }
?>