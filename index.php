<?php
//Road ID
$home = isset($_GET['id']);

$road_name = 'Index';

if ($home) {
    $id = $_GET['id'];

    //Connect to DB
    require_once 'php/config.php';

    //Get road name
    $query = "SELECT road_name FROM tbl_roads WHERE road_id='$id'";

    $result = mysqli_query($con, $query);
    if(!$result)
    {
        //Error
    } else {
       	$row = mysqli_fetch_assoc($result);
        $road_name = $row['road_name'];
    }

    //Get road ID list
    $id_list = array();

    $query = "SELECT road_id FROM tbl_roads WHERE road_name='$road_name'";

    $result = mysqli_query($con, $query);
    if(!$result)
    {
        //Error
    } else {
        while ($row = mysqli_fetch_assoc($result)){
            array_push($id_list, $row['road_id']);
        }
        //print_r($id_list);
    }
}
//HTML
echo '<!DOCTYPE html>';
echo '<html>';
echo '<head>';
echo '<meta charset="UTF-8">';
echo '<title>'.$road_name.'</title>';
echo '<script src="js/jquery-1.11.2.min.js"></script>';
echo '<link rel="stylesheet" href="css/bootstrap.min.css">';
echo '<script src="js/bootstrap.min.js"></script>';
echo '<link rel="stylesheet" href="css/ol.css" type="text/css">';
echo '<script src="js/ol.js"></script>';
echo '<script src="js/support.js"></script>';
echo '<script src="js/autocomplete.js"></script>';
echo '<script src="js/jquery.autocomplete.min.js"></script>';
echo '<link rel="stylesheet" href="css/style.css" type="text/css"';
echo '</head>';
echo '<body>';
echo '<div class="navbar navbar-inverse navbar-fixed-top">';
echo '   <div class="container">';
echo '      <div class="navbar-header">';
echo '         <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">';
echo '         <span class="icon-bar"></span>';
echo '         <span class="icon-bar"></span>';
echo '         <span class="icon-bar"></span>';
echo '         </button>';
echo '         <a class="navbar-brand hidden-xs" href="#">Open Traffic Maps</a>';
echo '         <a class="navbar-brand visible-xs" href="#">C</a>';
echo '         <form class="navbar-form pull-left" role="search">';
echo '            <div class="input-group">';
echo '               <input type="text" class="form-control" placeholder="Search" id="autocomplete">';
echo '               <div class="input-group-btn">';
echo '                  <button type="submit" class="btn btn-default"><span class="glyphicon glyphicon-search"></span></button>';
echo '               </div>';
echo '            </div>';
echo '         </form>';
echo '      </div>';
echo '      <div class="navbar-collapse collapse">';
echo '         <ul class="nav navbar-nav navbar-right">';
echo '            <li class="active"><a href="#">Home</a></li>';
echo '            <li><a href="#about">About Us</a></li>';
echo '         </ul>';
echo '      </div>';
echo '      <!--/.navbar-collapse -->';
echo '   </div>';
echo '</div>';
echo '<div id="map" class="map" style="clear:both"></div>';
echo '</body>';
echo '<script>';
echo 'var map = new bkMap(\'map\');';
echo 'map.setCenter(106.601798723,10.727712258933);';
echo 'map.setZoom(12);';
if ($home){
    foreach ($id_list as $road_id){

    	$query = "SELECT road_coordinates FROM tbl_roads WHERE road_id='$road_id'";
        
        $result = mysqli_query($con, $query);
        if(!$result)
        {
            //Error
        } else {
        	$row = mysqli_fetch_assoc($result);
        	$road_coordinates = $row['road_coordinates'];
        	//echo $road_coordinates;
        	echo 'map.addFeature(new bkFeature('.$road_id.', "LineString", '.$road_coordinates.'));';
            echo 'map.setStyle('.$road_id.', setLineStyle("purple", 3));';
        }
    }
}
echo 'map.setBound();';
echo '</script>';
echo '</html>';
?>