<?php
$val = (int) $_GET['size'];
//THANK YOU- source:https://gist.github.com/brandonheyer/5254516
function hslToRgb($h, $s=1, $l=0.8){
    $r; 
    $g; 
    $b;
	$c = ( 1 - abs( 2 * $l - 1 ) ) * $s;
	$x = $c * ( 1 - abs( fmod( ( $h / 60 ), 2 ) - 1 ) );
	$m = $l - ( $c / 2 );
	if ( $h < 60 ) {
		$r = $c;
		$g = $x;
		$b = 0;
	} else if ( $h < 120 ) {
		$r = $x;
		$g = $c;
		$b = 0;			
	} else if ( $h < 180 ) {
		$r = 0;
		$g = $c;
		$b = $x;					
	} else if ( $h < 240 ) {
		$r = 0;
		$g = $x;
		$b = $c;
	} else if ( $h < 300 ) {
		$r = $x;
		$g = 0;
		$b = $c;
	} else {
		$r = $c;
		$g = 0;
		$b = $x;
	}
	$r = ( $r + $m ) * 255;
	$g = ( $g + $m ) * 255;
	$b = ( $b + $m  ) * 255;
    return array( 'red' => floor( $r ), 'green' => floor( $g ), 'blue' => floor( $b ) );
}

$baseW = 10; //percentage for base of bar if 0 value passed
$maxW = 100; //highest percentage
$baseC = 0; //base color is red!
$maxC = 120; //highest color is green HSL

$hue = ($val + $baseC);
if($hue>$maxC){ $hue = $maxC; }

$color = hslToRgb($hue); //array of rgb value for image


$width = 20 + ($val*1.8);
if($width>$maxW){$val = $maxW;}
//actual width and height
$actW = 200;
$actH = 20;


$backer = imagecreatefrompng('bar_back.png');
imageAlphaBlending($backer, true);
imageSaveAlpha($backer, true);



$colorX = imagecolorallocatealpha($backer,$color['red'],$color['green'],$color['blue'],50);

if($width>=198){$width=200;}
imagefilledrectangle ($backer, 1, 1, $width-2, $actH-2, $colorX); //draw the bar

//draw this sob
header('Content-Type: image/png');
imagepng($backer);

imagedestroy($image);
imagedestroy($backer);

?>

