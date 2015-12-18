<?php
    header('Content-Type: text/html; charset=utf-8');
    //connect to mysql db
    $con = mysql_connect("localhost","root","mysql") or die('Could not connect: ' . mysql_error());
    //connect to the road database
    mysql_select_db("tttn", $con);

    mysql_query("SET NAMES 'utf8'");

    //read the json file contents
    $jsondata = file_get_contents('geojson/hcm_roads.geojson');
    
    //convert json object to php associative array
    $data = json_decode($jsondata, true);
    $features = $data['features'];

    //get the road details
    foreach ($features as $feature){
        $name = $feature['properties']['name'];
        $coordinates = json_encode($feature['geometry']['coordinates']);
        
        //insert into mysql table
        $sql = "INSERT INTO tbl_roads(road_name, road_coordinates)
        VALUES('$name', '$coordinates')";
        if(!mysql_query($sql,$con))
        {
            die('Error : ' . mysql_error());
        }
    }

?>