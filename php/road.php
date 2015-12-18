<?php
    header('Content-Type: text/html; charset=utf-8');

    require_once 'config.php';

    function raw_json_encode($input) {

        return preg_replace_callback(
            '/\\\\u([0-9a-zA-Z]{4})/',
            function ($matches) {
                return mb_convert_encoding(pack('H*',$matches[1]),'UTF-8','UTF-16');
            },
            json_encode($input)
        );

    }

    $query = "SELECT road_name FROM tbl_roads";
    $result = mysqli_query($con, $query);
    if(!$result)
    {
        die('Error : ' . mysql_error());
    } else {
        $id = array();
        while ($row = mysqli_fetch_assoc($result)){
            if (!empty($row['road_name']))
                array_push($id, $row['road_name']);
        }
        $roads = array();
        foreach (array_unique($id) as $road){
            array_push($roads, $road);
        }
        echo(raw_json_encode($roads, JSON_UNESCAPED_UNICODE));
    }
?>